import { BRAND_DESCRIPTION, BRAND_QUOTA_NOTICE, BRAND_TITLE } from "@/lib/brand"
import type { Locale } from "@/lib/i18n/config"

export type LandingTexts = {
    title: string
    description: string
    keywords: string[]
    h1: string
    lede: string
    primary: string
    /** In place of `primary` on a phone, where the editor does not fit */
    phonePrimary: string
    secondary: string
    waysHeading: string
    ways: {
        browser: { title: string; text: string; action: string }
        desktop: { title: string; text: string; action: string }
        agent: { title: string; text: string; action: string }
    }
    examplesHeading: string
    examplesIntro: string
    /** The link to the gallery page */
    examplesMore: string
    /** With its colon, which differs between Latin and CJK text */
    promptLabel: string
    /** Before the name of the model that drew an example */
    modelLabel: string
    moreHeading: string
    more: { title: string; text: string }[]
    providersHeading: string
    providersText: string
    ctaHeading: string
}

export const TEXTS: Record<Locale, LandingTexts> = {
    en: {
        title: BRAND_TITLE,
        description: BRAND_DESCRIPTION,
        keywords: [
            "AICoco Studio",
            "AICoco Architecture",
            "AI cloud architecture generator",
            "AWS architecture diagram",
            "GCP topology generator",
            "UML diagram tool",
        ],
        h1: "AI-Powered Cloud Architecture & System Topology Studio",
        lede: BRAND_DESCRIPTION,
        primary: "Launch Studio",
        phonePrimary: "Read Documentation",
        secondary: "View Pricing Plans",
        waysHeading: "Built for Modern Software Engineering Teams",
        ways: {
            browser: {
                title: "Cloud Studio Workspace",
                text: `Interactive vector canvas in your browser. ${BRAND_QUOTA_NOTICE}`,
                action: "Open AICoco Studio",
            },
            desktop: {
                title: "Enterprise Blueprint Library",
                text: "Production-ready cloud architecture templates for AWS, GCP, Azure, Kubernetes, and microservices.",
                action: "Browse Templates",
            },
            agent: {
                title: "IDE & Agent MCP Integration",
                text: "Connect Claude Code, Cursor, Codex, and VS Code directly to your live architecture canvas.",
                action: "Explore MCP Integration",
            },
        },
        examplesHeading: "Cloud & System Architecture Examples",
        examplesIntro:
            "Enterprise topologies and technical diagrams generated in AICoco Studio.",
        examplesMore: "Browse all architecture templates",
        promptLabel: "Prompt:",
        modelLabel: "Engine:",
        moreHeading: "Enterprise-Grade Diagramming Capabilities",
        more: [
            {
                title: "Screenshot & RFC Replication",
                text: "Upload an architecture screenshot, whiteboard sketch, or technical PDF to convert it into an editable vector topology.",
            },
            {
                title: "Official Cloud Vendor Icons",
                text: "Built-in shape libraries for AWS, Google Cloud, Azure, Kubernetes, and Cisco ensure compliant infrastructure diagrams.",
            },
            {
                title: "Animated Traffic & Data Flows",
                text: "Visualize active request paths, failover routing, and streaming pipelines with animated vector connectors.",
            },
            {
                title: "Version History & Diffing",
                text: "Every AI iteration is saved as an immutable snapshot. Compare versions side-by-side and restore with one click.",
            },
            {
                title: "High-Res Vector & XML Export",
                text: "Export production-ready .drawio XML, scalable SVG, or high-DPI PNG assets for engineering RFCs and compliance audits.",
            },
            {
                title: "Smart Failover & Layout Analysis",
                text: "Automatically align multi-AZ subnets, security groups, and service meshes with zero connector overlap.",
            },
        ],
        providersHeading: "Multi-Model Enterprise AI Routing",
        providersText:
            "Powered by frontier reasoning models optimized for cloud infrastructure topology, system architecture, and UML specifications.",
        ctaHeading: "Design your next cloud architecture in minutes",
    },
    zh: {
        title: BRAND_TITLE,
        description: BRAND_DESCRIPTION,
        keywords: [
            "AICoco Studio",
            "AICoco Architecture",
            "AI 云架构图生成器",
            "AWS 架构图",
            "GCP 拓扑图",
            "UML 图表生成",
        ],
        h1: "面向软件工程师与架构师的 AI 云架构设计工作台",
        lede: BRAND_DESCRIPTION,
        primary: "启动 AICoco Studio",
        phonePrimary: "查看产品文档",
        secondary: "查看订阅方案",
        waysHeading: "专为现代软件工程团队打造",
        ways: {
            browser: {
                title: "云端矢量架构工作台",
                text: `即开即用的在线矢量画布。${BRAND_QUOTA_NOTICE}`,
                action: "进入工作台",
            },
            desktop: {
                title: "企业级云架构模板库",
                text: "预置 AWS、GCP、Azure、Kubernetes 与微服务高可用拓扑蓝图，一键复用。",
                action: "浏览架构模板",
            },
            agent: {
                title: "IDE 与智能体 MCP 集成",
                text: "支持在 Claude Code、Cursor、Codex 和 VS Code 中直接读取代码库并实时生成架构图。",
                action: "了解 MCP 集成",
            },
        },
        examplesHeading: "云架构与系统拓扑示例",
        examplesIntro:
            "由 AICoco Studio 生成的生产级云原生架构图与系统设计图。",
        examplesMore: "查看全部架构模板",
        promptLabel: "提示词：",
        modelLabel: "模型引擎：",
        moreHeading: "企业级架构绘图能力",
        more: [
            {
                title: "截图与技术文档逆向生成",
                text: "上传已有架构截图、白板草图或 PDF 技术方案，AI 自动重绘为可编辑的矢量架构图。",
            },
            {
                title: "官方云厂商图标库",
                text: "内置 AWS、Google Cloud、Azure、Kubernetes、Cisco 等官方标准图标库。",
            },
            {
                title: "动态数据流与请求路径",
                text: "支持动态流向连接线，直观呈现微服务调用链、主备容灾切换与数据管道流向。",
            },
            {
                title: "版本快照与可视化对比",
                text: "每次 AI 迭代自动生成不可变版本快照，支持并排对比差异并一键回滚。",
            },
            {
                title: "高清矢量与 XML 导出",
                text: "支持导出标准 .drawio XML、无损 SVG 及高分辨率 PNG，无缝嵌入团队技术文档。",
            },
            {
                title: "智能自动布局与容灾分析",
                text: "自动对齐多可用区子网、安全组边界与服务网格节点，消除连线交叉重叠。",
            },
        ],
        providersHeading: "多模型企业级 AI 推理引擎",
        providersText:
            "底层集成主流前沿推理大模型，针对云基础设施拓扑、分布式系统架构与 UML 规范深度优化。",
        ctaHeading: "立即用自然语言构建您的下一张云架构图",
    },
    ja: {
        title: BRAND_TITLE,
        description: BRAND_DESCRIPTION,
        keywords: [
            "AICoco Studio",
            "AICoco Architecture",
            "AI クラウド構成図",
            "AWS アーキテクチャ図",
            "UML ダイアグラム",
        ],
        h1: "ソフトウェアエンジニアとアーキテクトのための AI クラウド設計スタジオ",
        lede: BRAND_DESCRIPTION,
        primary: "スタジオを起動",
        phonePrimary: "ドキュメントを見る",
        secondary: "料金プランを見る",
        waysHeading: "モダンな開発チームのためのワークフロー",
        ways: {
            browser: {
                title: "クラウドワークスペース",
                text: `ブラウザ上で即座にベクター編集。${BRAND_QUOTA_NOTICE}`,
                action: "AICoco Studio を開く",
            },
            desktop: {
                title: "クラウド構成テンプレート",
                text: "AWS、GCP、Azure、Kubernetes、マイクロサービス向けの実践的な構成テンプレート。",
                action: "テンプレートを見る",
            },
            agent: {
                title: "IDE・MCP エージェント連携",
                text: "Claude Code、Cursor、Codex、VS Code からプロジェクト構造を解析して直接描画。",
                action: "MCP 連携の詳細",
            },
        },
        examplesHeading: "クラウドアーキテクチャ生成例",
        examplesIntro:
            "AICoco Studio でプロンプトから生成されたアーキテクチャ図とシステム設計図。",
        examplesMore: "すべてのテンプレートを見る",
        promptLabel: "プロンプト：",
        modelLabel: "モデル：",
        moreHeading: "エンタープライズ対応の作図機能",
        more: [
            {
                title: "画像・RFC ドキュメントからの変換",
                text: "スクリーンショット、ホワイトボード、PDF 仕様書を編集可能なベクター図に変換します。",
            },
            {
                title: "公式クラウドアイコン搭載",
                text: "AWS、Google Cloud、Azure、Kubernetes、Cisco などの公式アイコンライブラリを標準搭載。",
            },
            {
                title: "アニメーションコネクタ",
                text: "データパイプラインやトラフィック経路の向きをアニメーションで可視化できます。",
            },
            {
                title: "バージョン履歴と比較",
                text: "すべての変更履歴をスナップショット保存。画面を並べて差分を確認し、いつでも復元可能です。",
            },
            {
                title: "高解像度ベクター＆XML出力",
                text: ".drawio、SVG、高解像度 PNG 形式でエクスポートし、設計書にそのまま利用できます。",
            },
            {
                title: "スマート自動レイアウト",
                text: "マルチAZ構成やサブネット境界を自動整列し、コネクタの重なりを解消します。",
            },
        ],
        providersHeading: "マルチモデル AI エンジン対応",
        providersText:
            "クラウドインフラ設計や UML モデリングに最適化された最新推論モデルをサポートしています。",
        ctaHeading: "次のクラウドアーキテクチャを数分で設計しましょう",
    },
    "zh-Hant": {
        title: BRAND_TITLE,
        description: BRAND_DESCRIPTION,
        keywords: [
            "AICoco Studio",
            "AICoco Architecture",
            "AI 雲端架構圖產生器",
            "AWS 架構圖",
            "UML 圖表產生",
        ],
        h1: "面向軟體工程師與架構師的 AI 雲端架構設計工作台",
        lede: BRAND_DESCRIPTION,
        primary: "啟動 AICoco Studio",
        phonePrimary: "查看產品文件",
        secondary: "查看訂閱方案",
        waysHeading: "專為現代軟體工程團隊打造",
        ways: {
            browser: {
                title: "雲端向量架構工作台",
                text: `即開即用的線上向量畫布。${BRAND_QUOTA_NOTICE}`,
                action: "進入工作台",
            },
            desktop: {
                title: "企業級雲端架構模板庫",
                text: "預置 AWS、GCP、Azure、Kubernetes 與微服務高可用拓撲藍圖，一鍵套用。",
                action: "瀏覽架構模板",
            },
            agent: {
                title: "IDE 與智慧體 MCP 整合",
                text: "支援在 Claude Code、Cursor、Codex 和 VS Code 中直接讀取程式碼庫並即時產生架構圖。",
                action: "了解 MCP 整合",
            },
        },
        examplesHeading: "雲端架構與系統拓撲範例",
        examplesIntro:
            "由 AICoco Studio 產生的生產級雲原生架構圖與系統設計圖。",
        examplesMore: "查看全部架構模板",
        promptLabel: "提示詞：",
        modelLabel: "模型引擎：",
        moreHeading: "企業級架構繪圖能力",
        more: [
            {
                title: "截圖與技術文件逆向產生",
                text: "上傳既有架構截圖、白板草圖或 PDF 技術方案，AI 自動重繪為可編輯的向量架構圖。",
            },
            {
                title: "官方雲端廠商圖示庫",
                text: "內建 AWS、Google Cloud、Azure、Kubernetes、Cisco 等官方標準圖示庫。",
            },
            {
                title: "動態資料流與請求路徑",
                text: "支援動態流向連接線，直觀呈現微服務呼叫鏈、主備容災切換與資料管線流向。",
            },
            {
                title: "版本快照與視覺化比較",
                text: "每次 AI 迭代自動產生不可變版本快照，支援並排比較差異並一鍵還原。",
            },
            {
                title: "高解析度向量與 XML 匯出",
                text: "支援匯出標準 .drawio XML、無損 SVG 及高解析度 PNG，無縫嵌入團隊技術文件。",
            },
            {
                title: "智慧自動佈局與容災分析",
                text: "自動對齊多可用區子網路、安全群組邊界與服務網格節點，消除連線交叉重疊。",
            },
        ],
        providersHeading: "多模型企業級 AI 推理引擎",
        providersText:
            "底層整合主流前沿推理大模型，針對雲端基礎設施拓撲、分散式系統架構與 UML 規範深度最佳化。",
        ctaHeading: "立即用自然語言建構您的下一張雲端架構圖",
    },
}
