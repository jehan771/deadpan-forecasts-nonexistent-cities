// Deadpan forecast for a city that does not exist.
// Writes exactly one line (150 characters) to /output/entry.txt and verifies it
// by reading it back. The line is a fixed, hand-written forecast: no randomness,
// no network, no input files, so every run produces byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "In Wimpleton, expect 13 degrees and, from four, a 70% chance of rain that only falls on people who forgot an umbrella; the rest stay dry out of spite.";

const OUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 160;

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

// Gate: single line, 1-160 characters, not only whitespace.
if (LINE.length < MIN_CHARS || LINE.length > MAX_CHARS) {
  fail(`line is ${LINE.length} characters, outside ${MIN_CHARS}-${MAX_CHARS}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}
if (LINE.trim().length === 0) {
  fail("line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");

// Read-back verification: the file must contain exactly the gated line.
const back = readFileSync(OUT_PATH, "utf8");
if (back !== LINE) {
  fail("read-back mismatch");
}
if (back.length !== LINE.length) {
  fail(`read-back length ${back.length} != ${LINE.length}`);
}

console.log(`wrote ${OUT_PATH} (${back.length} characters)`);
