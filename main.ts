import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The one sentence a house cat says in the five seconds after sweeping
// a glass off the table: a quality-control audit, no apology, no confession.
const ENTRY =
  "I ran the nightly stability audit and that glass failed every test, so I'm filing a product recall: the glass was defective, my inspection was flawless.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
