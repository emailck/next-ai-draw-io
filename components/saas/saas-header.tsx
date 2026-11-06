"use client"

import {
    BookOpen,
    CreditCard,
    Layers,
    LogIn,
    Settings,
    Sparkles,
} from "lucide-react"
import { BrandMark } from "@/components/workspace/brand-mark"
import { IconButton } from "@/components/workspace/icon-button"
import { useDictionary } from "@/hooks/use-dictionary"
import { BRAND_BADGE, BRAND_NAME } from "@/lib/brand"
import { cn } from "@/lib/utils"
import { useUiStore } from "@/stores/ui-store"

/**
 * Commercial B2B SaaS Header Navigation Bar for AICoco Studio Workspace
 * Left: AICoco Studio Logo + Product Name + light-blue BETA badge
 * Right/Center: Templates | Documentation | Pricing | Sign In / Upgrade to Pro + Settings
 */
export function SaasHeader({
    className,
    compact = false,
}: {
    className?: string
    compact?: boolean
}) {
    const dict = useDictionary()
    const openSettings = useUiStore((s) => s.openSettings)
    const setPricingOpen = useUiStore((s) => s.setPricingOpen)
    const openBetaNotice = useUiStore((s) => s.openBetaNotice)
    const setTemplatesModalOpen = useUiStore((s) => s.setTemplatesModalOpen)
    const setDocsModalOpen = useUiStore((s) => s.setDocsModalOpen)

    return (
        <header
            className={cn(
                "flex items-center justify-between gap-3 border-b border-border/80 bg-card/95 px-4 py-2 backdrop-blur-md",
                className,
            )}
            data-testid="saas-header"
        >
            {/* Left: Brand Logo + Product Name + Light-blue BETA badge */}
            <div className="flex items-center gap-2.5">
                <BrandMark className="size-7" />
                <span className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                    {BRAND_NAME}
                </span>
                <span className="inline-flex items-center rounded-md border border-blue-500/25 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-blue-600 dark:text-blue-400">
                    {BRAND_BADGE}
                </span>
            </div>

            {/* Center / Right Navigation Items */}
            <nav
                aria-label="Primary SaaS Navigation"
                className="flex items-center gap-1 sm:gap-1.5"
            >
                <button
                    type="button"
                    onClick={() => setTemplatesModalOpen(true)}
                    className={cn(
                        "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                        compact && "px-2",
                    )}
                    data-testid="nav-templates"
                >
                    <Layers className="size-3.5" />
                    <span className={cn(compact && "max-sm:hidden")}>
                        Templates
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setDocsModalOpen(true)}
                    className={cn(
                        "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                        compact && "px-2",
                    )}
                    data-testid="nav-documentation"
                >
                    <BookOpen className="size-3.5" />
                    <span className={cn(compact && "max-sm:hidden")}>
                        Documentation
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setPricingOpen(true)}
                    className={cn(
                        "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                        compact && "px-2",
                    )}
                    data-testid="nav-pricing"
                >
                    <CreditCard className="size-3.5" />
                    <span className={cn(compact && "max-sm:hidden")}>
                        Pricing
                    </span>
                </button>

                <div className="mx-1 hidden h-4 w-px bg-border sm:block" />

                <button
                    type="button"
                    onClick={() => openBetaNotice("Sign In / Workspace")}
                    className="hidden h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent md:inline-flex"
                    data-testid="nav-signin"
                >
                    <LogIn className="size-3.5 text-muted-foreground" />
                    Sign In
                </button>

                <button
                    type="button"
                    onClick={() => openBetaNotice("Pro Plan")}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-xs font-semibold text-white shadow-xs transition-all hover:from-blue-700 hover:to-indigo-700"
                    data-testid="nav-upgrade-pro"
                >
                    <Sparkles className="size-3.5" />
                    <span>Upgrade to Pro</span>
                </button>

                <IconButton
                    label={dict.nav.settings}
                    onClick={() => openSettings()}
                    data-testid="settings-button"
                >
                    <Settings />
                </IconButton>
            </nav>
        </header>
    )
}
