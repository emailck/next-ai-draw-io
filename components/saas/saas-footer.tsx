"use client"

import { COMPANY_COPYRIGHT, SUPPORT_EMAIL } from "@/lib/brand"
import { cn } from "@/lib/utils"
import { useUiStore } from "@/stores/ui-store"

/**
 * Standard Compliance Footer for GRAVITEX AI Studio (Stripe & Bank Audit Ready)
 * Includes:
 * 1. Statutory LLC Copyright line (© 2026 GRAVITEX AI GLOBAL LLC. All rights reserved.)
 * 2. Commercial support email (Support: support@gravitexai.com)
 * 3. Legal modal triggers (Terms of Service, Privacy Policy, Acceptable Use Policy)
 */
export function SaasFooter({ className }: { className?: string }) {
    const openLegal = useUiStore((s) => s.openLegal)
    const setPricingOpen = useUiStore((s) => s.setPricingOpen)

    return (
        <footer
            className={cn(
                "w-full border-t border-border/80 bg-card/90 px-4 py-3 text-[12px] text-muted-foreground backdrop-blur-xs",
                className,
            )}
            data-testid="saas-footer"
        >
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2.5 md:flex-row">
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center md:text-left">
                    <span className="font-medium text-foreground/85">
                        {COMPANY_COPYRIGHT}
                    </span>
                    <span className="hidden text-border md:inline">|</span>
                    <span>
                        Support:{" "}
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                        >
                            {SUPPORT_EMAIL}
                        </a>
                    </span>
                </div>

                <nav
                    aria-label="Legal and compliance links"
                    className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
                >
                    <button
                        type="button"
                        onClick={() => setPricingOpen(true)}
                        className="hover:text-foreground hover:underline"
                    >
                        Pricing
                    </button>
                    <button
                        type="button"
                        onClick={() => openLegal("terms")}
                        className="hover:text-foreground hover:underline"
                        data-testid="footer-terms"
                    >
                        Terms of Service
                    </button>
                    <button
                        type="button"
                        onClick={() => openLegal("privacy")}
                        className="hover:text-foreground hover:underline"
                        data-testid="footer-privacy"
                    >
                        Privacy Policy
                    </button>
                    <button
                        type="button"
                        onClick={() => openLegal("aup")}
                        className="hover:text-foreground hover:underline"
                        data-testid="footer-aup"
                    >
                        Acceptable Use Policy
                    </button>
                </nav>
            </div>
        </footer>
    )
}
