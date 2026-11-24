// Alien Field Notes: The Two Day Earth Review
// Entry for make.fun bounty u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000
// Writes one original line — an alien tourist's review of planet Earth —
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// Node 22, stdlib only. No network, no randomness, no clock: the output is
// a fixed line, so every run is byte-identical.
//
// After writing, the file is read back and checked against the gate:
// valid UTF-8, exactly one line, 1–200 characters, not whitespace only.
// Any failed check throws and the process exits non-zero.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The locals filled two-thirds of their planet with water they cannot drink, then named the dry parts after the wet ones. 4/5, would float again.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read-back validation (gate: 1–200 UTF-8 chars, exactly one line).
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
if ([...back].length < 1 || [...back].length > 200) {
  throw new Error(`entry length ${[...back].length} chars, outside 1-200`);
}
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
if (back.trim().length === 0) {
  throw new Error("entry must not be whitespace only");
}
