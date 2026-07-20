# OpenClaw

Local-first, self-hosted open-source AI Agent framework.

## Architecture

OpenClaw follows a Hub-Spoke five-layer architecture:

1. **Channels Layer** - Multi-platform message adapters (Telegram, Discord, Feishu, WeChat, etc.)
2. **Gateway Layer** - Central control plane for routing, security, and session management
3. **Agent Runtime** - LLM-powered reasoning engine with Lobster Loop (Perceive → Think → Plan → Act → Observe → Reflect)
4. **Tools/Skills Layer** - Executable tools and scenario-based skills
5. **Memory Layer** - Short-term session memory and long-term vector memory

## Quick Start

```bash
pnpm install
pnpm run build
pnpm run dev
```

## Project Structure

```
openclaw/
├── .agents/          # Agent workflows configuration
├── apps/             # Native applications (macOS, iOS, Android)
├── extensions/       # Channel extensions (browser, etc.)
├── packages/         # Internal shared packages
├── skills/           # Built-in skills (SKILL.md definitions)
├── src/              # Core source code
│   ├── agents/       # Agent Runtime (orchestrator, planner, LLM adapters)
│   ├── sessions/     # Session storage and management
│   ├── providers/    # Model providers (OpenAI, Anthropic, DeepSeek, etc.)
│   ├── gateway/      # Gateway control plane
│   ├── routing/      # Message routing logic
│   ├── security/     # Security, whitelist, audit
│   ├── pairing/      # Pairing code mechanism
│   ├── cron/         # Cron scheduler
│   ├── browser/      # Browser automation tool
│   ├── node-host/    # Node registration and communication
│   ├── web/          # Web console & WebChat backend
│   ├── daemon/       # Daemon installation (launchd/systemd)
│   ├── wizard/       # Onboarding wizard
│   ├── plugins/      # Plugin system
│   ├── plugin-sdk/   # Channel plugin SDK
│   ├── logging/      # Logging system
│   ├── media/        # Media processing pipeline
│   ├── tts/          # Text-to-Speech
│   ├── tools/        # Executable tools
│   ├── memory/       # Memory engine
│   ├── core/         # Common types and utilities
│   ├── hooks/        # Lifecycle hooks
│   ├── cli/          # Command-line interface
│   ├── slack/        # Slack adapter
│   ├── telegram/     # Telegram adapter
│   ├── discord/      # Discord adapter
│   ├── whatsapp/     # WhatsApp adapter
│   ├── signal/       # Signal adapter
│   ├── feishu/       # Feishu adapter
│   ├── wechat/       # WeChat adapter
│   ├── line/         # LINE adapter
│   ├── matrix/       # Matrix adapter
│   ├── teams/        # Microsoft Teams adapter
│   ├── entry.ts      # Application main entry
│   ├── runtime.ts    # Runtime initialization
│   └── index.ts      # Exports
├── test/             # Test suite
├── ui/               # Web console frontend
├── vendor/           # Third-party code
├── docker-compose.yml
├── Dockerfile
├── openclaw.mjs      # CLI entry point
└── package.json
```

## Documentation

See [docs/](docs/) for detailed documentation.

## License

MIT
