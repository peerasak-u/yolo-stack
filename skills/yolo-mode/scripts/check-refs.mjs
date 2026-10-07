#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describeStack, walk } from "./stack.mjs";

const { modeRoot, skillsDir, modeDir, stackName, owned, isSource } = describeStack();
const errors = [];
const fail = (file, msg) => errors.push(`${relative(skillsDir, file)}: ${msg}`);

const skills = new Set(owned);
const playbooksDir = join(modeRoot, "playbooks");
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
const examplesDir = join(skillsDir, "..", "examples");
const markdown = [...owned.map((d) => join(skillsDir, d)), ...(isSource && existsSync(examplesDir) ? [examplesDir] : [])]
  .flatMap(walk)
  .filter((f) => f.endsWith(".md") && !f.includes("/licenses/"));
for (const file of markdown) {
  const text = readFileSync(file, "utf8");
  const isTemplateFile = /(_|-)template\.md$/.test(file);
  const isExample = file.startsWith(examplesDir);

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
  // An example shows files from a filled stack. Its playbook names are not this stack's.
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

const modeFile = join(modeRoot, "SKILL.md");
const mode = readFileSync(modeFile, "utf8");
for (const skill of skills) {
  if (skill !== modeDir && !mode.includes(`**${skill}**`)) {
    fail(modeFile, `skill "${skill}" has no line here, so nothing routes to it`);
  }
}

const models = JSON.parse(readFileSync(join(modeRoot, "models.json"), "utf8"));
for (const { role, skill } of models.roles) {
  const file = join(skillsDir, skill, "SKILL.md");
  if (!existsSync(file)) fail(join(modeRoot, "models.json"), `role "${role}" names missing skill "${skill}"`);
  else if (!readFileSync(file, "utf8").includes(role)) fail(file, `models.json role "${role}" is not named in this skill`);
}

// The setup skill writes the override sheet, so its sheet shape lists every role.
const setupFile = join(skillsDir, `setup-${stackName}-stack`, "SKILL.md");
if (!existsSync(setupFile)) fail(modeFile, "no setup-<stack>-stack skill is named here, so the stack has no name");
else {
  const sheet = readFileSync(setupFile, "utf8");
  for (const { role } of models.roles) {
    if (!new RegExp(`^${role}: `, "m").test(sheet)) fail(setupFile, `models.json role "${role}" has no line in the sheet shape`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`ok: ${stackName}-stack with ${modeDir}, ${skills.size} skills, ${playbookStems.size} playbooks, ${markdown.length} markdown files, ${models.roles.length} model roles`);
