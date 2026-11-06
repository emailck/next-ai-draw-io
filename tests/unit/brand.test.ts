import { describe, expect, it } from "vitest"
import {
    ARCHITECTURE_TEMPLATES,
    BRAND_ALT_NAME,
    BRAND_BADGE,
    BRAND_DESCRIPTION,
    BRAND_NAME,
    BRAND_QUOTA_NOTICE,
    BRAND_TITLE,
    COMPANY_COPYRIGHT,
    LEGAL_DOCUMENTS,
    PRICING_PLANS,
    PUBLIC_BETA_MESSAGE,
    SUPPORT_EMAIL,
} from "@/lib/brand"

describe("AICoco Studio Commercialization & De-Open-Sourcing Config", () => {
    it("defines commercial brand identity and SEO metadata", () => {
        expect(BRAND_NAME).toBe("AICoco Studio")
        expect(BRAND_ALT_NAME).toBe("AICoco Architecture")
        expect(BRAND_BADGE).toBe("BETA")
        expect(BRAND_TITLE).toBe(
            "AICoco Studio - AI-Powered Cloud Architecture & Diagram Generator",
        )
        expect(BRAND_DESCRIPTION).toBe(
            "Generate, edit, and collaborate on AWS/GCP cloud topologies, UML diagrams, and system architecture with natural language.",
        )
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
            "10 AI architecture generations / month",
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
        expect(COMPANY_COPYRIGHT).toBe(
            "© 2026 [请在此预留我的 LLC 英文法定全称占位符]. All rights reserved.",
        )
        expect(SUPPORT_EMAIL).toBe("contact@aicoco.xyz")
        expect(LEGAL_DOCUMENTS.terms.title).toBe("Terms of Service")
        expect(LEGAL_DOCUMENTS.privacy.title).toContain("Privacy Policy")
        expect(LEGAL_DOCUMENTS.aup.title).toBe("Acceptable Use Policy")
        expect(LEGAL_DOCUMENTS.terms.sections.length).toBeGreaterThanOrEqual(5)
        expect(LEGAL_DOCUMENTS.privacy.sections.length).toBeGreaterThanOrEqual(
            5,
        )
        expect(LEGAL_DOCUMENTS.aup.sections.length).toBeGreaterThanOrEqual(4)
        expect(ARCHITECTURE_TEMPLATES.length).toBeGreaterThanOrEqual(4)
    })
})
