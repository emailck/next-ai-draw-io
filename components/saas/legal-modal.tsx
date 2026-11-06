"use client"

import { ExternalLink, FileText, Mail, Shield } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathLocale } from "@/hooks/use-path-locale"
import {
    COMPANY_COPYRIGHT,
    LEGAL_DOCUMENTS,
    type LegalDocKey,
    SUPPORT_EMAIL,
} from "@/lib/brand"
import { cn } from "@/lib/utils"
import { useUiStore } from "@/stores/ui-store"

const LEGAL_TABS: { key: LegalDocKey; label: string }[] = [
    { key: "terms", label: "Terms of Service" },
    { key: "privacy", label: "Privacy Policy" },
    { key: "aup", label: "Acceptable Use Policy" },
]

export function LegalModal() {
    const open = useUiStore((s) => s.legalOpen)
    const setOpen = useUiStore((s) => s.setLegalOpen)
    const activeTab = useUiStore((s) => s.legalTab)
    const openLegal = useUiStore((s) => s.openLegal)
    const lang = usePathLocale()

    const doc = LEGAL_DOCUMENTS[activeTab] ?? LEGAL_DOCUMENTS.terms

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex h-[min(680px,88vh)] max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
                <div className="border-b border-border bg-card px-6 pt-5 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Shield className="size-5 text-blue-600 dark:text-blue-400" />
                            <DialogTitle className="text-lg font-bold text-foreground">
                                Legal & Compliance Center
                            </DialogTitle>
                        </div>
                        <Link
                            href={`/${lang}/legal/${doc.key}`}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                            Open standalone page
                            <ExternalLink className="size-3" />
                        </Link>
                    </div>
                    <DialogDescription className="mt-1 text-xs text-muted-foreground">
                        {COMPANY_COPYRIGHT}
                    </DialogDescription>

                    {/* Tabs */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {LEGAL_TABS.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => openLegal(tab.key)}
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                                    activeTab === tab.key
                                        ? "bg-foreground text-background"
                                        : "bg-muted text-muted-foreground hover:text-foreground",
                                )}
                                data-testid={`legal-tab-${tab.key}`}
                            >
                                <FileText className="size-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <ScrollArea className="min-h-0 flex-1 px-6 py-5">
                    <article className="space-y-5 text-sm leading-relaxed text-foreground">
                        <div className="rounded-xl border border-border bg-muted/40 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="text-base font-bold">
                                    {doc.title}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                    Last Updated: {doc.lastUpdated}
                                </span>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                {doc.summary}
                            </p>
                        </div>

                        {doc.sections.map((section) => (
                            <section
                                key={section.heading}
                                className="space-y-2"
                            >
                                <h4 className="text-sm font-semibold text-foreground">
                                    {section.heading}
                                </h4>
                                {section.paragraphs.map((p) => (
                                    <p
                                        key={p.slice(0, 40)}
                                        className="text-xs leading-relaxed text-muted-foreground"
                                    >
                                        {p}
                                    </p>
                                ))}
                            </section>
                        ))}
                    </article>
                </ScrollArea>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
                    <span>{COMPANY_COPYRIGHT}</span>
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
                    >
                        <Mail className="size-3.5" />
                        Support: {SUPPORT_EMAIL}
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    )
}
