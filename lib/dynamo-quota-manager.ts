import {
    ConditionalCheckFailedException,
    DynamoDBClient,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb"
import fs from "fs"
import path from "path"

// Quota tracking is enabled by default (uses DynamoDB when DYNAMODB_QUOTA_TABLE
// is set, otherwise falls back to built-in local storage in data/quota.json).
// Set ENABLE_QUOTA=false to disable quota enforcement completely.
const TABLE = process.env.DYNAMODB_QUOTA_TABLE
const DYNAMODB_REGION = process.env.DYNAMODB_REGION || "ap-northeast-1"
// Timezone for daily quota reset (e.g., "Asia/Tokyo" for JST midnight reset)
// Defaults to UTC if not set
let QUOTA_TIMEZONE = process.env.QUOTA_TIMEZONE || "UTC"

// Validate timezone at module load
try {
    new Intl.DateTimeFormat("en-CA", { timeZone: QUOTA_TIMEZONE }).format(
        new Date(),
    )
} catch {
    console.warn(
        `[quota] Invalid QUOTA_TIMEZONE "${QUOTA_TIMEZONE}", using UTC`,
    )
    QUOTA_TIMEZONE = "UTC"
}

/**
 * Get today's date string in the configured timezone (YYYY-MM-DD format)
 * This is used as the Sort Key (SK) for per-day tracking
 */
function getTodayInTimezone(): string {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: QUOTA_TIMEZONE,
    }).format(new Date())
}

// Only create DynamoDB client if table is configured
const client = TABLE ? new DynamoDBClient({ region: DYNAMODB_REGION }) : null

interface LocalQuotaRecord {
    reqCount: number
    tokenCount: number
    lastMinute: string
    tpmCount: number
}

interface LocalQuotaStore {
    date: string
    records: Record<string, LocalQuotaRecord>
}

const globalQuotaState = globalThis as typeof globalThis & {
    __localQuotaStore?: LocalQuotaStore
}

function getLocalQuotaFilePath(): string {
    return path.join(process.cwd(), "data", "quota.json")
}

function getLocalStore(today: string): LocalQuotaStore {
    if (!globalQuotaState.__localQuotaStore && !process.env.VITEST) {
        try {
            const raw = fs.readFileSync(getLocalQuotaFilePath(), "utf8")
            const parsed = JSON.parse(raw) as LocalQuotaStore
            if (
                parsed &&
                typeof parsed.date === "string" &&
                parsed.records &&
                typeof parsed.records === "object"
            ) {
                globalQuotaState.__localQuotaStore = parsed
            }
        } catch {
            // File does not exist yet or is unreadable — start fresh
        }
    }
    if (
        !globalQuotaState.__localQuotaStore ||
        globalQuotaState.__localQuotaStore.date !== today
    ) {
        globalQuotaState.__localQuotaStore = {
            date: today,
            records: {},
        }
    }
    return globalQuotaState.__localQuotaStore
}

function persistLocalStore(store: LocalQuotaStore): void {
    if (process.env.VITEST) return
    try {
        const filePath = getLocalQuotaFilePath()
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf8")
    } catch {
        // Ignore write errors on read-only filesystems (in-memory store still works)
    }
}

/**
 * Check if server-side quota tracking is enabled.
 * Enabled by default (10 requests/IP/day) unless ENABLE_QUOTA=false.
 */
export function isQuotaEnabled(): boolean {
    return process.env.ENABLE_QUOTA !== "false"
}

interface QuotaLimits {
    requests: number // Daily request limit
    tokens: number // Daily token limit
    tpm: number // Tokens per minute
}

interface QuotaCheckResult {
    allowed: boolean
    error?: string
    type?: "request" | "token" | "tpm"
    used?: number
    limit?: number
}

/**
 * Check all quotas and increment request count atomically.
 * Uses composite key (PK=user, SK=date) for per-day tracking.
 * Each day automatically gets a new item - no explicit reset needed.
 * A request limit of 0 means none; increment 0 checks the limits without
 * counting a request (the screenshot check).
 */
export async function checkAndIncrementRequest(
    ip: string,
    limits: QuotaLimits,
    increment = 1,
): Promise<QuotaCheckResult> {
    if (!isQuotaEnabled()) {
        return { allowed: true }
    }

    const pk = ip // User identifier (base64 IP)
    const sk = getTodayInTimezone() // Date as sort key (YYYY-MM-DD)
    const currentMinute = Math.floor(Date.now() / 60000).toString()

    // Built-in local quota enforcement when DynamoDB is not configured
    if (!client) {
        const store = getLocalStore(sk)
        const record = store.records[pk] ?? {
            reqCount: 0,
            tokenCount: 0,
            lastMinute: currentMinute,
            tpmCount: 0,
        }
        const tpmCount =
            record.lastMinute === currentMinute ? record.tpmCount : 0

        if (limits.requests > 0 && record.reqCount >= limits.requests) {
            return {
                allowed: false,
                type: "request",
                error: "Daily request limit exceeded",
                used: record.reqCount,
                limit: limits.requests,
            }
        }
        if (limits.tokens > 0 && record.tokenCount >= limits.tokens) {
            return {
                allowed: false,
                type: "token",
                error: "Daily token limit exceeded",
                used: record.tokenCount,
                limit: limits.tokens,
            }
        }
        if (limits.tpm > 0 && tpmCount >= limits.tpm) {
            return {
                allowed: false,
                type: "tpm",
                error: "Rate limit exceeded (tokens per minute)",
                used: tpmCount,
                limit: limits.tpm,
            }
        }

        if (increment > 0) {
            record.reqCount += increment
            store.records[pk] = record
            persistLocalStore(store)
        }
        return { allowed: true }
    }

    try {
        // Single atomic update - handles creation AND increment
        // New day automatically creates new item (different SK)
        // Note: lastMinute/tpmCount are managed by recordTokenUsage only
        await client.send(
            new UpdateItemCommand({
                TableName: TABLE,
                Key: {
                    PK: { S: pk },
                    SK: { S: sk },
                },
                UpdateExpression: "ADD reqCount :one",
                // Check all limits before allowing increment
                // TPM check: allow if new minute OR under limit
                ConditionExpression: `
                    (attribute_not_exists(reqCount) OR reqCount < :reqLimit) AND
                    (attribute_not_exists(tokenCount) OR tokenCount < :tokenLimit) AND
                    (attribute_not_exists(lastMinute) OR lastMinute <> :minute OR
                     attribute_not_exists(tpmCount) OR tpmCount < :tpmLimit)
                `,
                ExpressionAttributeValues: {
                    ":one": { N: String(increment) },
                    ":minute": { S: currentMinute },
                    ":reqLimit": { N: String(limits.requests || 999999) },
                    ":tokenLimit": { N: String(limits.tokens || 999999) },
                    ":tpmLimit": { N: String(limits.tpm || 999999) },
                },
                // On a failed condition the exception carries the item as it
                // was, so no second read is needed to tell which limit was hit
                ReturnValuesOnConditionCheckFailure: "ALL_OLD",
            }),
        )

        return { allowed: true }
    } catch (e: any) {
        // Condition failed - the exception's Item holds the current counts
        if (e instanceof ConditionalCheckFailedException) {
            const item = e.Item
            const storedMinute = item?.lastMinute?.S

            const reqCount = Number(item?.reqCount?.N || 0)
            const tokenCount = Number(item?.tokenCount?.N || 0)
            const tpmCount =
                storedMinute !== currentMinute
                    ? 0
                    : Number(item?.tpmCount?.N || 0)

            // Determine which limit was exceeded
            if (limits.requests > 0 && reqCount >= limits.requests) {
                return {
                    allowed: false,
                    type: "request",
                    error: "Daily request limit exceeded",
                    used: reqCount,
                    limit: limits.requests,
                }
            }
            if (limits.tokens > 0 && tokenCount >= limits.tokens) {
                return {
                    allowed: false,
                    type: "token",
                    error: "Daily token limit exceeded",
                    used: tokenCount,
                    limit: limits.tokens,
                }
            }
            if (limits.tpm > 0 && tpmCount >= limits.tpm) {
                return {
                    allowed: false,
                    type: "tpm",
                    error: "Rate limit exceeded (tokens per minute)",
                    used: tpmCount,
                    limit: limits.tpm,
                }
            }

            // Condition failed but no limit clearly exceeded - race condition edge case
            // Fail safe by allowing (could be a TPM reset race)
            console.warn(
                `[quota] Condition failed but no limit exceeded for IP prefix: ${ip.slice(0, 8)}...`,
            )
            return { allowed: true }
        }

        // Other DynamoDB errors - fail open
        console.error(
            `[quota] DynamoDB error (fail-open), IP prefix: ${ip.slice(0, 8)}..., error: ${e.message}`,
        )
        return { allowed: true }
    }
}

/**
 * Record token usage after response completes.
 * Uses composite key (PK=user, SK=date) for per-day tracking.
 * Handles minute boundaries atomically to prevent race conditions.
 */
export async function recordTokenUsage(
    ip: string,
    tokens: number,
): Promise<void> {
    if (!isQuotaEnabled()) return
    if (!Number.isFinite(tokens) || tokens <= 0) return

    const pk = ip // User identifier (base64 IP)
    const sk = getTodayInTimezone() // Date as sort key (YYYY-MM-DD)
    const currentMinute = Math.floor(Date.now() / 60000).toString()

    if (!client) {
        const store = getLocalStore(sk)
        const record = store.records[pk] ?? {
            reqCount: 0,
            tokenCount: 0,
            lastMinute: currentMinute,
            tpmCount: 0,
        }
        record.tokenCount += tokens
        if (record.lastMinute === currentMinute) {
            record.tpmCount += tokens
        } else {
            record.lastMinute = currentMinute
            record.tpmCount = tokens
        }
        store.records[pk] = record
        persistLocalStore(store)
        return
    }

    try {
        // Try to update for same minute OR new item (most common cases)
        // Handles: 1) new item (no lastMinute), 2) same minute (lastMinute matches)
        await client.send(
            new UpdateItemCommand({
                TableName: TABLE,
                Key: {
                    PK: { S: pk },
                    SK: { S: sk },
                },
                UpdateExpression:
                    "SET lastMinute = if_not_exists(lastMinute, :minute) ADD tokenCount :tokens, tpmCount :tokens",
                ConditionExpression:
                    "attribute_not_exists(lastMinute) OR lastMinute = :minute",
                ExpressionAttributeValues: {
                    ":minute": { S: currentMinute },
                    ":tokens": { N: String(tokens) },
                },
            }),
        )
    } catch (e: any) {
        if (e instanceof ConditionalCheckFailedException) {
            // Different minute - reset TPM count and set new minute
            try {
                await client.send(
                    new UpdateItemCommand({
                        TableName: TABLE,
                        Key: {
                            PK: { S: pk },
                            SK: { S: sk },
                        },
                        UpdateExpression:
                            "SET lastMinute = :minute, tpmCount = :tokens ADD tokenCount :tokens",
                        ExpressionAttributeValues: {
                            ":minute": { S: currentMinute },
                            ":tokens": { N: String(tokens) },
                        },
                    }),
                )
            } catch (retryError: any) {
                console.error(
                    `[quota] Failed to record tokens (retry), IP prefix: ${ip.slice(0, 8)}..., tokens: ${tokens}, error: ${retryError.message}`,
                )
            }
        } else {
            console.error(
                `[quota] Failed to record tokens, IP prefix: ${ip.slice(0, 8)}..., tokens: ${tokens}, error: ${e.message}`,
            )
        }
    }
}
