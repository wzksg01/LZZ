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
src/
├── core/          # Common types, schemas, utilities
├── gateway/       # Gateway control plane (WebSocket/HTTP, routing, security)
├── channels/      # Channel adapters (Telegram, Discord, Feishu, etc.)
├── agents/        # Agent runtime (orchestrator, planner, LLM adapters)
├── tools/         # Executable tools (browser, fs, exec, http, etc.)
├── skills/        # Scenario-based skills (SKILL.md definitions)
├── memory/        # Memory engine (session, vector, persist)
├── hooks/         # Lifecycle hooks
└── cli/           # Command-line interface
```

## Documentation

See [docs/](docs/) for detailed documentation.

## License

MIT
