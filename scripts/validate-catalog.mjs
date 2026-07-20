#!/usr/bin/env node
/**
 * Registry CI gate. Fails the PR when catalog.json and the pack folders drift:
 * every community catalog row must point at a real pack folder (with pack.md),
 * every pack folder must have a catalog row, genres must be from the allowed
 * list and match the folder the pack lives in.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];

const catalog = JSON.parse(readFileSync(join(root, "catalog.json"), "utf8"));
const genres = new Set(catalog.genres);
const rows = catalog.packs ?? [];

const REQUIRED = ["name", "title", "genre", "tags", "blurb", "author"];
const NAME_RE = /^[a-z0-9][a-z0-9-]*$/;

const seen = new Set();
for (const row of rows) {
  const label = row.name ?? JSON.stringify(row).slice(0, 40);
  for (const f of REQUIRED) {
    if (row[f] === undefined || row[f] === "" || (f === "tags" && !Array.isArray(row.tags))) {
      errors.push(`${label}: missing or invalid "${f}"`);
    }
  }
  if (row.name && !NAME_RE.test(row.name)) errors.push(`${label}: name must be lowercase-hyphen`);
  if (seen.has(row.name)) errors.push(`${label}: duplicate name`);
  seen.add(row.name);
  if (!genres.has(row.genre)) errors.push(`${label}: genre "${row.genre}" not in allowed list`);
  if (row.blurb && row.blurb.length > 300) errors.push(`${label}: blurb over 300 chars`);
  if (/[—–]/.test(JSON.stringify(row))) errors.push(`${label}: em/en dash in catalog row`);

  if (row.bundled) {
    if (row.path) errors.push(`${label}: bundled packs must not have a path`);
    continue;
  }
  if (!row.path) {
    errors.push(`${label}: community packs need a path`);
    continue;
  }
  if (row.path !== `${row.genre}/${row.name}`) {
    errors.push(`${label}: path "${row.path}" must be "{genre}/{name}" ("${row.genre}/${row.name}")`);
  }
  if (!existsSync(join(root, row.path, "pack.md"))) {
    errors.push(`${label}: no pack.md at ${row.path}/`);
  }
}

// Reverse direction: every pack folder on disk has a catalog row.
const listed = new Set(rows.filter((r) => r.path).map((r) => r.path));
for (const genre of genres) {
  const dir = join(root, genre);
  if (!existsSync(dir)) continue;
  for (const entry of readdirSync(dir)) {
    const packDir = join(dir, entry);
    if (!statSync(packDir).isDirectory()) continue;
    if (existsSync(join(packDir, "pack.md")) && !listed.has(`${genre}/${entry}`)) {
      errors.push(`${genre}/${entry}: pack folder has no catalog.json row`);
    }
  }
}

if (errors.length) {
  console.error(`catalog validation FAILED (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`catalog OK: ${rows.length} packs (${rows.filter((r) => r.bundled).length} bundled, ${rows.filter((r) => r.path).length} community)`);
