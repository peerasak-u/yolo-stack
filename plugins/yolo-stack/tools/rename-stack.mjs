#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [from, to] = process.argv.slice(2);
if (!/^[a-z][a-z0-9]*$/.test(from ?? "") || !/^[a-z][a-z0-9]*$/.test(to ?? "")) {
  console.error("usage: rename-stack.mjs <from> <to>   e.g. rename-stack.mjs yolo acme");
  process.exit(2);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modeDir = join(root, "skills", `${from}-mode`);
if (!existsSync(modeDir)) {
  console.error(`skills/${from}-mode does not exist`);
  process.exit(1);
}
renameSync(modeDir, join(root, "skills", `${to}-mode`));
renameSync(join(root, "skills", `setup-${from}-stack`), join(root, "skills", `setup-${to}-stack`));

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const pattern = new RegExp(`\\b${from}-(mode|stack)\\b`, "g");
let changed = 0;
for (const file of walk(root)) {
  if (!/\.(md|json|sh|mjs|tsv)$/.test(file) || file.includes("/licenses/")) continue;
  const before = readFileSync(file, "utf8");
  const after = before.replace(pattern, `${to}-$1`);
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
  }
}
// When the plugin sits inside a marketplace repo, rename its entries and folder there too.
const repo = resolve(root, "..", "..");
const manifests = [".claude-plugin/marketplace.json", ".agents/plugins/marketplace.json", "README.md"]
  .map((file) => join(repo, file))
  .filter((file) => existsSync(file));
if (existsSync(join(repo, ".claude-plugin", "marketplace.json")) && root === join(repo, "plugins", `${from}-stack`)) {
  for (const file of manifests) {
    writeFileSync(file, readFileSync(file, "utf8").replace(pattern, `${to}-$1`));
    changed++;
  }
  renameSync(root, join(repo, "plugins", `${to}-stack`));
}
console.log(`renamed ${from}-mode to ${to}-mode, rewrote ${changed} files`);
