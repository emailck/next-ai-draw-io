import type { Metadata } from "next"
import { BRAND_NAME } from "@/lib/brand"

// The page is a client component, so its metadata lives here. The admin
// panel is not for search results, and the home page's canonical and
// language links do not apply to it.
export const metadata: Metadata = {
    title: `Admin - ${BRAND_NAME}`,
    robots: { index: false, follow: false },
    alternates: null,
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
