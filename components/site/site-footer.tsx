import Link from "next/link"
import { BrandMark } from "@/components/workspace/brand-mark"
import {
    BRAND_ALT_NAME,
    BRAND_BADGE,
    BRAND_NAME,
    COMPANY_COPYRIGHT,
    SUPPORT_EMAIL,
} from "@/lib/brand"
import { i18n, type Locale } from "@/lib/i18n/config"
import { LANGUAGE_NAMES, SITE_TEXTS } from "./site-texts"

/**
 * Commercial Compliance Footer at the bottom of site pages (/about, /gallery, /docs, /mcp, /legal).
 */
export function SiteFooter({ lang, path }: { lang: Locale; path: string }) {
    const t = SITE_TEXTS[lang].footer
    const columns = [
        {
            title: t.product,
            links: [
                { label: t.editor, href: `/${lang}` },
                { label: t.templates, href: `/${lang}/gallery` },
                { label: t.pricing, href: `/${lang}/about#pricing` },
                { label: t.docs, href: `/${lang}/docs` },
                { label: t.mcp, href: `/${lang}/mcp` },
            ],
        },
        {
            title: t.legal,
            links: [
                { label: t.terms, href: `/${lang}/legal/terms` },
                { label: t.privacy, href: `/${lang}/legal/privacy` },
                { label: t.aup, href: `/${lang}/legal/aup` },
            ],
        },
    ]

    return (
        <footer className="border-t border-border bg-canvas">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-9 px-5 pt-10 pb-9 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-10 md:px-8 md:pt-12 md:pb-10">
                <div className="col-span-2 md:col-span-1">
                    <Link
                        href={`/${lang}/about`}
                        className="flex items-center gap-2.5"
                    >
                        <BrandMark className="size-6" />
                        <span className="text-[14.5px] font-semibold">
                            {BRAND_NAME}
                        </span>
                        <span className="rounded border border-blue-500/25 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                            {BRAND_BADGE}
                        </span>
                    </Link>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                        {BRAND_ALT_NAME}
                    </p>
                    <p className="mt-3 max-w-[34ch] text-[13.5px] leading-relaxed text-muted-foreground">
                        {t.tagline}
                    </p>
                </div>
                {columns.map((column) => (
                    <div key={column.title}>
                        <h2 className="text-[13px] font-semibold">
                            {column.title}
                        </h2>
                        <ul className="mt-3 space-y-2.5 text-[14px] text-muted-foreground md:space-y-2 md:text-[13.5px]">
                            {column.links.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="col-span-2 md:col-span-1">
                    <h2 className="text-[13px] font-semibold">{t.support}</h2>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                        {t.supportText}
                    </p>
                    <p className="mt-2.5 text-[13.5px] text-muted-foreground">
                        Support:{" "}
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                        >
                            {SUPPORT_EMAIL}
                        </a>
                    </p>
                </div>
            </div>
            <div className="mx-auto flex max-w-7xl flex-col-reverse items-start justify-between gap-3 border-t border-border px-5 py-5 text-[12.5px] text-muted-foreground md:flex-row md:items-center md:gap-6 md:px-8">
                <span>{COMPANY_COPYRIGHT}</span>
                <nav className="flex flex-wrap gap-x-4 gap-y-2">
                    {i18n.locales.map((locale) => (
                        <Link
                            key={locale}
                            href={`/${locale}${path}`}
                            hrefLang={locale}
                            lang={locale}
                            className={
                                locale === lang
                                    ? "text-foreground"
                                    : "hover:text-foreground"
                            }
                            aria-current={locale === lang ? "page" : undefined}
                        >
                            {LANGUAGE_NAMES[locale]}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    )
}
