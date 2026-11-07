<div align="center">

# GRAVITEX AI Studio

**GRAVITEX AI Studio - AI 云架构与系统拓扑图生成工作台**

[English](../../README.md) | 中文 | [日本語](../ja/README_JA.md)

[**官方网站**](https://gravitexai.com) · [**进入工作台**](https://app.gravitexai.com) · [**产品文档**](https://gravitexai.com/zh/docs) · [**架构图库**](https://gravitexai.com/zh/gallery) · [**MCP 服务器**](https://gravitexai.com/zh/mcp)

</div>

使用自然语言生成、编辑和协同设计 AWS/GCP 云拓扑图、UML 时序图与系统架构图。每次 AI 迭代都会在交互式 draw.io 矢量画布上生成可回溯的版本快照，支持导出标准 `.drawio`、`.png` 和 `.svg`。

## 核心功能

- **自然语言生成云拓扑图**：支持 AWS、GCP、Azure、Kubernetes 等官方云厂商图标库，一键生成生产级架构图。
- **截图与技术文档逆向生成**：上传架构截图、白板草图、PDF 或 Markdown 技术规范，自动转换为可编辑矢量图。
- **交互式矢量画布与局部精修**：支持在矢量画布上直接拖拽修改，或框选指定节点让 AI 定向更新。
- **版本历史与可视化对比**：每次 AI 修改自动生成不可变快照，支持并排对比与一键回滚。
- **IDE 与智能体 MCP 集成**：通过 `@gravitexai/mcp-server` 将 Claude Code、Cursor、Codex 与 VS Code 直接接入实时画布。

## MCP 集成

```bash
claude mcp add --scope user drawio -- npx @gravitexai/mcp-server@latest
```

## 企业服务与支持

- **官方网站**：[https://gravitexai.com](https://gravitexai.com)
- **客户支持**：[support@gravitexai.com](mailto:support@gravitexai.com)
- **商务联络**：[contact@gravitexai.com](mailto:contact@gravitexai.com)

---

© 2026 GRAVITEX AI GLOBAL LLC. All rights reserved.
