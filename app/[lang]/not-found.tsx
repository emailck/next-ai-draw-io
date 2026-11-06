import "@/components/site/site.css"
import type { Metadata } from "next"
import { NotFoundPage } from "@/components/site/not-found-page"
import { BRAND_NAME } from "@/lib/brand"

// A not-found page gets no params, so its title stays in English
export const metadata: Metadata = {
    title: `Page not found | ${BRAND_NAME}`,
}

export default function NotFound() {
    return <NotFoundPage />
}
