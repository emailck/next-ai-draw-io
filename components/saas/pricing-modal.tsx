"use client"

import {
    BookOpen,
    Check,
    Cloud,
    ExternalLink,
    Layers,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { BrandMark } from "@/components/workspace/brand-mark"
import { usePathLocale } from "@/hooks/use-path-locale"
import {
    ARCHITECTURE_TEMPLATES,
    type ArchitectureTemplate,
    BRAND_BADGE,
    BRAND_NAME,
    BRAND_QUOTA_NOTICE,
    PRICING_PLANS,
    PUBLIC_BETA_MESSAGE,
    SUPPORT_EMAIL,
} from "@/lib/brand"
import { cn } from "@/lib/utils"
import { useUiStore } from "@/stores/ui-store"

/**
 * Reusable commercial SaaS pricing cards grid (used inside PricingModal and on /about page)
 */
export function PricingCardsGrid({
    onSelectPlan,
    compact = false,
}: {
    onSelectPlan: (planName: string, planId: string) => void
    compact?: boolean
}) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
        "monthly",
    )

    return (
        <div className="w-full">
            {/* Billing cycle toggle */}
            <div className="mb-6 flex items-center justify-center gap-3">
                <div className="inline-flex items-center rounded-xl border border-border bg-muted/60 p-1">
                    <button
                        type="button"
                        onClick={() => setBillingCycle("monthly")}
                        className={cn(
                            "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all",
                            billingCycle === "monthly"
                                ? "bg-card text-foreground shadow-xs"
                                : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        Monthly Billing
                    </button>
                    <button
                        type="button"
                        onClick={() => setBillingCycle("annual")}
                        className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all",
                            billingCycle === "annual"
                                ? "bg-card text-foreground shadow-xs"
                                : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        Annual Billing
                        <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                            Save 20%
                        </span>
                    </button>
                </div>
            </div>

            {/* 3-Tier SaaS Pricing Cards */}
            <div
                className={cn(
                    "grid gap-5",
                    compact ? "md:grid-cols-3" : "lg:grid-cols-3",
                )}
            >
                {PRICING_PLANS.map((plan) => {
                    const displayPrice =
                        billingCycle === "annual"
                            ? plan.annualPrice
                            : plan.price
                    const isPro = plan.popular

                    return (
                        <div
                            key={plan.id}
                            className={cn(
                                "relative flex flex-col rounded-2xl border p-6 transition-all",
                                isPro
                                    ? "border-blue-600/60 bg-gradient-to-b from-blue-500/[0.06] via-card to-card shadow-lg ring-1 ring-blue-500/30 dark:border-blue-400/50"
                                    : "border-border bg-card hover:border-foreground/20",
                            )}
                            data-testid={`pricing-card-${plan.id}`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow-xs">
                                    <Sparkles className="size-3" />
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-foreground">
                                    {plan.name}
                                </h3>
                                <p className="mt-1.5 min-h-[36px] text-xs leading-relaxed text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-5 flex items-baseline gap-1 border-b border-border pb-5">
                                <span className="text-3xl font-bold tracking-tight text-foreground">
                                    {displayPrice}
                                </span>
                                <span className="text-xs font-medium text-muted-foreground">
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="mb-6 flex-1 space-y-3 text-xs">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-2.5 text-foreground/90"
                                    >
                                        <span
                                            className={cn(
                                                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                                                isPro
                                                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                                    : "bg-muted text-foreground",
                                            )}
                                        >
                                            <Check className="size-2.5 stroke-[2.5]" />
                                        </span>
                                        <span className="leading-relaxed">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                type="button"
                                onClick={() => onSelectPlan(plan.name, plan.id)}
                                variant={isPro ? "default" : "outline"}
                                className={cn(
                                    "h-10 w-full rounded-xl text-xs font-semibold transition-all",
                                    isPro &&
                                        "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700",
                                )}
                                data-testid={`pricing-cta-${plan.id}`}
                            >
                                {plan.id === "starter"
                                    ? "Get Started Free"
                                    : plan.id === "pro"
                                      ? "Subscribe"
                                      : "Get Started"}
                            </Button>
                        </div>
                    )
                })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.05] px-4 py-2.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-2 font-medium text-foreground">
                    <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
                    {BRAND_QUOTA_NOTICE}
                </span>
                <span>
                    Enterprise custom billing:{" "}
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="font-medium text-foreground underline underline-offset-4"
                    >
                        {SUPPORT_EMAIL}
                    </a>
                </span>
            </div>
        </div>
    )
}

/**
 * Pricing Modal accessible from Header Navigation & Workspace
 */
export function PricingModal() {
    const open = useUiStore((s) => s.pricingOpen)
    const setOpen = useUiStore((s) => s.setPricingOpen)
    const openBetaNotice = useUiStore((s) => s.openBetaNotice)

    const handleSelectPlan = (planName: string, planId: string) => {
        setOpen(false)
        if (planId === "starter") {
            toast.success(BRAND_QUOTA_NOTICE)
            return
        }
        openBetaNotice(planName)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90vh] max-w-[calc(100%-1.5rem)] overflow-y-auto p-6 sm:max-w-5xl md:p-8">
                <div className="mb-6 text-center">
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        <Zap className="size-3" />
                        {BRAND_NAME} Workspace Plans
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Predictable SaaS Pricing for Modern Engineering Teams
                    </DialogTitle>
                    <DialogDescription className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
                        Generate, edit, and collaborate on AWS/GCP cloud
                        topologies, UML diagrams, and system architecture with
                        natural language.
                    </DialogDescription>
                </div>

                <PricingCardsGrid onSelectPlan={handleSelectPlan} compact />
            </DialogContent>
        </Dialog>
    )
}

/**
 * Public Beta Subscription & Sign-In Confirmation Modal
 * Displays the required message:
 * "Currently in Public Beta: Enjoy Pro tier features for free during our early-access period!"
 */
export function PublicBetaModal() {
    const open = useUiStore((s) => s.betaNoticeOpen)
    const setOpen = useUiStore((s) => s.setBetaNoticeOpen)
    const selectedPlanName = useUiStore((s) => s.selectedPlanName)
    const [email, setEmail] = useState("")

    const handleActivate = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success(PUBLIC_BETA_MESSAGE)
        setOpen(false)
        setEmail("")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-3 flex items-center gap-2">
                        <BrandMark className="size-9 rounded-xl" />
                        <span className="rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                            {BRAND_BADGE} ACCESS
                        </span>
                    </div>

                    <DialogTitle className="text-lg font-bold text-foreground">
                        {selectedPlanName
                            ? `${selectedPlanName} — Early Access`
                            : `${BRAND_NAME} Workspace`}
                    </DialogTitle>

                    <div
                        className="mt-4 w-full rounded-xl border border-blue-500/25 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent p-4 text-left"
                        data-testid="public-beta-banner"
                    >
                        <p className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-foreground">
                            <Sparkles className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                            <span>{PUBLIC_BETA_MESSAGE}</span>
                        </p>
                        <p className="mt-2 pl-6 text-xs text-muted-foreground">
                            {BRAND_QUOTA_NOTICE}
                        </p>
                    </div>

                    <DialogDescription className="mt-4 text-xs leading-relaxed text-muted-foreground">
                        Enter your work email to bind your workspace session and
                        receive notifications before general commercial billing
                        begins, or continue directly to the studio.
                    </DialogDescription>

                    <form
                        onSubmit={handleActivate}
                        className="mt-4 w-full space-y-3"
                    >
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="architect@company.com (optional)"
                            className="h-9 text-xs"
                        />
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="h-9 flex-1 rounded-lg text-xs"
                            >
                                Continue to Studio
                            </Button>
                            <Button
                                type="submit"
                                className="h-9 flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-semibold text-white hover:from-blue-700 hover:to-indigo-700"
                            >
                                Activate Free Pro Beta
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

/**
 * Cloud Architecture & Flowchart Templates Modal
 */
export function TemplatesModal({
    onSelectTemplate,
}: {
    onSelectTemplate?: (template: ArchitectureTemplate) => void
}) {
    const open = useUiStore((s) => s.templatesModalOpen)
    const setOpen = useUiStore((s) => s.setTemplatesModalOpen)
    const lang = usePathLocale()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[88vh] max-w-[calc(100%-1.5rem)] overflow-y-auto p-6 sm:max-w-4xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                    <div>
                        <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                            <Layers className="size-5 text-blue-600 dark:text-blue-400" />
                            Cloud Architecture & System Topology Templates
                        </DialogTitle>
                        <DialogDescription className="mt-1 text-xs text-muted-foreground">
                            Select an enterprise architecture blueprint to
                            populate the AI studio prompt, or browse the visual
                            gallery.
                        </DialogDescription>
                    </div>
                    <Link
                        href={`/${lang}/gallery`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-accent"
                    >
                        Full Template Gallery
                        <ExternalLink className="size-3.5" />
                    </Link>
                </div>

                <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                    {ARCHITECTURE_TEMPLATES.map((tpl) => (
                        <button
                            key={tpl.id}
                            type="button"
                            onClick={() => {
                                onSelectTemplate?.(tpl)
                                setOpen(false)
                                toast.success(
                                    `Loaded "${tpl.title}" blueprint into prompt composer`,
                                )
                            }}
                            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-blue-500/40 hover:bg-accent/40"
                        >
                            <div>
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                        <Cloud className="size-3" />
                                        {tpl.category}
                                    </span>
                                    <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                                        Use Blueprint →
                                    </span>
                                </div>
                                <h4 className="text-sm font-semibold text-foreground">
                                    {tpl.title}
                                </h4>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    {tpl.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

/**
 * Quick Start Documentation Modal
 */
export function QuickDocsModal() {
    const open = useUiStore((s) => s.docsModalOpen)
    const setOpen = useUiStore((s) => s.setDocsModalOpen)
    const lang = usePathLocale()

    const guides = [
        {
            step: "01",
            title: "Natural Language Cloud Topology Generation",
            text: `Describe your AWS, GCP, Azure, or Kubernetes infrastructure in plain text. ${BRAND_NAME} automatically selects official vendor icon libraries and connects components with orthogonal routing.`,
        },
        {
            step: "02",
            title: "Screenshot, PDF & Architecture Replication",
            text: "Attach an existing architecture screenshot, whiteboard sketch, or technical RFC document (.pdf, .md, .txt) to convert it into an editable vector diagram.",
        },
        {
            step: "03",
            title: "Interactive Vector Canvas & Smart Selection",
            text: "Select any node or connector directly on the draw.io vector canvas and press Cmd/Ctrl + / to ask AI for targeted failover, subnet, or styling refinements.",
        },
        {
            step: "04",
            title: "Version History & High-Res Export",
            text: "Every AI iteration creates a restorable snapshot. Compare versions side-by-side and export production-ready .drawio, SVG, or high-DPI PNG assets.",
        },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[88vh] max-w-[calc(100%-1.5rem)] overflow-y-auto p-6 sm:max-w-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                    <div>
                        <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                            <BookOpen className="size-5 text-blue-600 dark:text-blue-400" />
                            {BRAND_NAME} — Quick Start Guide
                        </DialogTitle>
                        <DialogDescription className="mt-1 text-xs text-muted-foreground">
                            Everything you need to generate and edit cloud
                            architecture diagrams.
                        </DialogDescription>
                    </div>
                    <Link
                        href={`/${lang}/docs`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
                    >
                        Full Documentation
                        <ExternalLink className="size-3.5" />
                    </Link>
                </div>

                <div className="mt-4 space-y-3">
                    {guides.map((item) => (
                        <div
                            key={item.step}
                            className="flex gap-3.5 rounded-xl border border-border bg-card p-3.5"
                        >
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                                {item.step}
                            </span>
                            <div>
                                <h4 className="text-sm font-semibold text-foreground">
                                    {item.title}
                                </h4>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
