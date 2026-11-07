<div align="center">

# GRAVITEX AI Studio

**GRAVITEX AI Studio - AI クラウド構成図・システム設計スタジオ**

[English](../../README.md) | [中文](../cn/README_CN.md) | 日本語

[**公式サイト**](https://gravitexai.com) · [**スタジオを開く**](https://app.gravitexai.com) · [**ドキュメント**](https://gravitexai.com/ja/docs) · [**ギャラリー**](https://gravitexai.com/ja/gallery) · [**MCP サーバー**](https://gravitexai.com/ja/mcp)

</div>

自然言語で AWS/GCP クラウドトポロジー、UML ダイアグラム、システムアーキテクチャを生成・編集・共同設計。すべての AI 変更はインタラクティブなベクターキャンバス上でバージョン管理され、`.drawio`、`.png`、`.svg` 形式でエクスポートできます。

## 主な機能

- **自然言語によるクラウド構成図生成**：AWS、GCP、Azure、Kubernetes の公式アイコンライブラリに対応。
- **画像・RFC ドキュメントからの変換**：スクリーンショット、ホワイトボード、PDF、Markdown 仕様書から編集可能なベクター図を生成。
- **インタラクティブ編集と部分修正**：キャンバス上で直接編集できるほか、特定の図形だけを選択して AI に更新を指示可能。
- **バージョン履歴と差分比較**：変更ごとにスナップショットを保存し、比較やワンクリック復元に対応。
- **IDE・MCP エージェント連携**：`@gravitexai/mcp-server` により Claude Code、Cursor、Codex、VS Code とライブ連携。

## MCP 連携

```bash
claude mcp add --scope user drawio -- npx @gravitexai/mcp-server@latest
```

## エンタープライズサポート

- **公式サイト**：[https://gravitexai.com](https://gravitexai.com)
- **カスタマーサポート**：[support@gravitexai.com](mailto:support@gravitexai.com)
- **ビジネスお問い合わせ**：[contact@gravitexai.com](mailto:contact@gravitexai.com)

---

© 2026 GRAVITEX AI GLOBAL LLC. All rights reserved.
