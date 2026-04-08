/**
 * Maps Kanban-style `--coverageReporters=...` to Vitest 3 `--coverage.reporter=...`.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const vitestEntry = path.join(root, 'node_modules', 'vitest', 'vitest.mjs');

function mapKanbanCoverageArgs(argv) {
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--coverageReporters') {
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        out.push(`--coverage.reporter=${next}`);
        i += 1;
        continue;
      }
      continue;
    }
    if (a.startsWith('--coverageReporters=')) {
      out.push(`--coverage.reporter=${a.slice('--coverageReporters='.length)}`);
      continue;
    }
    out.push(a);
  }
  return out;
}

const passthrough = mapKanbanCoverageArgs(process.argv.slice(2));
if (passthrough.includes('--coverage')) {
  mkdirSync(path.join(root, 'coverage', '.tmp'), { recursive: true });
}
const code = spawnSync(process.execPath, [vitestEntry, 'run', ...passthrough], {
  cwd: root,
  stdio: 'inherit',
});
process.exit(code.status ?? 1);
