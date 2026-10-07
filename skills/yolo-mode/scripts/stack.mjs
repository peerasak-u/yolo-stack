import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The stack is a set of skill folders that sit side by side. This mode skill holds its scripts.
export const describeStack = (modeRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")) => {
  const skillsDir = dirname(modeRoot);
  const modeDir = basename(modeRoot);
  const present = readdirSync(skillsDir).filter((d) => existsSync(join(skillsDir, d, "SKILL.md")));
  // In the source repository every skill belongs to the stack. Once installed, the folder may
  // hold other people's skills, so the stack owns the mode, what the mode names, and principles.
  const isSource = existsSync(join(skillsDir, "..", "INSTALL.md"));
  const modeText = readFileSync(join(modeRoot, "SKILL.md"), "utf8");
  const owned = present.filter(
    (d) => isSource || d === modeDir || d.startsWith("principle-") || modeText.includes(`**${d}**`),
  );
  const setup = owned.find((d) => /^setup-.+-stack$/.test(d));
  return {
    modeRoot,
    skillsDir,
    modeDir,
    modeName: modeDir.replace(/-mode$/, ""),
    stackName: setup ? setup.replace(/^setup-(.+)-stack$/, "$1") : null,
    owned,
    isSource,
  };
};

export const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
