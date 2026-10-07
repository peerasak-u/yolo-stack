---
name: automate-me
description: "Use for 'automate me', 'learn how I work from my past chats', 'turn my preferences or working style into rules', 'เรียนรู้วิธีทำงานของฉันจากแชตเก่า', or wanting agents to follow how the human works. Mines weeks of past sessions and proposes additions to the human's own stack."
---

# Automate me

On Codex, read the [platform mapping](../yolo-mode/references/codex-tools.md), including its per-skill notes, before following this skill.

Turn how the human has been working with agents into entries in their own stack at `~/.yolo-stack/`, laid out in [`../yolo-mode/references/mode-template.md`](../yolo-mode/references/mode-template.md). The **get-started** skill asks them. This skill reads what they already did.

## Flow

### 0. Read the current stack

Read `~/.yolo-stack/mode.md` if it exists, and mine only history since it last changed. If it does not exist, create it from the template with empty lists.

### 1. Mine their history

Locate the active workspace's transcripts before fanning out. Claude Code stores them at `~/.claude/projects/<encoded-cwd>/*.jsonl`, where `<encoded-cwd>` is the workspace's working directory with `/` → `-`. Use only that path. Don't glob across `~/.claude/projects/`. That crosses workspace boundaries and reads private chats from unrelated projects.

Run parallel subagents across slices of the last two to four weeks, three slices so each has enough material. Each reads the transcripts the parent names and returns a short list of patterns with evidence pointers. The signals to look for:

- How they want replies: language, length, format, "say it more simply" corrections
- What they let the agent do unasked, and what they stopped it doing
- What they opened to check a result
- Jobs that came up more than once
- Corrections that came up more than once

A pattern seen in two or more slices is kept. A lone signal is dropped.

### 2. Ask the human directly

Mining misses what has not come up yet. Ask one or two questions with the `AskUserQuestion` tool, built from what the mining found, then one open question for anything the options missed. Don't ask twenty.

### 3. Sort each finding to its place

| Finding | Goes to |
|---|---|
| A reply preference | Reply in `mode.md` |
| Something they let the agent do, or stopped it doing | Autonomy in `mode.md` |
| Something they checked a result against | Real things in `mode.md` |
| A job seen twice with no playbook | A proposal to run the **capture-playbook** skill on it. Do not write a playbook from transcripts. |
| A correction seen twice | A principle at `~/.yolo-stack/principles/`, from `../yolo-mode/references/principle-template.md`, with both occurrences in its Evidence line |
| A correction seen once | One entry in `corrections.md` at the project root |

### 4. Show, then write

Show every proposed entry with the session it came from. The human approves or drops each one. Write only what they approved, in their language, then run `node tools/check-refs.mjs --personal` from the stack root.

## Guardrails

- A preference stated once and contradicted another time is noise.
- Do not restate what a shipped skill already says. Add an entry only where the human's rule differs from the default.
- Keep each entry one line. "Communicate clearly" is not an entry. "Reply in Thai, conclusion first, amounts to two decimals" is.

**Reply:** the entries written and where, the entries dropped and why, and the jobs proposed for capture.
