import {
    BRAND_DESCRIPTION,
    COMPANY_COPYRIGHT,
    SUPPORT_EMAIL,
} from "@/lib/brand"
import type { Locale } from "@/lib/i18n/config"

export const NPM_URL = "https://gravitexai.com/en/mcp"
export const MCP_INSTALL =
    "claude mcp add --scope user drawio -- npx @gravitexai/mcp-server@latest"

const MCP_SERVER = {
    command: "npx",
    args: ["@gravitexai/mcp-server@latest"],
}
export const MCP_VSCODE_INSTALL_URL = `https://insiders.vscode.dev/redirect?url=${encodeURIComponent(
    `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name: "drawio", ...MCP_SERVER }))}`,
)}`
export const MCP_CURSOR_INSTALL_URL = `https://cursor.com/en/install-mcp?name=drawio&config=${encodeURIComponent(
    btoa(JSON.stringify(MCP_SERVER)),
)}`

// Each language's name in itself, for the language links
export const LANGUAGE_NAMES: Record<Locale, string> = {
    en: "English",
    zh: "简体中文",
    ja: "日本語",
    "zh-Hant": "繁體中文",
}

export type SiteTexts = {
    nav: {
        templates: string
        docs: string
        pricing: string
        mcp: string
        gallery: string
        signIn: string
        upgradePro: string
        openEditor: string
        language: string
        /** The button that opens the links on a phone */
        menu: string
        /** The docs' list of pages on a phone */
        pages: string
    }
    copy: { copy: string; copied: string }
    footer: {
        tagline: string
        product: string
        editor: string
        templates: string
        pricing: string
        mcp: string
        docs: string
        legal: string
        terms: string
        privacy: string
        aup: string
        support: string
        supportText: string
        contact: string
        copyright: string
    }
}

export const SITE_TEXTS: Record<Locale, SiteTexts> = {
    en: {
        nav: {
            templates: "Templates",
            docs: "Documentation",
            pricing: "Pricing",
            mcp: "MCP Server",
            gallery: "Templates",
            signIn: "Sign In",
            upgradePro: "Upgrade to Pro",
            openEditor: "Launch Studio",
            language: "Language",
            menu: "Menu",
            pages: "All pages",
        },
        copy: { copy: "Copy the command", copied: "Copied" },
        footer: {
            tagline: BRAND_DESCRIPTION,
            product: "Platform",
            editor: "GRAVITEX AI Studio",
            templates: "Cloud Architecture Templates",
            pricing: "Subscription Pricing",
            mcp: "Agent MCP Integration",
            docs: "Documentation",
            legal: "Legal & Compliance",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            aup: "Acceptable Use Policy",
            support: "Enterprise & Support",
            supportText:
                "Need custom seat volume, SSO/SAML, or dedicated cloud topology consulting?",
            contact: `Support: ${SUPPORT_EMAIL}`,
            copyright: COMPANY_COPYRIGHT,
        },
    },
    zh: {
        nav: {
            templates: "Templates",
            docs: "Documentation",
            pricing: "Pricing",
            mcp: "MCP Server",
            gallery: "架构模板",
            signIn: "Sign In",
            upgradePro: "Upgrade to Pro",
            openEditor: "进入工作台",
            language: "语言",
            menu: "菜单",
            pages: "全部页面",
        },
        copy: { copy: "复制命令", copied: "已复制" },
        footer: {
            tagline: BRAND_DESCRIPTION,
            product: "产品平台",
            editor: "GRAVITEX AI Studio 工作台",
            templates: "云架构与拓扑模板",
            pricing: "商业订阅方案",
            mcp: "MCP 智能体集成",
            docs: "产品文档",
            legal: "法律与合规",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            aup: "Acceptable Use Policy",
            support: "企业服务与支持",
            supportText:
                "如需企业多席位采购、专属 SLA 支持或云架构咨询服务，请联系我们的商用支持团队。",
            contact: `Support: ${SUPPORT_EMAIL}`,
            copyright: COMPANY_COPYRIGHT,
        },
    },
    ja: {
        nav: {
            templates: "Templates",
            docs: "Documentation",
            pricing: "Pricing",
            mcp: "MCP Server",
            gallery: "テンプレート",
            signIn: "Sign In",
            upgradePro: "Upgrade to Pro",
            openEditor: "スタジオを開く",
            language: "言語",
            menu: "メニュー",
            pages: "すべてのページ",
        },
        copy: { copy: "コマンドをコピー", copied: "コピーしました" },
        footer: {
            tagline: BRAND_DESCRIPTION,
            product: "プラットフォーム",
            editor: "GRAVITEX AI Studio ワークスペース",
            templates: "クラウド構成テンプレート",
            pricing: "料金プラン",
            mcp: "MCP サーバー統合",
            docs: "ドキュメント",
            legal: "法務・コンプライアンス",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            aup: "Acceptable Use Policy",
            support: "エンタープライズサポート",
            supportText:
                "法人契約・専用SLA・請求書払いに関するお問い合わせはサポート窓口までご連絡ください。",
            contact: `Support: ${SUPPORT_EMAIL}`,
            copyright: COMPANY_COPYRIGHT,
        },
    },
    "zh-Hant": {
        nav: {
            templates: "Templates",
            docs: "Documentation",
            pricing: "Pricing",
            mcp: "MCP Server",
            gallery: "架構模板",
            signIn: "Sign In",
            upgradePro: "Upgrade to Pro",
            openEditor: "進入工作台",
            language: "語言",
            menu: "選單",
            pages: "所有頁面",
        },
        copy: { copy: "複製指令", copied: "已複製" },
        footer: {
            tagline: BRAND_DESCRIPTION,
            product: "產品平台",
            editor: "GRAVITEX AI Studio 工作台",
            templates: "雲架構與拓撲模板",
            pricing: "商業訂閱方案",
            mcp: "MCP 智慧體整合",
            docs: "產品文件",
            legal: "法律與合規",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            aup: "Acceptable Use Policy",
            support: "企業服務與支援",
            supportText:
                "如需企業多席位採購、專屬 SLA 支援或雲架構顧問服務，請聯絡商用支援團隊。",
            contact: `Support: ${SUPPORT_EMAIL}`,
            copyright: COMPANY_COPYRIGHT,
        },
    },
}
