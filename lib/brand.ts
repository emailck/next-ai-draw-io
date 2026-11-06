export const BRAND_NAME = "AICoco Studio"
export const BRAND_ALT_NAME = "AICoco Architecture"
export const BRAND_FULL_NAME = "AICoco Studio / AICoco Architecture"
export const BRAND_BADGE = "BETA"

export const BRAND_TITLE =
    "AICoco Studio - AI-Powered Cloud Architecture & Diagram Generator"
export const BRAND_DESCRIPTION =
    "Generate, edit, and collaborate on AWS/GCP cloud topologies, UML diagrams, and system architecture with natural language."

export const BRAND_QUOTA_NOTICE =
    "AI generation credits included in your workspace plan. Free trial quota active."

export const PUBLIC_BETA_MESSAGE =
    "Currently in Public Beta: Enjoy Pro tier features for free during our early-access period!"

export const COMPANY_LEGAL_NAME = "[请在此预留我的 LLC 英文法定全称占位符]"
export const COMPANY_COPYRIGHT = `© 2026 ${COMPANY_LEGAL_NAME}. All rights reserved.`
export const SUPPORT_EMAIL = "contact@aicoco.xyz"

export interface PricingPlan {
    id: "starter" | "pro" | "team"
    name: string
    price: string
    annualPrice: string
    period: string
    badge?: string
    description: string
    popular?: boolean
    ctaText: string
    features: string[]
}

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: "starter",
        name: "Starter Plan",
        price: "$0",
        annualPrice: "$0",
        period: "/ Free Trial",
        description:
            "Essential AI diagramming tools for individual developers exploring cloud architecture design.",
        ctaText: "Current Plan (Active)",
        features: [
            "10 AI architecture generations / month",
            "Standard draw.io vector editing canvas",
            "Local PNG/SVG export",
        ],
    },
    {
        id: "pro",
        name: "Pro Plan",
        price: "$15",
        annualPrice: "$12",
        period: "/ month",
        badge: "Most Popular",
        popular: true,
        description:
            "Full-featured cloud topology & architecture suite for software engineers and solution architects.",
        ctaText: "Subscribe to Pro",
        features: [
            "Unlimited AI diagram & topology generations",
            "Official cloud icon packs (AWS, Google Cloud, Azure, Kubernetes)",
            "High-res vector & XML code export",
            "Smart Auto-layout & Failover topology analysis",
        ],
    },
    {
        id: "team",
        name: "Team Plan",
        price: "$35",
        annualPrice: "$29",
        period: "/ seat / month",
        description:
            "Collaborative architecture workspace with Git synchronization and enterprise SLA for engineering teams.",
        ctaText: "Get Started with Team",
        features: [
            "Everything in Pro",
            "Multi-user real-time collaborative workspace",
            "GitHub / Git repo diagram sync",
            "Priority SLA & Dedicated email support",
        ],
    },
]

export interface ArchitectureTemplate {
    id: string
    category: "AWS" | "GCP" | "Kubernetes" | "Microservices" | "UML & Sequence"
    title: string
    description: string
    prompt: string
}

export const ARCHITECTURE_TEMPLATES: ArchitectureTemplate[] = [
    {
        id: "aws-multi-az",
        category: "AWS",
        title: "AWS Multi-AZ High Availability Web Topology",
        description:
            "Route 53, CloudFront, ALB, ECS Fargate across 2 AZs, Aurora Multi-AZ, and ElastiCache Redis.",
        prompt: "Design a production-grade AWS Multi-AZ high availability architecture diagram using official AWS4 icons: Route 53 -> CloudFront + WAF -> Application Load Balancer -> ECS Fargate services across two Availability Zones in private subnets -> Amazon Aurora PostgreSQL (Primary + Read Replica) and ElastiCache Redis cluster, with NAT Gateways and S3 VPC Endpoint.",
    },
    {
        id: "gcp-data-pipeline",
        category: "GCP",
        title: "GCP Real-Time Event & Analytics Pipeline",
        description:
            "Cloud Pub/Sub, Dataflow, BigQuery, Cloud Storage, Vertex AI, and Looker Studio.",
        prompt: "Create a Google Cloud Platform (GCP) real-time data analytics architecture diagram with official GCP icons: IoT & Web event ingestion via Cloud Load Balancing -> Cloud Pub/Sub -> Cloud Dataflow streaming processing -> BigQuery data warehouse & Cloud Storage data lake -> Vertex AI ML inference and Looker BI dashboards.",
    },
    {
        id: "k8s-istio-mesh",
        category: "Kubernetes",
        title: "Kubernetes Production Service Mesh Topology",
        description:
            "Ingress Gateway, Istio Service Mesh, StatefulSets, HPA, Prometheus & Grafana observability.",
        prompt: "Generate a Kubernetes production cluster topology diagram using Kubernetes icons: External Load Balancer -> Istio Ingress Gateway -> Microservice Pods (Auth, Order, Payment, Inventory) with Envoy sidecars -> Redis & PostgreSQL StatefulSets with PersistentVolumeClaims, monitored by Prometheus, Loki, and Grafana.",
    },
    {
        id: "microservices-saga",
        category: "Microservices",
        title: "Event-Driven Microservices & Saga Pattern",
        description:
            "API Gateway, Kafka Event Bus, Distributed Saga Orchestrator, and CQRS Read/Write stores.",
        prompt: "Draw an event-driven microservices architecture diagram illustrating the Saga pattern and CQRS: API Gateway -> Order Service, Payment Service, Inventory Service, and Notification Service communicating via Apache Kafka topics, with a Saga Orchestrator handling compensating transactions and separate Write DB / Read Replica projections.",
    },
    {
        id: "oauth2-oidc-uml",
        category: "UML & Sequence",
        title: "Zero-Trust OAuth 2.0 / OIDC PKCE Sequence",
        description:
            "Complete authentication & token exchange flow between SPA Client, Identity Provider, and Resource API.",
        prompt: "Create a detailed UML Sequence Diagram for OAuth 2.0 Authorization Code Flow with PKCE: User Browser / SPA Client, Authorization Server (IdP), Token Endpoint, API Gateway, and Protected Microservice, showing code_verifier, code_challenge, JWT validation, and Refresh Token rotation.",
    },
    {
        id: "dr-failover-topology",
        category: "AWS",
        title: "Multi-Region Active-Active Disaster Recovery",
        description:
            "Global Accelerator, DynamoDB Global Tables, Cross-Region Replication, and automated failover.",
        prompt: "Design an AWS Multi-Region Active-Active Disaster Recovery topology diagram across us-east-1 and eu-west-1: AWS Global Accelerator -> Regional ALBs -> EKS Clusters -> Amazon DynamoDB Global Tables and S3 Cross-Region Replication, with Route 53 Health Checks and CloudWatch Alarms.",
    },
]

export type LegalDocKey = "terms" | "privacy" | "aup"

export interface LegalDoc {
    key: LegalDocKey
    title: string
    lastUpdated: string
    summary: string
    sections: {
        heading: string
        paragraphs: string[]
    }[]
}

export const LEGAL_DOCUMENTS: Record<LegalDocKey, LegalDoc> = {
    terms: {
        key: "terms",
        title: "Terms of Service",
        lastUpdated: "November 1, 2026",
        summary:
            "These Terms of Service govern your access to and use of AICoco Studio (AICoco Architecture) cloud diagramming and AI topology generation services.",
        sections: [
            {
                heading: "1. Acceptance of Terms & Scope of Service",
                paragraphs: [
                    `Welcome to ${BRAND_NAME} ("Service", "Platform"), operated by ${COMPANY_LEGAL_NAME} ("Company", "we", "us", or "our"). By accessing or using our web application, APIs, vector diagramming canvas, or AI topology generation services, you agree to be bound by these Terms of Service ("Terms").`,
                    "If you are entering into these Terms on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms.",
                ],
            },
            {
                heading: "2. Workspace Accounts & Subscription Plans",
                paragraphs: [
                    `${BRAND_NAME} offers tiered SaaS subscription plans, including Starter (Free Trial), Pro, and Team plans. AI generation credits are included in your workspace plan according to your selected tier.`,
                    "Paid subscriptions are billed in advance on a monthly or annual basis. Subscription fees are non-refundable except where required by applicable law. You may cancel or downgrade your subscription at any time through your workspace billing settings, effective at the end of the current billing cycle.",
                ],
            },
            {
                heading: "3. Intellectual Property & Customer Data Ownership",
                paragraphs: [
                    'You retain all right, title, and interest in and to all prompts, architectural specifications, uploaded files, and the resulting diagrams, XML topologies, and vector exports you create using the Service ("Customer Content").',
                    `We claim no ownership rights over your Customer Content. ${COMPANY_LEGAL_NAME} retains all right, title, and interest in and to the ${BRAND_NAME} platform, underlying software, UI designs, trademarks, and proprietary algorithms.`,
                ],
            },
            {
                heading: "4. Confidentiality & Security",
                paragraphs: [
                    "We implement industry-standard technical and organizational safeguards (including TLS encryption in transit and isolated workspace storage) to protect the security, confidentiality, and integrity of your architectural diagrams and workspace data.",
                ],
            },
            {
                heading:
                    "5. Disclaimer of Warranties & Limitation of Liability",
                paragraphs: [
                    'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. AI-GENERATED ARCHITECTURAL DIAGRAMS SHOULD BE REVIEWED BY QUALIFIED ENGINEERS PRIOR TO PRODUCTION DEPLOYMENT.',
                    `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${COMPANY_LEGAL_NAME}'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.`,
                ],
            },
            {
                heading: "6. Governing Law & Contact Information",
                paragraphs: [
                    "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Company is registered, without regard to conflict of law principles.",
                    `For billing inquiries, enterprise licensing, or legal notices, please contact us at: ${SUPPORT_EMAIL}.`,
                ],
            },
        ],
    },
    privacy: {
        key: "privacy",
        title: "Privacy Policy (GDPR / CCPA Compliant)",
        lastUpdated: "November 1, 2026",
        summary:
            "This Privacy Policy explains how we collect, process, and safeguard your personal data in compliance with GDPR, CCPA, and global privacy standards.",
        sections: [
            {
                heading: "1. Data Controller & Overview",
                paragraphs: [
                    `${COMPANY_LEGAL_NAME} ("we", "us", "our") respects your privacy and is committed to protecting personal data processed through ${BRAND_NAME}. This Privacy Policy complies with the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA/CPRA).`,
                ],
            },
            {
                heading: "2. Information We Collect",
                paragraphs: [
                    "Account & Workspace Information: When you register, subscribe, or request support, we collect your name, business email address, billing details (processed securely via Stripe), and workspace preferences.",
                    "Diagram & Prompt Data: We process the natural language prompts, uploaded reference files, and diagram XML structures necessary to render and update your diagrams on the canvas. Local diagram sessions are stored in your browser's local storage unless explicitly synced to a Team workspace.",
                    "Technical Telemetry: We collect minimal operational metrics (such as browser type, request latency, and token usage quotas) to ensure service reliability and prevent abuse.",
                ],
            },
            {
                heading: "3. How We Use & Process Data (Zero Model Training)",
                paragraphs: [
                    "We use your data strictly to: (a) provide, maintain, and improve the AI diagram generation service; (b) manage workspace quotas and subscription billing; and (c) provide technical support.",
                    "No AI Training on Customer Diagrams: We do NOT use your proprietary cloud architecture diagrams, prompts, or uploaded documents to train foundation AI models.",
                ],
            },
            {
                heading: "4. Subprocessors & Data Transfers",
                paragraphs: [
                    "We engage trusted enterprise subprocessors solely to deliver the Service, including cloud infrastructure providers, enterprise LLM API gateways, and Stripe for PCI-DSS compliant payment processing. Cross-border data transfers are protected by Standard Contractual Clauses (SCCs).",
                ],
            },
            {
                heading: "5. Your Rights Under GDPR & CCPA",
                paragraphs: [
                    "You have the right to access, rectify, export (data portability), or erase your personal data, as well as the right to restrict or object to certain processing. California residents have the right to know what personal information is collected and the right to non-discrimination. We do not sell or share personal information for cross-context behavioral advertising.",
                    `To exercise your privacy rights or contact our Data Protection Officer, email us at: ${SUPPORT_EMAIL}.`,
                ],
            },
        ],
    },
    aup: {
        key: "aup",
        title: "Acceptable Use Policy",
        lastUpdated: "November 1, 2026",
        summary:
            "Rules and guidelines governing responsible use of AICoco Studio's AI generation and cloud diagramming platform.",
        sections: [
            {
                heading: "1. Purpose",
                paragraphs: [
                    `This Acceptable Use Policy ("AUP") ensures that ${BRAND_NAME} remains a secure, reliable, and compliant environment for software engineers, architects, and enterprise teams worldwide.`,
                ],
            },
            {
                heading: "2. Prohibited Activities",
                paragraphs: [
                    "You agree not to use the Service to: (a) generate, store, or transmit unlawful, infringing, defamatory, or malicious content; (b) design topologies intended for cyberattacks, unauthorized network intrusion, DDoS orchestration, or malware distribution; (c) upload classified government secrets, unencrypted payment card data (PCI), or Protected Health Information (PHI) without an executed Enterprise BAA.",
                ],
            },
            {
                heading: "3. Platform Integrity & Rate Limits",
                paragraphs: [
                    "You may not attempt to bypass workspace quota limits, scrape or reverse-engineer our AI system prompts, perform automated load testing without authorization, or resell workspace credits without an authorized partner agreement.",
                ],
            },
            {
                heading: "4. Enforcement & Reporting",
                paragraphs: [
                    `We reserve the right to suspend or terminate access to workspaces that violate this AUP. To report suspected abuse or security vulnerabilities, please contact: ${SUPPORT_EMAIL}.`,
                ],
            },
        ],
    },
}
