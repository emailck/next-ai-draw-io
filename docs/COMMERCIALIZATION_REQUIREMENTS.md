# GRAVITEX AI Studio (GRAVITEX AI) 商业化与去开源化改造需求文档

> **文档版本**：v1.0  
> **最后更新**：2026-11-06  
> **产品品牌**：GRAVITEX AI Studio / GRAVITEX AI  
> **定位**：面向全球软件工程师与系统架构师的商业化 B2B SaaS 云架构与图表生成平台

---

## 一、改造背景与核心目标

将现有的 `next-ai-draw-io` 项目进行全面的**去开源化（De-Open-Sourcing）**与**商业化 SaaS 改造（B2B SaaS Commercialization）**，消除所有开源仓库、个人作者、单机自托管（Self-host）及“自行填写 API Key”痕迹，构建符合海外企业银行开户审查及 Stripe 商户合规要求的全功能 B2B SaaS 商业形态。

---

## 二、四阶段详细需求规范

### 阶段一：清理所有开源与个人作者痕迹（去开源化）

#### 1. 全局清理外链与标识
- 移除所有指向原 GitHub 仓库（`https://github.com/DayuanJiang/next-ai-draw-io`）、Releases、Issues、Sponsor（`https://github.com/sponsors/DayuanJiang`）的链接与 Star 徽章（`githubStars`）。
- 移除原作者个人社交账号、个人域名（`next-ai-drawio.jiang.jp`）及个人邮箱（`me[at]jiang.jp`）。
- 将全站所有 `"Next AI Draw.io"` / `"Powered by next-ai-draw-io"` 品牌名称统一替换为 `"GRAVITEX AI Studio"`（或 `"GRAVITEX AI"`）。
- 移除顶部导航栏（`SiteHeader`）、移动端抽屉菜单（`SiteMenu`）、设置面板（`SettingsDialog` -> `AboutTab`）、配额提示（`QuotaLimitToast`）及文档页中的 `"GitHub"` / `"Star on GitHub"` / `"Edit this page on GitHub"` 按钮。

#### 2. 替换品牌资产
- **网页 Metadata (`title` & `meta description`)**：
  - **Title**: `GRAVITEX AI Studio - AI Cloud Architecture & Diagram Generator`
  - **Description**: `Generate, edit, and collaborate on AWS/GCP cloud topologies, UML diagrams, and system architecture with natural language.`
- **品牌视觉与图标**：
  - 替换浏览器 Favicon（新增现代科技风 SVG 图标 `app/icon.svg` 与 `public/logo.svg`）及全站 `BrandMark` 导航栏 Logo，采用蓝紫渐变立体拓扑/云架构科技风独立品牌 SVG 图标，停用原开源默认图标。
  - 更新 `app/manifest.ts`、`lib/seo.ts` 及 JSON-LD 结构化数据为 `GRAVITEX AI Studio` 商业 SaaS 信息。

#### 3. 消除本地测试与开源提示痕迹
- 全面排查并清理前端提示语与多语言字典（`en.json`、`zh.json`、`ja.json`、`zh-Hant.json`）中类似 `"Please configure your OpenAI API Key"`、`"Use your own API key"`、`"Add your own API key in model settings"`、`"Self-host"` 等开源单机版话术。
- 凡涉及额度提示、默认模型说明或试用说明的位置，统一采用商用 SaaS 话术：
  - 核心标准话术：`"AI generation credits included in your workspace plan. Free trial quota active."`
- 将 `QuotaLimitToast` 改造为商用工作区额度提示，引导用户查看订阅计划（`Upgrade to Pro`），移除 `Self-host` 与 `Sponsor` 按钮。

---

### 阶段二：重构导航栏（Header Navigation）为商业 SaaS 结构

将工作区顶部导航栏（`WorkspaceHeader` / `StartBar`）及站点级顶部导航栏（`SiteHeader`）统一改造为标准商业 SaaS 顶部导航结构：

- **左侧品牌区**：
  - `GRAVITEX AI Studio` 独立品牌 SVG Logo + 产品名称 `GRAVITEX AI Studio`
  - 品牌名称右侧紧跟淡蓝色胶囊小标签：`BETA`（样式：`bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20`）
- **中间/右侧核心菜单项**：
  1. `Templates`：预置云架构与流程图模板（点击弹出预置云架构模板选择弹窗或跳转至架构模板中心）
  2. `Documentation`：快速上手指南（点击弹出快速上手文档模态框或跳转至文档中心）
  3. `Pricing`：商业订阅方案（点击弹出商业定价方案弹窗或平滑滚动至页面定价专区）
  4. `Sign In` / `Upgrade to Pro`：高亮商业化按钮，点击弹出订阅/注册引导模态框

---

### 阶段三：增加/完善商业 Pricing（订阅方案）组件

构建兼具深色/浅色模式的现代 B2B SaaS 定价组件（支持弹窗 `PricingModal` 与内嵌区块 `PricingSection`），供用户、银行合规审核员及支付通道（Stripe）审核员查验清晰透明的商业模式：

#### 1. 三档标准订阅方案
1. **Starter Plan (`$0` / Free Trial)**
   - `10 AI architecture generations / month`
   - `Standard draw.io vector editing canvas`
   - `Local PNG/SVG export`
2. **Pro Plan (`$15` / month - Most Popular)**
   - `Unlimited AI diagram & topology generations`
   - `Official cloud icon packs (AWS, Google Cloud, Azure, Kubernetes)`
   - `High-res vector & XML code export`
   - `Smart Auto-layout & Failover topology analysis`
3. **Team Plan (`$35` / seat / month)**
   - `Everything in Pro`
   - `Multi-user real-time collaborative workspace`
   - `GitHub / Git repo diagram sync`
   - `Priority SLA & Dedicated email support`

#### 2. 订阅确认与公测引导模态框（Public Beta Notice）
- 当用户点击 Pro / Team 的 `"Get Started"` / `"Subscribe"` 按钮，或导航栏的 `"Sign In"` / `"Upgrade to Pro"` 按钮时，弹出美观的订阅确认/账户引导模态框。
- 显著展示公测期权益说明：
  > `"Currently in Public Beta: Enjoy Pro tier features for free during our early-access period!"`
- 提供工作区邮箱输入与一键激活体验交互，严禁出现 404 或死链接。

---

### 阶段四：补全合规页脚（Footer）与法务信息（开户与 Stripe 必备）

在应用主界面底部（Lobby 视图底部）、设置面板底部（`SettingsDialog` -> `AboutTab`）及站点页脚（`SiteFooter`）全面配置标准合规商业页脚：

1. **公司法定版权落款**：
   - `© 2026 GRAVITEX AI GLOBAL LLC. All rights reserved.`
   - 在集中式品牌配置文件 `lib/brand.ts` 中定义常量 `COMPANY_LEGAL_NAME = "GRAVITEX AI GLOBAL LLC"`，方便后续一键修改。
2. **商业联系方式**：
   - `Support: support@gravitexai.com`（支持可点击 `mailto:support@gravitexai.com`）
3. **完备法务条款（支持 Modal 弹窗与独立路由双模式，严禁 `#` 空链接）**：
   - `Terms of Service`（标准 B2B SaaS 服务条款英文全文：涵盖账户责任、订阅计费、知识产权、责任限制等）
   - `Privacy Policy`（标准 GDPR / CCPA 隐私政策英文全文：涵盖数据收集、AI 模型数据处理、Cookie、用户权利等）
   - `Acceptable Use Policy`（标准合规使用政策英文全文：涵盖禁止滥用、系统安全、合规要求等）

---

## 三、技术架构与涉及文件清单

### 1. 新增核心商业化模块
- `lib/brand.ts`：集中管理品牌名称、标语、法定公司主体占位符、支持邮箱、定价方案数据及英文法务协议全文。
- `components/saas/pricing-modal.tsx`：包含三档商业套餐、公测期激活确认弹窗（Public Beta Modal）、Sign In 引导弹窗及预置架构模板弹窗（Templates & Quick Docs Modal）。
- `components/saas/legal-modal.tsx`：包含 `Terms of Service`、`Privacy Policy`、`Acceptable Use Policy` 的完整法务条款阅读弹窗。
- `components/saas/saas-header.tsx`：主工作区与商业页面通用的顶部商业化 SaaS 导航栏组件。
- `components/saas/saas-footer.tsx`：合规版权、客服邮箱与法务条款页脚组件。
- `app/[lang]/legal/[slug]/page.tsx`：法务条款的独立访问路由页面（兼顾爬虫与支付网关独立 URL 审核要求）。
- `app/icon.svg` & `public/logo.svg`：全新设计的 `GRAVITEX AI Studio` 现代科技风矢量品牌图标。

### 2. 改造现有核心文件
- `components/workspace/brand-mark.tsx`：替换为 `GRAVITEX AI Studio` 独立 SVG 品牌图标。
- `components/workspace/workspace.tsx`：集成顶部商业 SaaS 导航栏、底部合规 Footer、Pricing / Legal / Auth 模态框。
- `components/chat/lobby-hero.tsx`：移除开源 MCP 宣传卡片，展示商用免费试用额度徽章（`"AI generation credits included in your workspace plan. Free trial quota active."`）与底部合规页脚。
- `components/settings-dialog.tsx`：清理 GitHub 外链，更新 `AboutTab` 为 `GRAVITEX AI Studio` 商业版本说明、订阅状态及合规法务入口。
- `components/quota-limit-toast.tsx`：清理 GitHub / Sponsor 按钮，替换为商用配额提示与 `Upgrade to Pro` 按钮。
- `components/site/site-header.tsx` & `components/site/site-footer.tsx` & `components/site/site-texts.ts`：重构站点导航栏与页脚，全面去开源化并接入 Pricing 与法务链接。
- `app/[lang]/layout.tsx`、`app/[lang]/page.tsx`、`app/[lang]/about/page.tsx`、`app/[lang]/about/texts.ts`、`app/manifest.ts`、`lib/seo.ts`：替换全站 SEO Metadata、JSON-LD 及品牌文案，并在 `/about` 页面嵌入完整 Pricing 订阅模块。
- `lib/i18n/dictionaries/{en,zh,ja,zh-Hant}.json` & `app/api/chat/route.ts`：全面清理“填入个人 API Key”等单机开源提示，替换为商业 SaaS 工作区额度话术。
