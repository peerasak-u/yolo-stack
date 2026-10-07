#!/usr/bin/env node
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describeStack, walk } from "./stack.mjs";

export const validName = (name) => /^[a-z][a-z0-9]*$/.test(name ?? "");

// Renames the stack and its mode in place. Only the stack's own skill folders are touched.
export const renameStack = (toStack, toMode = toStack, modeRoot) => {
  const { skillsDir, modeName: fromMode, stackName: fromStack, owned } = describeStack(modeRoot);
  if (!fromStack) throw new Error("this stack has no setup-<stack>-stack skill, so its current name is unknown");

  // Placeholders first, so a new name equal to the other old name is not rewritten twice.
  // A repository URL keeps its name: it points at where the stack came from.
  const rewrite = (text) =>
    text
      .replace(new RegExp(`(?<!github\\.com/[\\w-]+/)\\b${fromStack}-stack\\b`, "g"), "\u0000stack")
      .replace(new RegExp(`\\b${fromMode}-mode\\b`, "g"), "\u0000mode")
      .replaceAll("\u0000stack", `${toStack}-stack`)
      .replaceAll("\u0000mode", `${toMode}-mode`);

  let changed = 0;
  for (const skill of owned) {
    for (const file of walk(join(skillsDir, skill))) {
      if (!/\.(md|json|sh|mjs|tsv)$/.test(file) || file.includes("/licenses/")) continue;
      const before = readFileSync(file, "utf8");
      const after = rewrite(before);
      if (after !== before) {
        writeFileSync(file, after);
        changed++;
      }
    }
  }
  renameSync(join(skillsDir, `setup-${fromStack}-stack`), join(skillsDir, `setup-${toStack}-stack`));
  // The mode folder holds this script, so it moves last.
  renameSync(join(skillsDir, `${fromMode}-mode`), join(skillsDir, `${toMode}-mode`));
  return { fromStack, fromMode, changed, modeRoot: join(skillsDir, `${toMode}-mode`) };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const [toStack, toMode = toStack] = process.argv.slice(2);
  if (!validName(toStack) || !validName(toMode)) {
    console.error("usage: rename-stack.mjs <stack> [mode]   e.g. rename-stack.mjs acct audit");
    console.error("names are lowercase letters and digits. The mode name defaults to the stack name.");
    process.exit(2);
  }
  const { fromStack, fromMode, changed } = renameStack(toStack, toMode);
  console.log(`stack ${fromStack}-stack is now ${toStack}-stack, mode ${fromMode}-mode is now ${toMode}-mode, rewrote ${changed} files`);
}
