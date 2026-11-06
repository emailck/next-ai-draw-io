"use client"

import { CreditCard, Settings, Sparkles, X } from "lucide-react"
import type React from "react"
import { useDictionary } from "@/hooks/use-dictionary"
import { BRAND_QUOTA_NOTICE } from "@/lib/brand"
import { formatMessage } from "@/lib/i18n/utils"
import { useUiStore } from "@/stores/ui-store"

interface QuotaLimitToastProps {
    type?: "request" | "token"
    used: number
    limit: number
    onDismiss: () => void
    onConfigModel?: () => void
}

export function QuotaLimitToast({
    type = "request",
    used,
    limit,
    onDismiss,
    onConfigModel,
}: QuotaLimitToastProps) {
    const dict = useDictionary()
    const isTokenLimit = type === "token"
    const formatNumber = (n: number) =>
        n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString()

    const quotaMessage = isTokenLimit
        ? dict.quota.messageToken
        : dict.quota.messageApi

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault()
            onDismiss()
        }
    }

    return (
        <div
            role="alert"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative w-[400px] overflow-hidden rounded-xl border border-border/50 bg-card p-5 shadow-float animate-message-in"
        >
            {/* Close button */}
            <button
                onClick={onDismiss}
                className="absolute right-3 top-3 p-1.5 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Dismiss"
            >
                <X className="w-4 h-4" />
            </button>
            {/* Title row with icon */}
            <div className="flex items-center gap-2.5 mb-3 pr-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Sparkles
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        strokeWidth={2}
                    />
                </div>
                <h3 className="font-semibold text-foreground text-sm">
                    {isTokenLimit
                        ? dict.quota.tokenLimit
                        : dict.quota.dailyLimit}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">
                    {formatMessage(dict.quota.usedOf, {
                        used: formatNumber(used),
                        limit: formatNumber(limit),
                    })}
                </span>
            </div>
            {/* Message */}
            <div className="text-sm text-muted-foreground leading-relaxed mb-4 space-y-2">
                <p>{quotaMessage}</p>
                <p className="font-medium text-foreground">
                    {BRAND_QUOTA_NOTICE}
                </p>
                <p>{dict.quota.reset}</p>
            </div>
            {/* Action buttons */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => {
                        useUiStore.getState().setPricingOpen(true)
                        onDismiss()
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                    <CreditCard className="w-3.5 h-3.5" />
                    Upgrade to Pro
                </button>
                {onConfigModel && (
                    <button
                        type="button"
                        onClick={() => {
                            onConfigModel()
                            onDismiss()
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                    >
                        <Settings className="w-3.5 h-3.5" />
                        {dict.quota.configModel}
                    </button>
                )}
            </div>
        </div>
    )
}
