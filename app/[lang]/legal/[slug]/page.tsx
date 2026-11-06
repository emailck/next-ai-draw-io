import "@/components/site/site.css"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import {
    BRAND_NAME,
    COMPANY_COPYRIGHT,
    LEGAL_DOCUMENTS,
    type LegalDocKey,
    SUPPORT_EMAIL,
} from "@/lib/brand"
import type { Locale } from "@/lib/i18n/config"
import { hasLocale } from "@/lib/i18n/dictionaries"

type Props = {
    params: Promise<{ lang: string; slug: string }>
}

const VALID_SLUGS: LegalDocKey[] = ["terms", "privacy", "aup"]

export function generateStaticParams() {
    return VALID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    if (!VALID_SLUGS.includes(slug as LegalDocKey)) {
        return { title: `Legal | ${BRAND_NAME}` }
    }
    const doc = LEGAL_DOCUMENTS[slug as LegalDocKey]
    return {
        title: `${doc.title} | ${BRAND_NAME}`,
        description: doc.summary,
    }
}

export default async function LegalPage({ params }: Props) {
    const { lang: rawLang, slug } = await params
    const lang: Locale = hasLocale(rawLang) ? rawLang : "en"
    if (!VALID_SLUGS.includes(slug as LegalDocKey)) {
        notFound()
    }
    const doc = LEGAL_DOCUMENTS[slug as LegalDocKey]

    return (
        <div className="site flex min-h-screen flex-col bg-canvas text-foreground">
            <div className="border-b border-border">
                <SiteHeader lang={lang} />
            </div>

            <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-12 md:px-8 md:py-16">
                <div className="mb-8 flex flex-wrap gap-2">
                    {VALID_SLUGS.map((key) => {
                        const item = LEGAL_DOCUMENTS[key]
                        const active = key === doc.key
                        return (
                            <Link
                                key={key}
                                href={`/${lang}/legal/${key}`}
                                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                                    active
                                        ? "bg-foreground text-background"
                                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {item.title}
                            </Link>
                        )
                    })}
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
                    <div className="border-b border-border pb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {BRAND_NAME} Legal & Compliance
                        </p>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                            {doc.title}
                        </h1>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Last Updated: {doc.lastUpdated}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {doc.summary}
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        {doc.sections.map((section) => (
                            <section
                                key={section.heading}
                                className="space-y-2.5"
                            >
                                <h2 className="text-base font-semibold text-foreground">
                                    {section.heading}
                                </h2>
                                {section.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 40)}
                                        className="text-sm leading-relaxed text-muted-foreground"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        ))}
                    </div>

                    <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
                        <p>{COMPANY_COPYRIGHT}</p>
                        <p className="mt-1">
                            Support:{" "}
                            <a
                                href={`mailto:${SUPPORT_EMAIL}`}
                                className="font-medium text-foreground underline underline-offset-4"
                            >
                                {SUPPORT_EMAIL}
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <SiteFooter lang={lang} path={`/legal/${doc.key}`} />
        </div>
    )
}
