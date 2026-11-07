# 概要

GRAVITEX AI Studio（GRAVITEX AI）は、ソフトウェアエンジニアやクラウドアーキテクト向けの AI クラウド構成図・システム設計プラットフォームです。自然言語でクラウドトポロジーやシステム構成を記述するだけで、編集可能なベクター図をリアルタイムに生成し、すべての変更履歴をバージョン管理します。

<!-- demo: tour -->

## 3 つの利用ワークフロー

| 利用環境 | 主な機能 | クイックスタート |
|---|---|---|
| クラウドスタジオ | ブラウザ上で即座に使えるベクターキャンバス。AI generation credits included in your workspace plan. Free trial quota active. | [GRAVITEX AI Studio を開く](/ja) |
| アーキテクチャテンプレート | AWS、GCP、Azure、Kubernetes、UML の実践的な構成テンプレート | [テンプレートを見る](/ja/gallery) |
| IDE・MCP エージェント連携 | Claude Code、Cursor、Codex、VS Code からプロジェクト構造を解析して直接描画 | [Claude Code から使う](./claude-code.md) |

## できること

- **生成**：自然言語での指示、またはスクリーンショット、ホワイトボードの写真、PDF、Web ページから構成図を生成。
- **手動編集**：AWS、GCP、Azure、Kubernetes の公式アイコンライブラリを備えたベクターキャンバスで自由に編集。
- **AI による部分修正**：特定の図形やサブネットを選択してその部分だけの変更を指示でき、手動の編集内容も維持されます。
- **バージョン履歴と比較**：AI の変更ごとにスナップショットを保存。差分比較やワンクリック復元が可能です。
- **エクスポート**：`.drawio` XML、高解像度 PNG、ベクター SVG 形式でエクスポートできます。

## ワークスペースプランと AI クレジット

AI generation credits included in your workspace plan. Free trial quota active. Starter、Pro、Team の各プランは[料金プラン](/ja/about#pricing)ページでご確認いただけます。また、[AI プロバイダー](./ai-providers.md)から社内専用モデルゲートウェイを設定することも可能です。

## 次のステップ

- Web アプリでの[描画と編集](./editor.md)
- [バージョンと取り消し](./versions.md)
- [Claude Code](./claude-code.md) や[ほかの MCP クライアント](./mcp-clients.md)から使う
- [AWS 構成図](./aws-architecture.md)と[フローチャートとシーケンス図](./flowcharts.md)
- [Docker で実行する](./docker.md)
- [FAQ](./FAQ.md)
