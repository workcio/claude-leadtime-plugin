# Leadtime Claude Plugin

This folder is the source of truth for the public Leadtime Claude plugin marketplace used by Claude Cowork and Claude Code.

The public repository is generated from this project and should not be edited directly.

Common Leadtime skills and Claude slash commands are generated from `libs/integrations/agent-plugin-core` during build. Keep shared behavior there, and put Claude-only packaging or MCP behavior in this package.

The plugin bundles the production Leadtime MCP endpoint:

```text
https://leadtime.app/api/mcp
```

Claude should start the Leadtime OAuth browser flow when the bundled MCP connector is first used. Personal access tokens are not needed for normal task/project work inside Claude.

The bundled `.mcp.json` intentionally sets `"oauth": true` so Claude Cowork treats Leadtime as an OAuth MCP connector during plugin installation.

Personal access tokens are only for users building scripts, automations, or external integrations against the Public API.

## Local validation

From the Leadtime monorepo root:

```bash
npx nx lint claude-leadtime-plugin
npx nx build claude-leadtime-plugin
CLAUDE_PLUGIN_SYNC_DRY_RUN=true npx nx run claude-leadtime-plugin:integration-sync
```

The lint target also runs Anthropic's validator when the Claude CLI is installed:

```bash
claude plugin validate libs/integrations/claude-leadtime-plugin --strict
```

## Public sync

The deploy workflow runs this only when the project is affected:

```bash
npx nx affected --target=integration-sync
```

The sync script publishes the generated artifact to:

```text
https://github.com/workcio/claude-leadtime-plugin
```

Set `AGENT_PLUGIN_SYNC_TOKEN` in CI to a token that can write to all public plugin repositories:

- `workcio/codex-leadtime-plugin`
- `workcio/claude-leadtime-plugin`
- `workcio/cursor-leadtime-plugin`

For backward compatibility, the sync scripts also accept `CODEX_PLUGIN_SYNC_TOKEN`.

## Customer install

Claude Cowork:

1. Open Customize.
2. Click the `+` next to Personal plugins.
3. Choose Create plugin -> Add marketplace.
4. Enter `workcio/claude-leadtime-plugin` or `https://github.com/workcio/claude-leadtime-plugin`.
5. Click Sync.
6. Browse plugins, install Leadtime, and authorize Leadtime when prompted.

Claude Code:

```bash
claude plugin marketplace add workcio/claude-leadtime-plugin
claude plugin install leadtime@leadtime
```
