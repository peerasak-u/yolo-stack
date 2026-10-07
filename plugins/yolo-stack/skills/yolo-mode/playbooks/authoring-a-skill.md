### Authoring or modifying a skill

**You own the skill's voice.**

This playbook is for files that ship with the stack. The human's own playbooks and principles go to `~/.yolo-stack/` and are indexed in its `mode.md`. They are validated with `node tools/check-refs.mjs --personal`, and steps 5 and 6 do not apply to them.

1. Draft. A skill is a folder with a `SKILL.md` whose frontmatter has `name` (matching the folder) and `description` as one quoted YAML scalar. A principle starts from [`../references/principle-template.md`](../references/principle-template.md). A playbook starts from [`_template.md`](_template.md).
2. Write the description as a trigger. It says when to open the file, in the words a task would actually use. An agent sees only this line until the situation matches.
3. Validate. Run `node tools/check-refs.mjs` from the stack root. It fails on missing frontmatter, a `name` that differs from its folder, a broken relative link, a skill or playbook named in bold that does not exist, and a skill that the mode file never mentions.
4. Test the trigger. Write two requests that should open the skill and one that should not, and check the description separates them. When a skill did not fire and should have, change the description, not the body.
5. Wire it. Add one line to the **yolo-mode** skill: a trigger, a Principles index entry, or a Playbooks entry. A skill with no line there is shipped, not wired.
6. Show the human the diff and wait for approval before it lands. Skill changes affect every later session.

When in doubt, delete. Keep only prose that changes a decision. Tell it to do the thing and skip the reason, unless the rule is confusing without one. Delegate to other skills by name. Don't restate them. Prefer a script or check over an instruction, per the **principle-encode-lessons-in-structure** skill. Run every line through the **unslop** skill.

**Reply:** what the skill is for, its trigger line, the validation output, and what was wired.
