"use client"

import {
    CheckCircle2,
    Pause,
    Play,
    RotateCcw,
    Sparkles,
    Terminal,
} from "lucide-react"
import { useEffect, useState } from "react"
import { BRAND_NAME } from "@/lib/brand"
import { cn } from "@/lib/utils"

const SCENES = [
    {
        step: "01",
        title: "Connect IDE Agent",
        prompt: "claude mcp add drawio -- npx @gravitexai/mcp-server@latest",
        toolCall: "start_session({ workspace: 'GRAVITEX AI Studio' })",
        log: "Connected live browser canvas on port 6002",
    },
    {
        step: "02",
        title: "Generate Cloud Ingress",
        prompt: "Draw AWS Multi-AZ HA architecture with WAF & ALB ingress",
        toolCall: "create_new_diagram({ vendor: 'AWS', zones: 2 })",
        log: "Rendered Route 53, CloudFront WAF & Application Load Balancer",
    },
    {
        step: "03",
        title: "Scale Compute & DB Cluster",
        prompt: "Add ECS Fargate across AZ-a/AZ-b and Aurora failover replica",
        toolCall:
            "edit_diagram({ addNodes: ['ecs-az1', 'ecs-az2', 'aurora'] })",
        log: "Auto-routed 6 vector connectors with zero overlap",
    },
    {
        step: "04",
        title: "Snapshot & Vector Export",
        prompt: "Verify failover topology and export production SVG/XML",
        toolCall: "export_diagram({ format: 'drawio.svg', highRes: true })",
        log: "Immutable version v2 saved · Ready for engineering RFC",
    },
]

/**
 * Full-size pure-code animated showcase replacing the legacy mp4 video on /[lang]/mcp.
 * Simulates an IDE agent streaming MCP tool calls into a live GRAVITEX AI Studio vector canvas.
 */
export function PromoVideo({ label }: { label: string }) {
    const [scene, setScene] = useState(0)
    const [playing, setPlaying] = useState(true)

    useEffect(() => {
        if (!playing) return
        const id = setInterval(() => {
            setScene((prev) => (prev + 1) % SCENES.length)
        }, 2800)
        return () => clearInterval(id)
    }, [playing])

    const current = SCENES[scene]

    return (
        <div
            role="img"
            aria-label={label}
            className="relative flex aspect-video w-full flex-col justify-between overflow-hidden bg-slate-950 p-4 text-slate-100 select-none md:p-7"
        >
            {/* Ambient background gradients */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-indigo-600/20 blur-3xl" />

            {/* Top Window Chrome */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-rose-500/70" />
                        <span className="size-2.5 rounded-full bg-amber-500/70" />
                        <span className="size-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="ml-2 font-mono text-xs font-semibold text-slate-200">
                        {BRAND_NAME} — Live MCP Architecture Stream
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300 sm:inline-flex">
                        <span className="size-1.5 animate-ping rounded-full bg-emerald-400" />
                        @gravitexai/mcp-server
                    </span>
                    <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-300 hover:bg-slate-800"
                    >
                        {playing ? (
                            <>
                                <Pause className="size-3" /> Pause
                            </>
                        ) : (
                            <>
                                <Play className="size-3" /> Play
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setScene(0)
                            setPlaying(true)
                        }}
                        title="Restart animation"
                        className="rounded-md border border-slate-700 bg-slate-900 p-1 text-slate-300 hover:bg-slate-800"
                    >
                        <RotateCcw className="size-3.5" />
                    </button>
                </div>
            </div>

            {/* Split View: Left IDE Terminal Stream + Right Live Vector Canvas */}
            <div className="relative z-10 my-3 grid flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-[1fr_1.35fr]">
                {/* Left: Animated Agent Terminal */}
                <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/85 p-4 font-mono text-xs">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="inline-flex items-center gap-1.5 text-blue-400">
                                <Terminal className="size-3.5" />
                                IDE Agent Session
                            </span>
                            <span>Step {current.step} / 04</span>
                        </div>

                        <div className="rounded-lg bg-slate-950/90 p-3 ring-1 ring-slate-800">
                            <div className="text-[10px] uppercase tracking-wider text-slate-500">
                                Prompt / Command
                            </div>
                            <div className="mt-1 text-slate-200">
                                <span className="text-blue-400">&gt; </span>
                                {current.prompt}
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-950/30 p-3 ring-1 ring-blue-500/30">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-blue-300">
                                <span>MCP Tool Invocation</span>
                                <Sparkles className="size-3 animate-pulse text-blue-400" />
                            </div>
                            <div className="mt-1 truncate text-blue-200">
                                {current.toolCall}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 border-t border-slate-800 pt-2.5 text-[11px] text-emerald-400">
                        <CheckCircle2 className="size-3.5 shrink-0" />
                        <span className="truncate">{current.log}</span>
                    </div>
                </div>

                {/* Right: Live Animated SVG Architecture Canvas */}
                <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                    <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                        <span className="font-mono font-medium text-slate-300">
                            {BRAND_NAME} Vector Canvas
                        </span>
                        <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] text-indigo-300">
                            {scene >= 3
                                ? "v2 Snapshot Saved"
                                : "Live Streaming"}
                        </span>
                    </div>

                    <svg
                        viewBox="0 0 420 185"
                        className="my-auto h-full w-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <title>GRAVITEX AI Studio Live MCP Vector Canvas</title>
                        <pattern
                            id="gravitex-mcp-grid"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="2"
                                cy="2"
                                r="0.9"
                                fill="rgba(148,163,184,0.16)"
                            />
                        </pattern>
                        <rect
                            width="420"
                            height="185"
                            fill="url(#gravitex-mcp-grid)"
                        />

                        {/* AWS VPC Outer Frame */}
                        <rect
                            x="105"
                            y="12"
                            width="302"
                            height="160"
                            rx="10"
                            stroke="rgba(59,130,246,0.45)"
                            strokeWidth="1.5"
                            strokeDasharray="5 4"
                            style={{ opacity: scene >= 1 ? 1 : 0.25 }}
                        />
                        <text
                            x="118"
                            y="27"
                            fill="#60A5FA"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                        >
                            AWS Cloud · Multi-AZ Production VPC
                        </text>

                        {/* Animated Connectors */}
                        <path
                            d="M86 92 H125"
                            stroke={scene >= 1 ? "#38BDF8" : "#334155"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values="16;0"
                                dur="0.9s"
                                repeatCount="indefinite"
                            />
                        </path>

                        <path
                            d="M195 92 C212 92, 212 58, 228 58"
                            stroke={scene >= 2 ? "#818CF8" : "#334155"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values="16;0"
                                dur="0.9s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path
                            d="M195 92 C212 92, 212 128, 228 128"
                            stroke={scene >= 2 ? "#818CF8" : "#334155"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values="16;0"
                                dur="0.9s"
                                repeatCount="indefinite"
                            />
                        </path>

                        <path
                            d="M304 58 H326"
                            stroke={scene >= 2 ? "#34D399" : "#334155"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values="16;0"
                                dur="0.9s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path
                            d="M304 128 H326"
                            stroke={scene >= 2 ? "#34D399" : "#334155"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values="16;0"
                                dur="0.9s"
                                repeatCount="indefinite"
                            />
                        </path>

                        {/* Sync replication arrow */}
                        <path
                            d="M362 80 V106"
                            stroke={scene >= 3 ? "#F59E0B" : "#334155"}
                            strokeWidth="1.8"
                            strokeDasharray="3 3"
                        />

                        {/* Ingress Node */}
                        <g style={{ opacity: scene >= 0 ? 1 : 0.3 }}>
                            <rect
                                x="14"
                                y="68"
                                width="72"
                                height="48"
                                rx="8"
                                fill="#0F172A"
                                stroke="#38BDF8"
                                strokeWidth="1.8"
                            />
                            <text
                                x="50"
                                y="88"
                                textAnchor="middle"
                                fill="#E0F2FE"
                                fontSize="9.5"
                                fontWeight="bold"
                            >
                                Route 53
                            </text>
                            <text
                                x="50"
                                y="103"
                                textAnchor="middle"
                                fill="#38BDF8"
                                fontSize="8"
                            >
                                AWS WAF Edge
                            </text>
                        </g>

                        {/* ALB Node */}
                        <g
                            className="transition-opacity duration-500"
                            style={{ opacity: scene >= 1 ? 1 : 0.2 }}
                        >
                            <rect
                                x="125"
                                y="68"
                                width="70"
                                height="48"
                                rx="8"
                                fill="#1E1B4B"
                                stroke="#60A5FA"
                                strokeWidth="1.8"
                            />
                            <text
                                x="160"
                                y="88"
                                textAnchor="middle"
                                fill="#DBEAFE"
                                fontSize="9.5"
                                fontWeight="bold"
                            >
                                AWS ALB
                            </text>
                            <text
                                x="160"
                                y="103"
                                textAnchor="middle"
                                fill="#93C5FD"
                                fontSize="8"
                            >
                                Multi-AZ LB
                            </text>
                        </g>

                        {/* ECS Nodes */}
                        <g
                            className="transition-opacity duration-500"
                            style={{ opacity: scene >= 2 ? 1 : 0.15 }}
                        >
                            <rect
                                x="228"
                                y="36"
                                width="76"
                                height="44"
                                rx="7"
                                fill="#1E1B4B"
                                stroke="#818CF8"
                                strokeWidth="1.6"
                            />
                            <text
                                x="266"
                                y="55"
                                textAnchor="middle"
                                fill="#E0E7FF"
                                fontSize="9"
                                fontWeight="bold"
                            >
                                ECS Fargate
                            </text>
                            <text
                                x="266"
                                y="69"
                                textAnchor="middle"
                                fill="#A5B4FC"
                                fontSize="7.5"
                            >
                                us-east-1a
                            </text>

                            <rect
                                x="228"
                                y="106"
                                width="76"
                                height="44"
                                rx="7"
                                fill="#1E1B4B"
                                stroke="#818CF8"
                                strokeWidth="1.6"
                            />
                            <text
                                x="266"
                                y="125"
                                textAnchor="middle"
                                fill="#E0E7FF"
                                fontSize="9"
                                fontWeight="bold"
                            >
                                ECS Fargate
                            </text>
                            <text
                                x="266"
                                y="139"
                                textAnchor="middle"
                                fill="#A5B4FC"
                                fontSize="7.5"
                            >
                                us-east-1b
                            </text>
                        </g>

                        {/* Aurora Primary & Standby */}
                        <g
                            className="transition-opacity duration-500"
                            style={{
                                opacity:
                                    scene >= 3 ? 1 : scene >= 2 ? 0.7 : 0.15,
                            }}
                        >
                            <rect
                                x="326"
                                y="36"
                                width="70"
                                height="44"
                                rx="7"
                                fill="#064E3B"
                                stroke="#34D399"
                                strokeWidth="1.6"
                            />
                            <text
                                x="361"
                                y="55"
                                textAnchor="middle"
                                fill="#D1FAE5"
                                fontSize="9"
                                fontWeight="bold"
                            >
                                Aurora DB
                            </text>
                            <text
                                x="361"
                                y="69"
                                textAnchor="middle"
                                fill="#6EE7B7"
                                fontSize="7.5"
                            >
                                Primary Writer
                            </text>

                            <rect
                                x="326"
                                y="106"
                                width="70"
                                height="44"
                                rx="7"
                                fill="#064E3B"
                                stroke="#F59E0B"
                                strokeWidth="1.6"
                            />
                            <text
                                x="361"
                                y="125"
                                textAnchor="middle"
                                fill="#FEF3C7"
                                fontSize="9"
                                fontWeight="bold"
                            >
                                Aurora DB
                            </text>
                            <text
                                x="361"
                                y="139"
                                textAnchor="middle"
                                fill="#FCD34D"
                                fontSize="7.5"
                            >
                                Hot Standby
                            </text>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Interactive 4-Step Progress Bar */}
            <div className="relative z-10 grid grid-cols-4 gap-2 pt-1">
                {SCENES.map((s, idx) => (
                    <button
                        key={s.step}
                        type="button"
                        onClick={() => {
                            setScene(idx)
                            setPlaying(false)
                        }}
                        className={cn(
                            "rounded-lg border px-2.5 py-1.5 text-left transition-all",
                            scene === idx
                                ? "border-blue-500/60 bg-blue-500/15 text-white"
                                : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200",
                        )}
                    >
                        <div className="font-mono text-[10px] font-semibold text-blue-400">
                            {s.step}
                        </div>
                        <div className="truncate text-[11px] font-medium">
                            {s.title}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
