#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { renameStack, validName } from "./rename-stack.mjs";
import { describeStack } from "./stack.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, i, all) => (arg.startsWith("--") ? [...pairs, [arg.slice(2), all[i + 1]]] : pairs), []),
);
const { runtime, scope = "project", stack = "yolo", mode = stack } = args;
const project = resolve(args.project ?? process.cwd());
if (!["claude", "codex"].includes(runtime) || !["project", "user"].includes(scope) || !validName(stack) || !validName(mode)) {
  console.error("usage: install.mjs --runtime claude|codex [--scope project|user] [--project <dir>] [--stack <name>] [--mode <name>]");
  console.error("names are lowercase letters and digits. --scope defaults to project, --project to the current folder.");
  process.exit(2);
}

const base = scope === "project" ? project : homedir();
const skillsDirFor = (rt) => join(base, rt === "claude" ? ".claude" : ".agents", "skills");
const target = skillsDirFor(runtime);
const sibling = skillsDirFor(runtime === "claude" ? "codex" : "claude");
const modeDir = `${mode}-mode`;

const source = describeStack();
const installedName = (skill) =>
  skill === source.modeDir ? modeDir : skill === `setup-${source.stackName}-stack` ? `setup-${stack}-stack` : skill;
const names = source.owned.map(installedName);

// The other runtime in the same scope may already hold this stack. Link to it, so there is one copy.
const siblingHasStack = existsSync(join(sibling, modeDir, "scripts", "stack.mjs"));
const taken = names.filter((name) => existsSync(join(target, name)));
if (taken.length) {
  console.error(`${target} already has: ${taken.join(", ")}`);
  console.error("Nothing was written. Remove or rename those skills, or install into another folder.");
  process.exit(1);
}

mkdirSync(target, { recursive: true });
if (siblingHasStack) {
  for (const name of describeStack(join(sibling, modeDir)).owned) {
    symlinkSync(relative(target, join(sibling, name)), join(target, name));
  }
  console.log(`linked ${target} to the stack already in ${sibling}`);
} else {
  const stage = mkdtempSync(join(tmpdir(), "stack-install-"));
  for (const skill of source.owned) cpSync(join(source.skillsDir, skill), join(stage, skill), { recursive: true });
  if (stack !== source.stackName || mode !== source.modeName) renameStack(stack, mode, join(stage, source.modeDir));
  for (const name of names) cpSync(join(stage, name), join(target, name), { recursive: true });
  rmSync(stage, { recursive: true });

  let commit = "unknown";
  try {
    commit = execFileSync("git", ["-C", source.skillsDir, "rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {}
  writeFileSync(
    join(target, modeDir, "UPSTREAM"),
    `source: https://github.com/peerasak-u/yolo-stack\ncommit: ${commit}\ninstalled: ${new Date().toISOString().slice(0, 10)}\n`,
  );
  console.log(`copied ${names.length} skills to ${target}`);
}

// The session hook runs the script inside the installed mode skill.
const script = `${modeDir}/scripts/session-start.sh`;
const hookFile =
  runtime === "claude" ? join(base, ".claude", "settings.json") : join(base, ".codex", "hooks.json");
const command =
  runtime === "claude"
    ? `"${scope === "project" ? "$CLAUDE_PROJECT_DIR" : "$HOME"}/.claude/skills/${script}" claude`
    : `"${join(target, script)}" codex`;
const settings = existsSync(hookFile) ? JSON.parse(readFileSync(hookFile, "utf8")) : {};
settings.hooks ??= {};
settings.hooks.SessionStart ??= [];
const present = settings.hooks.SessionStart.some((entry) => entry.hooks?.some((hook) => hook.command?.includes(script)));
if (!present) {
  settings.hooks.SessionStart.push({ matcher: "startup|resume|clear|compact", hooks: [{ type: "command", command }] });
  mkdirSync(dirname(hookFile), { recursive: true });
  writeFileSync(hookFile, `${JSON.stringify(settings, null, 2)}\n`);
}
console.log(`${present ? "session hook already in" : "added session hook to"} ${hookFile}`);

execFileSync("node", [join(target, modeDir, "scripts", "check-refs.mjs")], { stdio: "inherit" });
console.log(`installed ${stack}-stack with ${modeDir} for ${runtime} (${scope})`);
