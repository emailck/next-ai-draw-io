<div align="center">

# GRAVITEX AI Studio

**GRAVITEX AI Studio - AI Cloud Architecture & Diagram Generator**

[**Official Website**](https://gravitexai.com) · [**Launch Studio**](https://app.gravitexai.com) · [**Documentation**](https://gravitexai.com/en/docs) · [**Template Gallery**](https://gravitexai.com/en/gallery) · [**MCP Server**](https://gravitexai.com/en/mcp)

</div>

Generate, edit, and collaborate on AWS/GCP cloud topologies, UML diagrams, and system architecture with natural language. Every AI iteration creates a restorable version snapshot on an interactive draw.io vector canvas, with production-ready exports in `.drawio`, `.png`, and `.svg`.

## Core Capabilities

- **Natural Language Cloud Topology Generation**: Describe AWS, GCP, Azure, or Kubernetes infrastructure in plain text with official cloud vendor icon libraries.
- **Screenshot & RFC Document Replication**: Upload architecture screenshots, whiteboard sketches, PDFs, or Markdown specifications to convert them into editable vector diagrams.
- **Interactive Vector Canvas & Smart Selection**: Edit any node or connector directly on the vector canvas, or select specific shapes for targeted AI updates.
- **Version History & Diffing**: Compare versions side-by-side and restore any snapshot in one click.
- **IDE & Agent MCP Integration**: Connect Claude Code, Cursor, Codex, and VS Code directly to your live architecture canvas via `@gravitexai/mcp-server`.

## MCP Server Integration

```bash
claude mcp add --scope user drawio -- npx @gravitexai/mcp-server@latest
```

Or add to your MCP client configuration:

```json
{
  "mcpServers": {
    "drawio": {
      "command": "npx",
      "args": ["@gravitexai/mcp-server@latest"]
    }
  }
}
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:6002](http://localhost:6002).

## Enterprise & Support

- **Website**: [https://gravitexai.com](https://gravitexai.com)
- **Customer Support**: [support@gravitexai.com](mailto:support@gravitexai.com)
- **Business Inquiries**: [contact@gravitexai.com](mailto:contact@gravitexai.com)

---

© 2026 GRAVITEX AI GLOBAL LLC. All rights reserved.
