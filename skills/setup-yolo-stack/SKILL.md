---
name: setup-yolo-stack
description: "Configure the stack on this machine: which model each role uses, and whether the session hook routes tasks. Writes the override sheet. Use for /setup-yolo-stack, 'configure the stack', 'change which models the stack uses', or turning the session hook on or off."
---

# Setup yolo-stack

On Codex, read the [platform mapping](../yolo-mode/references/codex-tools.md) before following this skill.

Write the per-role model override sheet for this machine. Each skill that fans out names a default model in its Models section. The sheet replaces those defaults with models the human has.

This skill sets up the machine. What the human's work is, and how they want it done, is the **get-started** skill.

The human may not know what a model is. Say that a model is which AI does a given part of the job, that the defaults work, and that they can accept everything by saying so. Ask one question at a time.

On Claude Code the sheet is `<config>/stack-models.md`, where `<config>` is `$CLAUDE_CONFIG_DIR` when set and `~/.claude` otherwise. On Codex it is `<codex-home>/stack-models.md`, where `<codex-home>` is `$CODEX_HOME` when set and `~/.codex` otherwise.

## Steps

### 1. Detect available models

List the model names the `Agent` tool's `model` parameter accepts in this session. On Claude Code they are the family names in [Models](#models), and a full model ID is rejected. Never write a name you have not confirmed is available. `inherit-parent` and `auto` are always valid. Both run the role on the session's own model, which the `Agent` call expresses by omitting `model`.

### 2. Load current state

If the sheet exists, read it and treat its values as the current choices. Otherwise start from the shape in step 6. Drop a line whose role is not in that shape.

### 3. Map and confirm

Show every role with its current model. Mark any name that is not in the detected set as needing a choice, and list each line step 2 dropped. Ask whether to accept as shown or change specific roles. Prefer `AskUserQuestion` over free text.

`arena runners` and `interrogate reviewers` are lists. One subagent runs per entry, so the length of the list is the number of subagents and the cost. `arena cross-judge pool` is a list that Arena picks one model from.

### 4. Choose whether the session hook routes tasks

The stack's `SessionStart` hook tells the agent to route work through the **yolo-mode** skill on startup, resume, clear, and compact. Ask whether to keep it. The default is on. The answer is the `session hook` line of the sheet. With no sheet or no line, the hook runs. Codex asks the human to trust plugin hooks through `/hooks` first.

### 5. Validate

Every model name written is in the detected set, or is `inherit-parent` or `auto`. If one is not, stop and ask again.

### 6. Write the override sheet

Write the sheet in the shape below. Overwrite the whole file, so a second run gives the same result.

```markdown
# Stack model configuration

Per-role model overrides for the stack's skills. Each skill names its defaults in a Models section, and the values here replace them. Delete a line to fall back to the skill default. A value of `inherit-parent` or `auto` runs that role on the session's own model. `session hook: off` stops the SessionStart hook from routing tasks through the mode skill. Any other value, or no line, leaves it on.

why investigators: opus
why synthesizer: opus
reflect tooling: opus
reflect judgment, divergent, synthesizer: opus
arena runners: opus, fable, sonnet
arena cross-judge pool: opus, fable, sonnet
swarm workers: opus
interrogate reviewers: opus, fable, sonnet

session hook: on
```

### 7. Wire it in

On Claude Code, if `<config>/CLAUDE.md` does not already include the sheet, append an `@` line with the sheet's resolved path, such as `@~/.claude/stack-models.md`. The model rows then load in every session.

On Codex, paste the model rows into `<codex-home>/AGENTS.md`, because Codex has no `@` include. Leave the `session hook` line out of `AGENTS.md`. The hook reads it from the sheet.

### 8. Confirm

Tell the human where the sheet was written, how its rows load, and whether the hook is on. If the session hook reported that the stack has not been set up for the human's work, say in one sentence that the **get-started** skill is the next step.

## Models

Role defaults, copied by hand from `models.json` in the **yolo-mode** skill's folder.

- Available Claude models: `opus`, `fable`, `sonnet`, `haiku`
- Default panel: `opus`, `fable`, `sonnet`
- Single-role default: `opus`
