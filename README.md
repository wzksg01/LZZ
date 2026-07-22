# Librabot

Local-first, self-hosted open-source AI Agent framework.

## Architecture

Librabot follows a Hub-Spoke five-layer architecture:

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
librabot/
├── .agents/              # Agent workflows configuration
│   ├── index.ts
│   └── workflows/        # Workflow definitions
│       └── default.ts
├── .dockerignore
├── .env.example          # Environment variables template
├── .gitignore
├── .npmrc
├── apps/                 # Native applications (macOS, iOS, Android)
│   └── .gitkeep
├── bin/                  # CLI executable
│   └── librabot.js
├── CHANGELOG.md
├── config/               # Configuration files
│   ├── default.ts        # Default configuration
│   ├── index.ts
│   ├── loader.ts         # Config loader
│   ├── local/            # Local overrides
│   │   └── .gitkeep
│   └── schema.ts         # Config schema
├── CONTRIBUTING.md
├── deploy/               # Deployment configurations
│   ├── docker/           # Docker compose files
│   │   ├── docker-compose.dev.yml
│   │   └── Dockerfile.dev
│   └── kubernetes/       # Kubernetes manifests
│       ├── configmap.yaml
│       ├── deployment.yaml
│       └── service.yaml
├── docker-compose.yml    # Production docker compose
├── Dockerfile            # Production Dockerfile
├── docs/                 # Documentation
│   ├── api/              # API documentation
│   │   ├── agents.md
│   │   ├── channels.md
│   │   ├── gateway.md
│   │   ├── skills.md
│   │   └── tools.md
│   └── guide/            # User guides
│       ├── channels.md
│       ├── configuration.md
│       ├── getting-started.md
│       ├── memory.md
│       └── security.md
├── extensions/           # Channel extensions
│   └── browser/          # Browser extension
│       ├── index.ts
│       └── librabot.plugin.json
├── git-hooks/            # Git hooks
│   └── .gitkeep
├── librabot.mjs          # CLI entry point
├── LICENSE
├── package.json
├── packages/             # Internal shared packages
│   └── .gitkeep
├── patches/              # pnpm patches
│   └── .gitkeep
├── pnpm-workspace.yaml
├── README.md
├── scripts/              # Helper scripts
│   ├── build.ts
│   ├── deploy.ts
│   ├── doctor.ts
│   └── setup.ts
├── SECURITY.md
├── skills/               # Built-in skills (SKILL.md definitions)
│   ├── calendar/         # Calendar skill
│   ├── default/          # Default skill
│   ├── email/            # Email skill
│   ├── github/           # GitHub skill
│   ├── index.ts
│   ├── notion/           # Notion skill
│   └── weather/          # Weather skill
├── src/                  # Core source code
│   ├── agents/           # Agent Runtime
│   │   ├── index.ts
│   │   ├── llm/          # LLM adapters (OpenAI, Anthropic, DeepSeek, Ollama)
│   │   ├── loop/         # Reasoning loops (Lobster Loop, ReAct)
│   │   ├── schema/       # Agent schemas and types
│   │   ├── tools/        # Agent-specific tools
│   │   ├── orchestrator.ts
│   │   ├── planner.ts
│   │   ├── state-machine.ts
│   │   └── types.ts
│   ├── browser/          # Browser automation
│   ├── cli/              # Command-line interface
│   │   ├── commands/     # CLI commands
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── core/             # Common types and utilities
│   │   ├── schema/       # Core schemas
│   │   ├── constants.ts
│   │   ├── errors.ts
│   │   ├── message.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── cron/             # Cron scheduler
│   ├── daemon/           # Daemon installation (launchd/systemd)
│   ├── discord/          # Discord channel adapter
│   ├── entry.ts          # Application main entry
│   ├── feishu/           # Feishu channel adapter
│   ├── gateway/          # Gateway control plane
│   │   ├── audit/        # Audit logging
│   │   ├── router/       # Message router
│   │   ├── scheduler/    # Task scheduler
│   │   ├── security/     # Security layer
│   │   ├── state/        # State management
│   │   ├── websocket/    # WebSocket protocol
│   │   ├── index.ts
│   │   └── server.ts
│   ├── hooks/            # Lifecycle hooks
│   │   ├── builtin/      # Built-in hooks
│   │   ├── index.ts
│   │   ├── manager.ts
│   │   └── types.ts
│   ├── index.ts          # Exports
│   ├── line/             # LINE channel adapter
│   ├── logging/          # Logging system
│   ├── matrix/           # Matrix channel adapter
│   ├── media/            # Media processing pipeline
│   ├── memory/           # Memory engine
│   │   ├── store/        # Storage backends (file, SQLite)
│   │   ├── index.ts
│   │   ├── persist.ts
│   │   ├── session.ts
│   │   ├── types.ts
│   │   └── vector.ts
│   ├── node-host/        # Node registration and communication
│   ├── pairing/          # Pairing code mechanism
│   ├── plugins/          # Plugin system
│   ├── plugin-sdk/       # Channel plugin SDK
│   ├── providers/        # Model providers
│   ├── routing/          # Message routing logic
│   ├── runtime.ts        # Runtime initialization
│   ├── security/         # Security, whitelist, audit
│   ├── sessions/         # Session storage and management
│   ├── signal/           # Signal channel adapter
│   ├── slack/            # Slack channel adapter
│   ├── teams/            # Microsoft Teams channel adapter
│   ├── telegram/         # Telegram channel adapter
│   ├── tools/            # Executable tools
│   │   ├── browser/      # Browser tool
│   │   ├── cron/         # Cron tool
│   │   ├── exec/         # Exec tool
│   │   ├── fs/           # Filesystem tool
│   │   ├── http/         # HTTP tool
│   │   ├── memory-search/# Memory search tool
│   │   ├── session/      # Session tool
│   │   ├── index.ts
│   │   ├── registry.ts
│   │   └── types.ts
│   ├── tts/              # Text-to-Speech
│   ├── web/              # Web console & WebChat backend
│   ├── wechat/           # WeChat channel adapter
│   ├── whatsapp/         # WhatsApp channel adapter
│   └── wizard/           # Onboarding wizard
├── test/                 # Test suite
│   ├── integration/      # Integration tests
│   └── unit/             # Unit tests
│       ├── agents/
│       ├── core/
│       ├── gateway/
│       └── memory/
├── tsconfig.json
├── tsdown.config.ts
├── ui/                   # Web console frontend
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── types/        # Type definitions
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── tsconfig.json
│   └── vite.config.ts
├── vendor/               # Third-party code
│   └── .gitkeep
└── vitest.config.ts
```

## Documentation

See [docs/](docs/) for detailed documentation.

## License

MIT
