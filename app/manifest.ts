import type { MetadataRoute } from "next"
import { getAssetUrl } from "@/lib/base-path"
import { BRAND_DESCRIPTION, BRAND_NAME, BRAND_TITLE } from "@/lib/brand"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: BRAND_TITLE,
        short_name: BRAND_NAME,
        description: BRAND_DESCRIPTION,
        start_url: getAssetUrl("/"),
        display: "standalone",
        background_color: "#f9fafb",
        theme_color: "#1e40af",
        icons: [
            {
                src: getAssetUrl("/logo.svg"),
                sizes: "any",
                type: "image/svg+xml",
                purpose: "any",
            },
            {
                src: getAssetUrl("/favicon-192x192.png"),
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: getAssetUrl("/favicon-512x512.png"),
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    }
}
