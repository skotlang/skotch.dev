// Pre-build script: fetches milestones.yaml from the skotch repo and
// writes it as JSON to src/data/milestones.json so the Astro component
// can import it at build time. This keeps the milestone data out of the
// skotch.dev repo — it's fetched fresh on every build.

import { writeFileSync, mkdirSync } from 'fs';
import { load } from 'js-yaml';

const URL =
  'https://raw.githubusercontent.com/skotlang/skotch/refs/heads/main/milestones.yaml';
const OUT = new globalThis.URL('../src/data/milestones.json', import.meta.url);

async function main() {
  console.log('[milestones] fetching', URL);
  const res = await fetch(URL);
  if (!res.ok) {
    console.error(`[milestones] fetch failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const text = await res.text();
  const data = load(text);

  mkdirSync(new globalThis.URL('../src/data', import.meta.url), { recursive: true });
  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`[milestones] wrote ${OUT.pathname}`);
}

main();
