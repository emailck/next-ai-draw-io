"use client"

import { cn } from "@/lib/utils"

/**
 * GRAVITEX AI Studio independent modern cloud-topology vector brand icon
 */
export function BrandMark({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "relative inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-xs",
                className,
            )}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-full"
                aria-hidden="true"
            >
                <title>GRAVITEX AI Studio</title>
                <defs>
                    <linearGradient
                        id="gravitex-brand-bg"
                        x1="0"
                        y1="0"
                        x2="64"
                        y2="64"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
                <rect
                    width="64"
                    height="64"
                    rx="14"
                    fill="url(#gravitex-brand-bg)"
                />
                <rect
                    x="2"
                    y="2"
                    width="60"
                    height="60"
                    rx="12"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                />
                <path
                    d="M32 13L48.5 22.5V41.5L32 51L15.5 41.5V22.5L32 13Z"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                    fill="white"
                    fillOpacity="0.1"
                />
                <path
                    d="M32 13V32M32 32L48.5 22.5M32 32L15.5 22.5M32 32V51"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
                <circle cx="32" cy="13" r="3.6" fill="white" />
                <circle cx="48.5" cy="22.5" r="3.6" fill="white" />
                <circle cx="15.5" cy="22.5" r="3.6" fill="white" />
                <circle cx="48.5" cy="41.5" r="3.2" fill="#DBEAFE" />
                <circle cx="15.5" cy="41.5" r="3.2" fill="#DBEAFE" />
                <circle cx="32" cy="51" r="3.6" fill="white" />
                <circle cx="32" cy="32" r="5.5" fill="white" />
                <circle cx="32" cy="32" r="2.4" fill="#2563EB" />
            </svg>
        </span>
    )
}
