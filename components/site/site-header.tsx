import { Sparkles } from "lucide-react"
import Link from "next/link"
import { BrandMark } from "@/components/workspace/brand-mark"
import { BRAND_BADGE, BRAND_NAME } from "@/lib/brand"
import type { Locale } from "@/lib/i18n/config"
import { LanguageMenu } from "./language-menu"
import { SiteMenu } from "./site-menu"
import { SITE_TEXTS } from "./site-texts"
import { ThemeToggle } from "./theme-toggle"

type Page = "mcp" | "gallery" | "docs" | "pricing"

/** Commercial B2B SaaS Header on site pages (/about, /gallery, /docs, /mcp, /legal) */
export async function SiteHeader({
    lang,
    current,
}: {
    lang: Locale
    current?: Page
}) {
    const t = SITE_TEXTS[lang].nav
    const navLinks: { page: Page; label: string; href: string }[] = [
        { page: "gallery", label: t.templates, href: `/${lang}/gallery` },
        { page: "docs", label: t.docs, href: `/${lang}/docs` },
        { page: "pricing", label: t.pricing, href: `/${lang}/about#pricing` },
    ]

    return (
        <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 md:px-8">
            <Link
                href={`/${lang}/about`}
                className="flex shrink-0 items-center gap-2.5"
            >
                <BrandMark className="size-7" />
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                    {BRAND_NAME}
                </span>
                <span className="inline-flex items-center rounded-md border border-blue-500/25 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-blue-600 dark:text-blue-400">
                    {BRAND_BADGE}
                </span>
            </Link>

            {/* Below 1024 px the text links move into the menu */}
            <nav className="flex items-center gap-1 text-[14px] text-muted-foreground lg:gap-6">
                {navLinks.map(({ page, label, href }) => (
                    <Link
                        key={page}
                        href={href}
                        className={`whitespace-nowrap hover:text-foreground max-lg:hidden ${current === page ? "font-medium text-foreground" : ""}`}
                        aria-current={current === page ? "page" : undefined}
                    >
                        {label}
                    </Link>
                ))}
                <div className="flex items-center gap-1">
                    <LanguageMenu lang={lang} label={t.language} />
                    <ThemeToggle />
                </div>
                <Link
                    href={`/${lang}`}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground transition-colors hover:bg-accent max-lg:hidden"
                >
                    {t.signIn}
                </Link>
                <Link
                    href={`/${lang}/about#pricing`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-xs transition-all hover:from-blue-700 hover:to-indigo-700 max-lg:hidden"
                >
                    <Sparkles className="size-3.5" />
                    {t.upgradePro}
                </Link>
                <SiteMenu label={t.menu}>
                    {navLinks.map(({ page, label, href }) => (
                        <Link
                            key={page}
                            href={href}
                            className={`flex items-center gap-2.5 border-b border-border py-3 ${current === page ? "font-medium" : ""}`}
                            aria-current={current === page ? "page" : undefined}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href={`/${lang}/about#pricing`}
                        className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                    >
                        <Sparkles className="size-4" />
                        {t.upgradePro}
                    </Link>
                    <Link
                        href={`/${lang}`}
                        className="mt-2 block rounded-lg border border-border bg-card px-4 py-2.5 text-center text-sm font-medium text-foreground"
                    >
                        {t.openEditor}
                    </Link>
                </SiteMenu>
            </nav>
        </header>
    )
}
