import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata, Viewport } from "next"
import { Instrument_Sans, JetBrains_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import Script from "next/script"
import { LocaleProvider } from "@/components/canvas/locale-context"
import { AppToaster } from "@/components/workspace/app-toaster"
import { DiagramProvider } from "@/contexts/diagram-context"
import { DictionaryProvider } from "@/hooks/use-dictionary"
import {
    BRAND_DESCRIPTION,
    BRAND_NAME,
    BRAND_TITLE,
    SUPPORT_EMAIL,
} from "@/lib/brand"
import type { Locale } from "@/lib/i18n/config"
import { i18n } from "@/lib/i18n/config"
import { getDictionary, hasLocale } from "@/lib/i18n/dictionaries"
import { localeAlternates, OG_IMAGE, OG_LOCALE, SITE_URL } from "@/lib/seo"
import { THEME_INIT_SCRIPT } from "@/stores/settings-store"

import "../globals.css"

const instrumentSans = Instrument_Sans({
    variable: "--font-latin",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    // Chinese and Japanese text falls through to system fonts, in the
    // order globals.css picks for the page's language
    fallback: [],
})

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
})

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

// Generate static params for all locales
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

// Generate metadata per locale
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>
}): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang: Locale = hasLocale(rawLang) ? rawLang : i18n.defaultLocale

    const titles: Record<Locale, string> = {
        en: BRAND_TITLE,
        zh: BRAND_TITLE,
        ja: BRAND_TITLE,
        "zh-Hant": BRAND_TITLE,
    }

    const descriptions: Record<Locale, string> = {
        en: BRAND_DESCRIPTION,
        zh: BRAND_DESCRIPTION,
        ja: BRAND_DESCRIPTION,
        "zh-Hant": BRAND_DESCRIPTION,
    }

    return {
        title: titles[lang],
        description: descriptions[lang],
        keywords: [
            "AICoco Studio",
            "AICoco Architecture",
            "AI cloud architecture generator",
            "AWS architecture diagram",
            "GCP cloud topology",
            "UML diagram generator",
            "system architecture design",
            "B2B SaaS diagramming tool",
            "draw.io AI studio",
        ],
        authors: [{ name: BRAND_NAME }],
        creator: BRAND_NAME,
        publisher: BRAND_NAME,
        metadataBase: new URL(SITE_URL),
        openGraph: {
            title: titles[lang],
            description: descriptions[lang],
            type: "website",
            url: `/${lang}`,
            siteName: BRAND_NAME,
            locale: OG_LOCALE[lang],
            images: [
                {
                    ...OG_IMAGE,
                    alt: BRAND_TITLE,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: titles[lang],
            description: descriptions[lang],
            images: ["/architecture.png"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        icons: {
            icon: [
                { url: "/logo.svg", type: "image/svg+xml" },
                { url: "/favicon.ico" },
            ],
            shortcut: "/logo.svg",
            apple: "/logo.svg",
        },
        // The home page's; other pages set their own
        alternates: localeAlternates(lang, ""),
    }
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: string }>
}>) {
    const { lang } = await params
    if (!hasLocale(lang)) notFound()
    const validLang = lang as Locale
    const dictionary = await getDictionary(validLang)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: BRAND_NAME,
        alternateName: "AICoco Architecture",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Windows, macOS, Linux",
        description: BRAND_DESCRIPTION,
        url: SITE_URL,
        email: SUPPORT_EMAIL,
        inLanguage: validLang,
        offers: [
            {
                "@type": "Offer",
                name: "Starter Plan",
                price: "0",
                priceCurrency: "USD",
            },
            {
                "@type": "Offer",
                name: "Pro Plan",
                price: "15",
                priceCurrency: "USD",
            },
            {
                "@type": "Offer",
                name: "Team Plan",
                price: "35",
                priceCurrency: "USD",
            },
        ],
    }

    return (
        <html lang={validLang} suppressHydrationWarning>
            <head>
                {/* Apply dark mode before the first paint (no white flash) */}
                <Script id="theme-init" strategy="beforeInteractive">
                    {THEME_INIT_SCRIPT}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}
            >
                <DictionaryProvider dictionary={dictionary}>
                    <LocaleProvider locale={validLang}>
                        <DiagramProvider>{children}</DiagramProvider>
                    </LocaleProvider>
                    {/* Inside: toasts such as the quota one read the dictionary */}
                    <AppToaster />
                </DictionaryProvider>
            </body>
            {process.env.NEXT_PUBLIC_GA_ID && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
        </html>
    )
}
