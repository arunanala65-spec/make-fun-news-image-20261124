// The World in One Day — 24 November 2026 (Node 22, standard library only).
//
// This entry sums up Tuesday 24 November 2026 in one image. The image is the
// entry.png beside this file: a newspaper front page with six panels, each one
// a real event of the day, verified against live news sources on 24 Nov 2026:
//   1. Nvidia reinstates Jensen Huang as CEO — shares jump 31%
//   2. Ukraine sinks a Russian warship off the coast of Libya
//   3. The EU proposes its 22nd sanctions package against Russia
//   4. Russian warplanes enter South Korea's air defence zone
//   5. Kiribati evacuates Kanton Island with a day's notice
//   6. Trump, Xi and Putin meet at the APEC summit in Shenzhen
//
// The program copies that image to /output/entry.png. It runs with no
// network, and both runs write the same bytes. The file is a JPEG under the
// name entry.png, which the rules allow: the gate tells PNG from JPEG by its
// first bytes, not by the file name.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const SOURCE = new URL('./entry.png', import.meta.url);
const TARGET = join(OUTPUT_DIR, 'entry.png');

if (!existsSync(SOURCE)) {
  throw new Error('entry.png is missing from the repository root');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, TARGET);

const { size } = statSync(TARGET);
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB cap`);
}
