---
name: why
description: "Use for 'why is X this way', 'why did we pick Y', 'who decided this and when', or the reason behind a clause, a figure, a policy, a process, or a threshold. Searches each available record (file and version history, email, chat, documents and meeting notes, the tracker, spreadsheets and records) in parallel, then returns a cited read on decisions and tradeoffs."
---

# Why

On Codex, read the [platform mapping](../yolo-mode/references/codex-tools.md), including its per-skill notes, before following this skill.

Investigate the motivation and intent behind a piece of work.

Each spawn below names a role line in `stack-models.md` and a default in [Models](#models). Set `model` to that line's value, or to the default if the sheet or the line is missing. Leave `model` unset when the value is `auto` or `inherit-parent`. If the `Agent` tool rejects a slug, use the default and say so. If it rejects the default, use the closest valid slug of the same family from its error message.

## Operating Posture

Operate as a **careful, cautious, and precise investigator**. Be honest about what you know vs what you're inferring. Read `references/epistemics.md` for the full confidence framework and phrasing guide. The synthesizer must follow it.

## Step 1. Understand the Target and the Question

Parse what the user is asking. The **target** is usually a document, a clause, a figure, a process, or a named decision. The **question** is usually the reasoning behind a decision, a tradeoff, the case that prompted it, an outside constraint, something that looks unused, or a broad history sweep.

If the target is vague ("why do we do it this way?" with no clear referent), make your best guess from conversation context (open files, recent edits, what was just discussed). State your interpretation briefly so the user can redirect if you're off, then proceed.

## Step 2. Establish the Anchor

Before spawning investigators, anchor the investigation in something concrete. Build this inline. You need:

- The item and where it lives (file path, document title, and the page, clause, sheet, or cell)
- The key terms (names, phrases, figures, people)
- The known changes. When the item last changed and who changed it, from version history, file dates, or `git log` if the folder is a git repository.
- Reference IDs found on or near the item (ticket, matter, invoice, or case numbers)

Pass this anchor to the investigators.

## Step 3. Spawn Parallel Investigators (default posture)

**Default to the full parallel investigation.**

### Investigator roster

One investigator per evidence category. Each entry names the category, its playbook, and the kind of "why" it surfaces. Use it to know what to expect back and how to name a gap when a category returns empty.

1. **File and version history**. [`files.md`](references/sources/files.md). Always spawn. Works on local files with no connector. Surfaces *what changed, when, and the notes left beside the change*.
2. **Email**. [`email.md`](references/sources/email.md). Surfaces *instructions, approvals, and requirements from outside parties*.
3. **Chat**. [`chat.md`](references/sources/chat.md). Surfaces *real-time deliberation that never reached a document*. Matters most when the rest of the paper trail is thin.
4. **Documents and meeting notes**. [`documents.md`](references/sources/documents.md). Surfaces *reasoning written out at length before the work started*.
5. **Tracker or ticket system**. [`tracker.md`](references/sources/tracker.md). Surfaces *the request behind the work*.
6. **Spreadsheets and records**. [`records.md`](references/sources/records.md). Surfaces *the numbers that shaped the item*. Strongest for "where did this figure come from".

### Discovery

List what this session can search. A category is available when a connector covers it (an MCP server, whose tools appear with prefix `mcp__<server>__`), when a skill searches it, or when the user keeps an export of it on disk. Classify each connector by its name, server instructions, and tool names. If one could fit two categories, choose the one matching its primary evidence and record the ambiguity.

Aim for a complete **coverage map**, not a minimal one. Document the null, don't skip the search.

Launch all matching investigators in a single message so they run concurrently. Each owns exactly one category. Don't ask one agent to cover two.

Subagent config (each):
- `subagent_type`: `general-purpose`
- `model`: the `why investigators` line, default in [Models](#models)
- `readonly`: `false` (agent mode). **Do not use readonly/Ask mode.** It strips connector access. Investigators still shouldn't write anything.

Each investigator gets:
1. The base prompt from `references/investigator-prompt.md`
2. Its category playbook from the roster, adapted to the tool that is available
3. The anchor from Step 2
4. The user's original question

### When to skip an investigator

Only skip with an **explicit, written justification** that goes in the final "Sources Consulted" section. Two valid reasons:

- **Nothing in this session can search that category.** Flag this as a gap, not a choice. Example: "Chat skipped. No connector or export available, so the conversational record was not searchable."
- **The source is provably irrelevant**, not just "probably irrelevant." A high bar. Example: "Tracker skipped. The user confirmed this office has no ticket system."

If one record already holds the complete answer, you may answer inline **only after** confirming every other available category search would be redundant. Say so explicitly. This should be rare.

## Step 4. Synthesize

Spawn one synthesizer subagent:

- `subagent_type`: `general-purpose`
- `model`: the `why synthesizer` line, default in [Models](#models)
- `readonly`: `false` (agent mode). The synthesizer spot-verifies citations, which can require connector access.

The synthesizer gets:
1. The investigator findings, including any null results and any categories skipped with justification
2. The anchor from Step 2
3. The user's original question
4. The epistemics framework from `references/epistemics.md`
5. The synthesizer prompt template from `references/synthesizer-prompt.md`

## Step 5. Present

Take the synthesizer's output and present it to the user. You may lightly edit for clarity or add context from the conversation, but **do not rewrite the confidence language**.

## Output Format

The output structure is the one in `references/synthesizer-prompt.md`: The Question, The Item in Question, What We Found, What We Can Reasonably Infer, Competing Hypotheses, What We Don't Know, Sources Consulted, Confidence Summary. Adapt as needed, but keep the confidence separation intact, and keep Sources Consulted as one line per investigator, including the ones that returned nothing or were skipped, with the reason.

After the Sources Consulted block, if the user's `why` question is a precursor to changing the item, convert the findings into a Preserve / Change / Avoid / Risk constraint set suitable for planning the change.

## Common Failure Modes to Avoid

- **Recency bias**. Assuming the most recent version or message is authoritative. The current shape is often the accretion of many earlier decisions. Trace back.

## Reference Files

- `references/epistemics.md`. Confidence tiers and phrasing guide. The synthesizer must follow it.
- `references/investigator-prompt.md`. Base prompt template for investigator subagents.
- `references/sources/*.md`. One playbook per category in the roster. Give an investigator the single file that matches its category.
- `references/synthesizer-prompt.md`. Prompt template for the synthesizer subagent, including the output format.

## Models

Role defaults, copied by hand from `models.json` in the **yolo-mode** skill's folder. A matching role line in the `stack-models.md` override sheet (`~/.claude/stack-models.md`, or `~/.codex/stack-models.md` on Codex) overrides each at runtime.

- why investigators: `opus`
- why synthesizer: `opus`
