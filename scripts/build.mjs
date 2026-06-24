import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateAgentPluginAssets } from '../../agent-plugin-core/scripts/generate-plugin-assets.mjs';

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url));
const projectRoot = join(repoRoot, 'libs/integrations/claude-leadtime-plugin');
const outputRoot = join(
  repoRoot,
  'dist/libs/integrations/claude-leadtime-plugin',
);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const entry of [
  '.claude-plugin',
  'plugins',
  'scripts',
  'README.md',
  'LICENSE',
]) {
  await cp(join(projectRoot, entry), join(outputRoot, entry), {
    recursive: true,
    force: true,
  });
}

await generateAgentPluginAssets({
  agent: 'claude',
  outputRoot,
  skillsPath: 'plugins/leadtime/skills',
  commandsPath: 'plugins/leadtime/commands',
});

await writeFile(
  join(outputRoot, '.generated-from'),
  [
    'Generated from Leadtime monorepo.',
    `Source project: libs/integrations/claude-leadtime-plugin`,
    `Generated at: ${new Date().toISOString()}`,
    '',
  ].join('\n'),
);

console.log(`Built Claude plugin marketplace at ${outputRoot}`);
