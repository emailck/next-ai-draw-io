"use client"

import { Zap } from "lucide-react"
import { toast } from "sonner"
import { LegalModal } from "@/components/saas/legal-modal"
import {
    PricingCardsGrid,
    PublicBetaModal,
} from "@/components/saas/pricing-modal"
import { BRAND_NAME, BRAND_QUOTA_NOTICE } from "@/lib/brand"
import { useUiStore } from "@/stores/ui-store"

/**
 * Dedicated Commercial SaaS Pricing Section embedded on /[lang]/about#pricing
 * Allows bank/Stripe reviewers to inspect the 3-tier pricing model directly on the landing page
 * and triggers the Public Beta confirmation modal when clicking Subscribe / Get Started.
 */
export function AboutPricingSection() {
    const openBetaNotice = useUiStore((s) => s.openBetaNotice)

    const handleSelectPlan = (planName: string, planId: string) => {
        if (planId === "starter") {
            toast.success(BRAND_QUOTA_NOTICE)
            return
        }
        openBetaNotice(planName)
    }

    return (
        <section
            id="pricing"
            className="scroll-mt-16 border-b border-border bg-canvas"
            data-testid="about-pricing-section"
        >
            <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
                <div className="mb-10 text-center">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        <Zap className="size-3.5" />
                        {BRAND_NAME} Commercial Plans
                    </div>
                    <h2 className="text-[26px] font-bold tracking-[-0.025em] text-foreground md:text-[34px]">
                        Transparent SaaS Pricing for Cloud Architects & Teams
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-[15px] text-muted-foreground">
                        Start with our free Starter trial or scale to unlimited
                        AI topology generation, official cloud icon packs, and
                        real-time team collaboration.
                    </p>
                </div>

                <PricingCardsGrid onSelectPlan={handleSelectPlan} />
                <PublicBetaModal />
                <LegalModal />
            </div>
        </section>
    )
}
