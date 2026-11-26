import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The one sentence a house cat says in the five seconds after sweeping
// a glass off the table: a quality-control audit, no apology, no confession.
const ENTRY =
  "I ran the nightly stability audit and that glass failed every test, so I'm filing a product recall: the glass was defective, my inspection was flawless.";

// Competition limits for the entry text.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Default output location when no path argument is given.
const DEFAULT_OUT = "/output/entry.txt";

/** Count characters the way the competition counts them (code points). */
function charCount(text: string): number {
  return [...text].length;
}

/** Fail fast if the entry breaks the competition's length rules. */
function validateEntry(text: string): void {
  const chars = charCount(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
}

/** Resolve the output path from argv, falling back to the default. */
function resolveOutputPath(): string {
  return process.argv[2] ?? DEFAULT_OUT;
}

validateEntry(ENTRY);
const out = resolveOutputPath();

// Write the entry exactly as-is: no trailing newline, no extra text,
// so the output file is byte-identical on every run.
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
