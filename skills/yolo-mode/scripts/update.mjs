#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { renameStack } from "./rename-stack.mjs";
import { describeStack, walk } from "./stack.mjs";

const args = process.argv.slice(2);
const source = args.includes("--source") ? resolve(args[args.indexOf("--source") + 1]) : null;
const apply = args.includes("--apply");
const finish = args.includes("--finish");
if (!source || !existsSync(join(source, "skills"))) {
  console.error("usage: update.mjs --source <clone of the upstream repository> [--apply | --finish]");
  console.error("Without a flag it prints what would change and writes nothing. --apply writes every change that");
  console.error("does not conflict. --finish records the new starting point once the conflicts are resolved by hand.");
  process.exit(2);
}

const ours = describeStack();
const upstreamFile = join(ours.modeRoot, "UPSTREAM");
const recorded = existsSync(upstreamFile) ? readFileSync(upstreamFile, "utf8") : "";
const baseCommit = recorded.match(/^commit: ([0-9a-f]{7,40})$/m)?.[1];
const sourceUrl = recorded.match(/^source: (.+)$/m)?.[1] ?? "unknown";
const git = (...argv) => execFileSync("git", ["-C", source, ...argv], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
const latestCommit = git("rev-parse", "HEAD");
const recordLatest = () =>
  writeFileSync(upstreamFile, `source: ${sourceUrl}\ncommit: ${latestCommit}\nupdated: ${new Date().toISOString().slice(0, 10)}\n`);
if (finish) {
  recordLatest();
  console.log(`recorded ${latestCommit.slice(0, 7)} as the new starting point`);
  process.exit(0);
}

// Stage a copy of an upstream skills tree under this stack's own names, so files line up by path.
const work = mkdtempSync(join(tmpdir(), "stack-update-"));
const stage = (label, fill) => {
  const dir = join(work, label, "skills");
  mkdirSync(dir, { recursive: true });
  try {
    fill(dir);
  } catch {
    return null;
  }
  const mode = readdirSync(dir).find((d) => existsSync(join(dir, d, "scripts", "stack.mjs")));
  if (!mode) return null;
  const staged = describeStack(join(dir, mode));
  if (staged.stackName !== ours.stackName || staged.modeName !== ours.modeName) {
    renameStack(ours.stackName, ours.modeName, join(dir, mode));
  }
  return dir;
};
const latest = stage("upstream", (dir) => cpSync(join(source, "skills"), dir, { recursive: true }));
const base =
  baseCommit &&
  stage("base", (dir) => {
    const tar = execFileSync("git", ["-C", source, "archive", baseCommit, "skills"], { maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] });
    execFileSync("tar", ["-x", "-C", dirname(dir)], { input: tar });
  });
if (!latest) {
  console.error(`${source} does not hold a stack`);
  process.exit(1);
}

const filesOf = (dir) => (dir ? walk(dir).map((file) => relative(dir, file)) : []);
const read = (dir, rel) => (dir && existsSync(join(dir, rel)) ? readFileSync(join(dir, rel)) : null);
const same = (a, b) => (a === null || b === null ? a === b : a.equals(b));
const isText = (buf) => buf !== null && !buf.includes(0);

// Only paths that upstream has or had are considered. A file only the human has is never touched.
const paths = [...new Set([...filesOf(base), ...filesOf(latest)])].filter((rel) => rel !== join(ours.modeDir, "UPSTREAM")).sort();
const plan = { updated: [], added: [], removed: [], merged: [], conflict: [] };
const writes = new Map();
const conflictDir = join(work, "conflicts");
const saveConflict = (rel, reason, versions) => {
  plan.conflict.push(`${rel}  (${reason})`);
  for (const [suffix, content] of Object.entries(versions)) {
    if (content === null) continue;
    mkdirSync(dirname(join(conflictDir, rel)), { recursive: true });
    writeFileSync(join(conflictDir, `${rel}.${suffix}`), content);
  }
};

for (const rel of paths) {
  const b = read(base, rel);
  const l = read(latest, rel);
  const o = read(ours.skillsDir, rel);
  if (same(o, l)) continue;
  if (!base) {
    if (o === null) {
      plan.added.push(rel);
      writes.set(rel, l);
    } else saveConflict(rel, "no recorded starting point, so the two versions cannot be told apart", { upstream: l });
    continue;
  }
  if (same(b, l)) continue;
  if (same(o, b)) {
    (l === null ? plan.removed : o === null ? plan.added : plan.updated).push(rel);
    writes.set(rel, l);
    continue;
  }
  if (isText(b) && isText(l) && isText(o)) {
    const merge = spawnSync("git", ["merge-file", "-p", "--diff3", "-L", "yours", "-L", "before", "-L", "upstream", join(ours.skillsDir, rel), join(base, rel), join(latest, rel)]);
    if (merge.status === 0) {
      plan.merged.push(rel);
      writes.set(rel, merge.stdout);
    } else saveConflict(rel, "you and upstream changed the same lines", { before: b, upstream: l, merged: merge.stdout });
    continue;
  }
  const reason = o === null ? "upstream changed a file you removed" : l === null ? "upstream removed a file you changed" : "upstream added a file you already have";
  saveConflict(rel, reason, { before: b, upstream: l });
}

const total = Object.values(plan).reduce((n, list) => n + list.length, 0);
console.log(`${ours.stackName}-stack with ${ours.modeDir}: installed from ${baseCommit?.slice(0, 7) ?? "an unknown commit"}, upstream is at ${latestCommit.slice(0, 7)}`);
for (const [kind, list] of Object.entries(plan)) {
  if (list.length) console.log(`\n${kind} (${list.length})\n${list.map((rel) => `  ${rel}`).join("\n")}`);
}
if (!total) console.log("\nnothing to update");

if (apply && total) {
  const backup = join(dirname(ours.skillsDir), `stack-backup-${new Date().toISOString().replace(/[-:]/g, "").slice(0, 13)}`);
  for (const skill of ours.owned) cpSync(join(ours.skillsDir, skill), join(backup, skill), { recursive: true });
  for (const [rel, content] of writes) {
    const file = join(ours.skillsDir, rel);
    if (content === null) {
      rmSync(file);
      if (!readdirSync(dirname(file)).length) rmSync(dirname(file), { recursive: true });
      continue;
    }
    mkdirSync(dirname(file), { recursive: true });
    // A file taken whole from upstream keeps its mode bits. A merged file keeps the ones it has.
    if (plan.merged.includes(rel)) writeFileSync(file, content);
    else copyFileSync(join(latest, rel), file);
  }
  // With conflicts open, the starting point stays put, so a second run still sees them.
  if (!plan.conflict.length) recordLatest();
  console.log(`\napplied. backup of the stack as it was: ${backup}`);
} else if (total) {
  console.log("\nnothing was written. Run again with --apply to make these changes.");
}
if (plan.conflict.length) {
  console.log(`\nconflicts are not applied. For each one, your file is unchanged, and the other versions are in:\n  ${conflictDir}`);
  console.log("  <path>.before is what you installed, <path>.upstream is the new one, <path>.merged has both with markers.");
  if (apply) console.log("After resolving every conflict in your own files, run again with --finish.");
}
