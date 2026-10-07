#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
const modeDir = readdirSync(skillsDir).find((d) => d.endsWith("-mode"));
const errors = [];
const fail = (file, msg) => errors.push(`${file.startsWith(root) ? relative(root, file) : file}: ${msg}`);

// A personal stack: mode.md plus the playbooks/ and principles/ files it indexes.
const checkPersonal = (dir) => {
  const modeFile = join(dir, "mode.md");
  if (!existsSync(modeFile)) return fail(dir, "no mode.md");
  const text = readFileSync(modeFile, "utf8");
  for (const heading of ["Autonomy", "Real things", "Playbooks", "Principles"]) {
    if (!new RegExp(`^## ${heading}$`, "m").test(text)) fail(modeFile, `no "## ${heading}" section`);
  }
  const placeholder = text.match(/<[^<>\n]+>/);
  if (placeholder) fail(modeFile, `unfilled placeholder ${placeholder[0]}`);
  for (const kind of ["playbooks", "principles"]) {
    const indexed = new Set([...text.matchAll(new RegExp(`\`${kind}/([^\`]+)\``, "g"))].map((m) => m[1]));
    const kindDir = join(dir, kind);
    const present = new Set(existsSync(kindDir) ? readdirSync(kindDir).filter((f) => f.endsWith(".md")) : []);
    for (const name of indexed) if (!present.has(name)) fail(modeFile, `${kind}/${name} is indexed but does not exist`);
    for (const name of present) if (!indexed.has(name)) fail(join(kindDir, name), "has no line in mode.md, so nothing opens it");
  }
};

const personalFlag = process.argv.indexOf("--personal");
if (personalFlag !== -1) {
  const dir = resolve(process.argv[personalFlag + 1] ?? join(homedir(), `.${modeDir.replace(/-mode$/, "-stack")}`));
  checkPersonal(dir);
  if (errors.length) {
    console.error(errors.join("\n"));
    console.error(`\n${errors.length} problem(s)`);
    process.exit(1);
  }
  console.log(`ok: personal stack at ${dir}`);
  process.exit(0);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const skills = new Set(readdirSync(skillsDir).filter((d) => existsSync(join(skillsDir, d, "SKILL.md"))));
const playbooksDir = join(skillsDir, modeDir, "playbooks");
const playbookStems = new Set();
const playbookTitles = new Set();
for (const file of readdirSync(playbooksDir)) {
  playbookStems.add(file.replace(/\.md$/, ""));
  const title = readFileSync(join(playbooksDir, file), "utf8").match(/^### (.+)$/m);
  if (title) playbookTitles.add(title[1].toLowerCase());
}

const resolvesToSkill = (name) => skills.has(name) || skills.has(`principle-${name}`);
const resolvesToPlaybook = (name) => playbookStems.has(name) || playbookTitles.has(name.toLowerCase());

for (const skill of skills) {
  const file = join(skillsDir, skill, "SKILL.md");
  const frontmatter = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    fail(file, "no frontmatter");
    continue;
  }
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1].trim();
  if (name !== skill) fail(file, `frontmatter name "${name}" differs from folder "${skill}"`);
  if (!/^description:\s*\S/m.test(frontmatter[1])) fail(file, "no description");
}

const upstreamOnly = /plugin-dev:|poteto-|pstack:|pstack-models|\/setup-pstack/;
const markdown = walk(root).filter((f) => f.endsWith(".md") && !f.includes("/licenses/"));
for (const file of markdown) {
  const text = readFileSync(file, "utf8");
  const isTemplateFile = /(_|-)template\.md$/.test(file);
  const isExample = file.includes("/examples/");

  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target) || target.includes("<")) continue;
    const path = resolve(dirname(file), decodeURIComponent(target.split("#")[0]));
    if (!existsSync(path)) fail(file, `broken link ${target}`);
  }

  if (isTemplateFile) continue;

  if (!file.endsWith("NOTICE.md")) {
    const hit = text.match(upstreamOnly);
    if (hit) fail(file, `names "${hit[0]}", which exists only in upstream pstack`);
  }
  // An example is a personal stack. Its playbook names resolve against its own mode.md, checked below.
  if (isExample) continue;

  for (const [, name] of text.matchAll(/\*\*([^*]+)\*\* (?:principle )?skill\b/g)) {
    if (!resolvesToSkill(name)) fail(file, `"${name}" skill does not exist`);
  }
  for (const [, name] of text.matchAll(/\*\*([^*]+)\*\* playbook\b/g)) {
    if (!resolvesToPlaybook(name)) fail(file, `"${name}" playbook does not exist`);
  }
  for (const [, name] of text.matchAll(/`([a-z-]+)` playbook\b/g)) {
    if (!resolvesToPlaybook(name)) fail(file, `"${name}" playbook does not exist`);
  }
  for (const [, name] of text.matchAll(/`playbooks\/([a-z_-]+)\.md`/g)) {
    if (!playbookStems.has(name)) fail(file, `playbooks/${name}.md does not exist`);
  }
}

const examplesDir = join(root, "examples");
const examples = existsSync(examplesDir) ? readdirSync(examplesDir).filter((d) => statSync(join(examplesDir, d)).isDirectory()) : [];
for (const example of examples) checkPersonal(join(examplesDir, example));

const mode = readFileSync(join(skillsDir, modeDir, "SKILL.md"), "utf8");
for (const skill of skills) {
  if (skill !== modeDir && !mode.includes(`**${skill}**`)) {
    fail(join(skillsDir, modeDir, "SKILL.md"), `skill "${skill}" has no line here, so nothing routes to it`);
  }
}

const models = JSON.parse(readFileSync(join(root, "models.json"), "utf8"));
for (const { role, skill } of models.roles) {
  const file = join(skillsDir, skill, "SKILL.md");
  if (!existsSync(file)) fail(join(root, "models.json"), `role "${role}" names missing skill "${skill}"`);
  else if (!readFileSync(file, "utf8").includes(role)) fail(file, `models.json role "${role}" is not named in this skill`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`ok: ${skills.size} skills, ${playbookStems.size} playbooks, ${examples.length} examples, ${markdown.length} markdown files, ${models.roles.length} model roles`);
