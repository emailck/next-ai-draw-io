"use client"

import {
    ArrowUpRight,
    CheckCircle2,
    Play,
    RotateCcw,
    Sparkles,
    Terminal,
    X,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDictionary } from "@/hooks/use-dictionary"
import { usePathLocale } from "@/hooks/use-path-locale"
import { BRAND_NAME } from "@/lib/brand"
import { STORAGE_KEYS } from "@/lib/storage"
import { cn } from "@/lib/utils"

function useVideoClosed() {
    const [closed, setClosed] = useState(true)
    useEffect(() => {
        setClosed(localStorage.getItem(STORAGE_KEYS.mcpVideoClosed) === "true")
    }, [])
    const close = () => {
        localStorage.setItem(STORAGE_KEYS.mcpVideoClosed, "true")
        setClosed(true)
    }
    return [closed, close] as const
}

const ANIMATION_STEPS = [
    {
        cmd: '$ gravitex generate --cloud aws --topology "Multi-AZ HA"',
        status: "Parsing cloud architecture prompt...",
    },
    {
        cmd: "→ Provisioning Route53, WAF & Application Load Balancer",
        status: "Rendering ingress & security boundary...",
    },
    {
        cmd: "→ Linking ECS Fargate clusters across AZ-a & AZ-b",
        status: "Routing multi-AZ compute & Aurora failover...",
    },
    {
        cmd: "✓ Auto-layout complete · Vector XML & SVG synced",
        status: "Live on GRAVITEX AI Studio Canvas",
    },
]

/**
 * Pure-code animated SVG & terminal motion graphic replacing the legacy mp4 video.
 * Loops through 4 stages of real-time cloud topology generation.
 */
function AnimatedArchitectureMotion({ className }: { className?: string }) {
    const [step, setStep] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4)
        }, 2400)
        return () => clearInterval(timer)
    }, [paused])

    return (
        <div
            className={cn(
                "relative flex aspect-video w-full flex-col justify-between overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3 text-slate-100 shadow-inner select-none",
                className,
            )}
            data-testid="mcp-video"
        >
            {/* Subtle animated background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.16),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.16),transparent_55%)]" />

            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800/90 pb-1.5">
                <div className="flex items-center gap-1.5">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-tight text-slate-200">
                        {BRAND_NAME} · Live AI Topology Engine
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {[0, 1, 2, 3].map((idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setStep(idx)}
                            aria-label={`Step ${idx + 1}`}
                            className={cn(
                                "h-1 rounded-full transition-all duration-300",
                                step === idx
                                    ? "w-4 bg-blue-400"
                                    : "w-1.5 bg-slate-700 hover:bg-slate-500",
                            )}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => setPaused((p) => !p)}
                        title={paused ? "Resume animation" : "Replay / Pause"}
                        className="ml-1 rounded p-0.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        {paused ? (
                            <Play className="size-2.5" />
                        ) : (
                            <RotateCcw className="size-2.5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Center animated SVG Cloud Topology Canvas */}
            <div className="relative z-10 my-1 flex flex-1 items-center justify-center overflow-hidden rounded border border-slate-800/70 bg-slate-900/60 px-2 py-1">
                <svg
                    viewBox="0 0 360 120"
                    className="h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <title>GRAVITEX AI Studio Animated Cloud Topology</title>
                    {/* Grid dots */}
                    <pattern
                        id="gravitex-mini-grid"
                        width="18"
                        height="18"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle
                            cx="2"
                            cy="2"
                            r="0.8"
                            fill="rgba(148,163,184,0.18)"
                        />
                    </pattern>
                    <rect
                        width="360"
                        height="120"
                        fill="url(#gravitex-mini-grid)"
                    />

                    {/* VPC Boundary Box */}
                    <rect
                        x="88"
                        y="8"
                        width="262"
                        height="104"
                        rx="8"
                        stroke="rgba(59,130,246,0.45)"
                        strokeWidth="1.2"
                        strokeDasharray="4 3"
                        className="transition-opacity duration-500"
                        style={{ opacity: step >= 1 ? 1 : 0.25 }}
                    />
                    <text
                        x="96"
                        y="20"
                        fill="#60A5FA"
                        fontSize="7.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                    >
                        AWS VPC · Multi-AZ Production
                    </text>

                    {/* Animated Edges */}
                    {/* Edge 1: WAF -> ALB */}
                    <path
                        d="M72 60 H108"
                        stroke={step >= 1 ? "#38BDF8" : "#334155"}
                        strokeWidth="1.8"
                        strokeDasharray="3 3"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="12;0"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>

                    {/* Edge 2: ALB -> ECS AZ-a & AZ-b */}
                    <path
                        d="M166 60 C182 60, 182 36, 198 36"
                        stroke={step >= 2 ? "#818CF8" : "#334155"}
                        strokeWidth="1.6"
                        strokeDasharray="3 3"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="12;0"
                            dur="0.9s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <path
                        d="M166 60 C182 60, 182 84, 198 84"
                        stroke={step >= 2 ? "#818CF8" : "#334155"}
                        strokeWidth="1.6"
                        strokeDasharray="3 3"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="12;0"
                            dur="0.9s"
                            repeatCount="indefinite"
                        />
                    </path>

                    {/* Edge 3: ECS -> Aurora Primary & Standby */}
                    <path
                        d="M262 36 H284"
                        stroke={step >= 2 ? "#34D399" : "#334155"}
                        strokeWidth="1.6"
                        strokeDasharray="3 3"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="12;0"
                            dur="0.9s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <path
                        d="M262 84 H284"
                        stroke={step >= 2 ? "#34D399" : "#334155"}
                        strokeWidth="1.6"
                        strokeDasharray="3 3"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="12;0"
                            dur="0.9s"
                            repeatCount="indefinite"
                        />
                    </path>

                    {/* Replication link between Primary and Standby */}
                    <path
                        d="M314 52 V68"
                        stroke={step >= 3 ? "#F59E0B" : "#334155"}
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                    />

                    {/* Node 1: Route53 / WAF */}
                    <g
                        className="transition-all duration-500"
                        style={{
                            opacity: step >= 0 ? 1 : 0.3,
                            transform: step >= 0 ? "scale(1)" : "scale(0.92)",
                            transformOrigin: "41px 60px",
                        }}
                    >
                        <rect
                            x="10"
                            y="42"
                            width="62"
                            height="36"
                            rx="6"
                            fill="#0F172A"
                            stroke="#38BDF8"
                            strokeWidth="1.5"
                        />
                        <text
                            x="41"
                            y="57"
                            textAnchor="middle"
                            fill="#E0F2FE"
                            fontSize="8"
                            fontWeight="bold"
                        >
                            Route 53
                        </text>
                        <text
                            x="41"
                            y="69"
                            textAnchor="middle"
                            fill="#38BDF8"
                            fontSize="7"
                        >
                            CloudFront WAF
                        </text>
                    </g>

                    {/* Node 2: ALB */}
                    <g
                        className="transition-all duration-500"
                        style={{
                            opacity: step >= 1 ? 1 : 0.2,
                        }}
                    >
                        <rect
                            x="108"
                            y="42"
                            width="58"
                            height="36"
                            rx="6"
                            fill="#1E1B4B"
                            stroke="#60A5FA"
                            strokeWidth="1.5"
                        />
                        <text
                            x="137"
                            y="57"
                            textAnchor="middle"
                            fill="#DBEAFE"
                            fontSize="8"
                            fontWeight="bold"
                        >
                            AWS ALB
                        </text>
                        <text
                            x="137"
                            y="69"
                            textAnchor="middle"
                            fill="#93C5FD"
                            fontSize="7"
                        >
                            Ingress Gateway
                        </text>
                    </g>

                    {/* Node 3 & 4: ECS AZ-a and AZ-b */}
                    <g
                        className="transition-all duration-500"
                        style={{
                            opacity: step >= 2 ? 1 : 0.15,
                        }}
                    >
                        <rect
                            x="198"
                            y="22"
                            width="64"
                            height="28"
                            rx="5"
                            fill="#1E1B4B"
                            stroke="#818CF8"
                            strokeWidth="1.4"
                        />
                        <text
                            x="230"
                            y="35"
                            textAnchor="middle"
                            fill="#E0E7FF"
                            fontSize="7.5"
                            fontWeight="bold"
                        >
                            ECS Fargate
                        </text>
                        <text
                            x="230"
                            y="45"
                            textAnchor="middle"
                            fill="#A5B4FC"
                            fontSize="6.5"
                        >
                            Subnet AZ-a
                        </text>

                        <rect
                            x="198"
                            y="70"
                            width="64"
                            height="28"
                            rx="5"
                            fill="#1E1B4B"
                            stroke="#818CF8"
                            strokeWidth="1.4"
                        />
                        <text
                            x="230"
                            y="83"
                            textAnchor="middle"
                            fill="#E0E7FF"
                            fontSize="7.5"
                            fontWeight="bold"
                        >
                            ECS Fargate
                        </text>
                        <text
                            x="230"
                            y="93"
                            textAnchor="middle"
                            fill="#A5B4FC"
                            fontSize="6.5"
                        >
                            Subnet AZ-b
                        </text>
                    </g>

                    {/* Node 5 & 6: Aurora Primary & Standby */}
                    <g
                        className="transition-all duration-500"
                        style={{
                            opacity: step >= 3 ? 1 : step >= 2 ? 0.65 : 0.15,
                        }}
                    >
                        <rect
                            x="284"
                            y="22"
                            width="58"
                            height="28"
                            rx="5"
                            fill="#064E3B"
                            stroke="#34D399"
                            strokeWidth="1.4"
                        />
                        <text
                            x="313"
                            y="35"
                            textAnchor="middle"
                            fill="#D1FAE5"
                            fontSize="7.5"
                            fontWeight="bold"
                        >
                            Aurora DB
                        </text>
                        <text
                            x="313"
                            y="45"
                            textAnchor="middle"
                            fill="#6EE7B7"
                            fontSize="6.5"
                        >
                            Writer (Primary)
                        </text>

                        <rect
                            x="284"
                            y="70"
                            width="58"
                            height="28"
                            rx="5"
                            fill="#064E3B"
                            stroke="#F59E0B"
                            strokeWidth="1.4"
                        />
                        <text
                            x="313"
                            y="83"
                            textAnchor="middle"
                            fill="#FEF3C7"
                            fontSize="7.5"
                            fontWeight="bold"
                        >
                            Aurora Replica
                        </text>
                        <text
                            x="313"
                            y="93"
                            textAnchor="middle"
                            fill="#FCD34D"
                            fontSize="6.5"
                        >
                            Failover Standby
                        </text>
                    </g>
                </svg>
            </div>

            {/* Bottom live terminal ticker */}
            <div className="relative z-10 flex items-center justify-between gap-2 rounded bg-slate-900/95 px-2.5 py-1.5 font-mono text-[10px] ring-1 ring-slate-800">
                <span className="truncate text-blue-300">
                    {ANIMATION_STEPS[step].cmd}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[9.5px] text-emerald-400">
                    {step === 3 ? (
                        <CheckCircle2 className="size-3" />
                    ) : (
                        <Sparkles className="size-3 animate-spin" />
                    )}
                    <span className="max-sm:hidden">
                        {ANIMATION_STEPS[step].status}
                    </span>
                </span>
            </div>
        </div>
    )
}

function CloseButton({ onClick }: { onClick: () => void }) {
    const dict = useDictionary()
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dict.common.close}
            title={dict.common.close}
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            data-testid="mcp-video-close"
        >
            <X className="size-4" />
        </button>
    )
}

function NoticeLink({ className }: { className?: string }) {
    const dict = useDictionary()
    const lang = usePathLocale()
    return (
        <Link
            href={`/${lang}/mcp`}
            target="_blank"
            prefetch={false}
            className={cn("group flex min-w-0 items-center gap-3", className)}
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                <Terminal className="size-4 text-blue-600 dark:text-blue-400" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {BRAND_NAME} {dict.examples.mcpServer}
                </span>
                <span className="block text-xs leading-relaxed text-balance text-muted-foreground">
                    {dict.examples.mcpTagline}
                </span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </Link>
    )
}

const cardClass =
    "w-full rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"

export function McpNotice({ className }: { className?: string }) {
    const [closed, close] = useVideoClosed()
    if (closed) return null
    return (
        <div
            className={cn(cardClass, "p-3", className)}
            data-testid="mcp-notice"
        >
            <div className="flex items-center gap-2 pl-1">
                <NoticeLink className="flex-1" />
                <CloseButton onClick={close} />
            </div>
            <AnimatedArchitectureMotion className="mt-3" />
        </div>
    )
}
