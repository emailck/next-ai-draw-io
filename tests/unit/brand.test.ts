import { describe, expect, it } from "vitest"
import {
    APP_DOMAIN,
    ARCHITECTURE_TEMPLATES,
    BRAND_ALT_NAME,
    BRAND_BADGE,
    BRAND_DESCRIPTION,
    BRAND_NAME,
    BRAND_QUOTA_NOTICE,
    BRAND_SHORT_NAME,
    BRAND_TITLE,
    COMPANY_COPYRIGHT,
    COMPANY_LEGAL_NAME,
    CONTACT_EMAIL,
    LEGAL_DOCUMENTS,
    PRICING_PLANS,
    PUBLIC_BETA_MESSAGE,
    SITE_DOMAIN,
    SITE_URL,
    SUPPORT_EMAIL,
} from "@/lib/brand"

describe("GRAVITEX AI Studio Commercialization & De-Open-Sourcing Config", () => {
    it("defines commercial brand identity and SEO metadata", () => {
        expect(BRAND_NAME).toBe("GRAVITEX AI Studio")
        expect(BRAND_SHORT_NAME).toBe("GRAVITEX AI")
        expect(BRAND_ALT_NAME).toBe("GRAVITEX AI")
        expect(BRAND_BADGE).toBe("BETA")
        expect(BRAND_TITLE).toBe(
            "GRAVITEX AI Studio - AI Cloud Architecture & Diagram Generator",
        )
        expect(BRAND_DESCRIPTION).toBe(
            "Generate, edit, and collaborate on AWS/GCP cloud topologies, UML diagrams, and system architecture with natural language.",
        )
        expect(SITE_DOMAIN).toBe("gravitexai.com")
        expect(APP_DOMAIN).toBe("app.gravitexai.com")
        expect(SITE_URL).toBe("https://gravitexai.com")
    })

    it("defines commercial SaaS quota notice without open-source API key prompts", () => {
        expect(BRAND_QUOTA_NOTICE).toBe(
            "AI generation credits included in your workspace plan. Free trial quota active.",
        )
        expect(BRAND_QUOTA_NOTICE).not.toMatch(/OpenAI API Key|own Key/i)
    })

    it("defines 3-tier SaaS pricing plans (Starter, Pro, Team) and Public Beta notice", () => {
        expect(PRICING_PLANS).toHaveLength(3)
        const [starter, pro, team] = PRICING_PLANS

        expect(starter.name).toBe("Starter Plan")
        expect(starter.price).toBe("$0")
        expect(starter.features).toContain(
            "10 AI architecture generations / day",
        )

        expect(pro.name).toBe("Pro Plan")
        expect(pro.price).toBe("$15")
        expect(pro.badge).toBe("Most Popular")
        expect(pro.features).toContain(
            "Unlimited AI diagram & topology generations",
        )

        expect(team.name).toBe("Team Plan")
        expect(team.price).toBe("$35")
        expect(team.features).toContain(
            "Multi-user real-time collaborative workspace",
        )

        expect(PUBLIC_BETA_MESSAGE).toBe(
            "Currently in Public Beta: Enjoy Pro tier features for free during our early-access period!",
        )
    })

    it("defines compliant footer copyright, support contact, and legal agreements", () => {
        expect(COMPANY_LEGAL_NAME).toBe("GRAVITEX AI GLOBAL LLC")
        expect(COMPANY_COPYRIGHT).toBe(
            "© 2026 GRAVITEX AI GLOBAL LLC. All rights reserved.",
        )
        expect(SUPPORT_EMAIL).toBe("support@gravitexai.com")
        expect(CONTACT_EMAIL).toBe("contact@gravitexai.com")
        expect(LEGAL_DOCUMENTS.terms.title).toBe("Terms of Service")
        expect(LEGAL_DOCUMENTS.privacy.title).toContain("Privacy Policy")
        expect(LEGAL_DOCUMENTS.aup.title).toBe("Acceptable Use Policy")
        expect(JSON.stringify(LEGAL_DOCUMENTS)).toContain(
            "GRAVITEX AI GLOBAL LLC",
        )
        expect(JSON.stringify(LEGAL_DOCUMENTS)).toContain(
            "support@gravitexai.com",
        )
        expect(JSON.stringify(LEGAL_DOCUMENTS)).toContain(
            "https://gravitexai.com",
        )
        expect(LEGAL_DOCUMENTS.terms.sections.length).toBeGreaterThanOrEqual(5)
        expect(LEGAL_DOCUMENTS.privacy.sections.length).toBeGreaterThanOrEqual(
            5,
        )
        expect(LEGAL_DOCUMENTS.aup.sections.length).toBeGreaterThanOrEqual(4)
        expect(ARCHITECTURE_TEMPLATES.length).toBeGreaterThanOrEqual(4)
    })
})
