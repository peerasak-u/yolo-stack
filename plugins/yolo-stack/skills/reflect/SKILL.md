---
name: reflect
description: Spawn three parallel review subagents over the active transcript and the corrections inbox, surface learnings, and route each to a concrete edit on an existing skill. Use when the user says reflect.
---

# Reflect

On Codex, read the [platform mapping](../yolo-mode/references/codex-tools.md), including its per-skill notes, before following this skill.

Mine the current conversation for durable learnings, then route them into skill edits.

## When to invoke

Invoke when the user says "reflect" or "/reflect". Skip when the conversation is trivial, off-topic, or already covered by an existing skill the parent followed correctly. One-offs are not learnings.

## Process

### 1. Locate the active transcript

The parent finds its own transcript file before fanning out. The system prompt names Claude Code's per-project transcripts directory at `~/.claude/projects/<encoded-cwd>/`. Use that path. Do not glob across `~/.claude/projects/`. That crosses workspace boundaries and reads private chats from unrelated projects.

Run the finder at `skills/reflect/scripts/find-transcript.mjs` under the installed plugin with the projects directory and a fragment of the conversation's opening user prompt:

```bash
node <plugin>/skills/reflect/scripts/find-transcript.mjs ~/.claude/projects/<encoded-cwd> "<opening prompt fragment>"
```

It covers the three layouts (flat `<id>.jsonl`, nested `<id>/<id>.jsonl`, subagent `<parent>/subagents/<child>.jsonl`), newest first, and prints the first path whose opening typed prompt carries the fragment. Do not reimplement the scan by hand: the first line of a transcript is session metadata, not a message, a session that starts with `/clear` or a `!` shell command records that command's wrapper and output as `user` records before the prompt, and files run to several megabytes, so the finder streams each candidate and stops at its first typed `user` record. If it exits 1, write a tight digest of the session and pass that instead.

Then check the corrections inbox. If `corrections.md` exists at the project root, it holds corrections a human made outside any chat, such as review notes on paper or feedback given in person. Append one line to each reviewer prompt naming its path, so reviewers cite inbox entries the same way they cite transcript moments. A project with no inbox skips this.

### 2. Spawn three reviewers in parallel

One message, three `Agent` calls, `subagent_type: "general-purpose"`, with `model` set as below. Reviewers need MCP access for context lookups (tickets, chat threads, observability traces referenced in the transcript). Pick a subagent_type that retains MCP access. The prompt forbids file writes. The parent applies edits.

Each reviewer and the synthesizer name a role line in `stack-models.md` and a default in [Models](#models). Set `model` to that line's value, or to the default if the sheet or the line is missing. Leave `model` unset when the value is `auto` or `inherit-parent`. If the `Agent` tool rejects a slug, use the default and say so. If it rejects the default, use the closest valid slug of the same family from its error message.

| Lens | Role line | Prompt template |
|---|---|---|
| Judgment | `reflect judgment, divergent, synthesizer` | `references/judgment-reviewer.md` |
| Tooling | `reflect tooling` | `references/tooling-reviewer.md` |
| Divergent | `reflect judgment, divergent, synthesizer` | `references/divergent-reviewer.md` |

Pass each template verbatim, substituting the transcript path or digest where marked. Reviewers return findings in the `Agent` response body.

### 3. Synthesize

One `Agent` call, `subagent_type: "general-purpose"`, with `model` from the `reflect judgment, divergent, synthesizer` line (default in [Models](#models)). Pick a subagent_type that retains MCP access. The synthesizer's quality check includes spot-verifying citations, which can require MCP access. Use `references/synthesizer.md` verbatim, with each reviewer's full output inlined where marked. The synthesizer returns a structured Accepted / Rejected / Backlog list.

### 4. Structural enforcement check

Sanity-check the synthesizer's Accepted list. For any item that would be enforced more reliably by a lint rule, script, metadata flag, or runtime check, move it from Accepted to Backlog. See the **encode-lessons-in-structure** principle skill.

### 5. Apply

Before applying any Accepted edit, present the synthesizer's full Accepted/Rejected/Backlog output to the user and wait for explicit approval. The user picks which subset to apply and may redirect routings. Skill changes affect every future agent in the org. Do not auto-apply.

Backlog items file to whatever devex / backlog tracker your team uses automatically. Only the Accepted list waits for approval.

What the human taught goes to their own stack at `~/.yolo-stack/`: an edit to one of their playbooks, a new principle, a change to their Autonomy or Real things lists. An edit to a shipped skill survives only when the stack root is a checkout the human owns. When the stack root is under a plugin cache, route that item to their own stack as a principle or a playbook line, or move it to Backlog.

For each approved Accepted item, follow the Routing field exactly:

- Trivial existing-skill edit (a one-line bullet, a tightened sentence, a stale fact corrected): parent does directly.
- Substantive existing-skill edit (a new section, a new pattern table, more than ~10 lines): hand to the **authoring-a-skill** playbook and run its draft / test / iterate loop.
- `tune description: <skill path>` (the skill exists but didn't trigger when it should have): hand to `authoring-a-skill` and run its description-optimization loop.
- `new skill via authoring-a-skill: <kebab-name>`: hand creation to `authoring-a-skill`. Do not invent the shape ad hoc.
- `new principle: <kebab-name>`: a correction with at least two cited occurrences, no existing principle that covers it, and no structural fix. Draft it at `~/.yolo-stack/principles/<kebab-name>.md` from `../yolo-mode/references/principle-template.md`, put both occurrences in its Evidence line, and add its one-line entry to Principles in `~/.yolo-stack/mode.md`.
- `replace shipped principle: <principle name>`: a shipped principle that the human's corrections contradict. Write the rule they follow as a personal principle that names the one it replaces. The personal one wins.

After applying, move each inbox entry that was applied or rejected under a `## Processed` heading in `corrections.md` with its outcome. Never delete an entry.

Run `node tools/check-refs.mjs --personal` from the stack root after any change to the human's own stack, and `node tools/check-refs.mjs` after any change to a shipped skill.

### 6. Summarize for the user

Short list, no preamble:

- Edits applied: `<skill path>`. What changed, one line each.
- New skills created: `<skill path>`. One line each (rare).
- Backlog filed to the devex tracker: `<issue title>` (`<tags>`). One line each.
- Dropped: one line per rejected finding + reason from the synthesizer.

## Models

Role defaults, copied by hand from `models.json` at the stack root. A matching role line in the `stack-models.md` override sheet (`~/.claude/stack-models.md`, or `~/.codex/stack-models.md` on Codex) overrides each at runtime.

- reflect tooling: `opus`
- reflect judgment, divergent, synthesizer: `opus`
