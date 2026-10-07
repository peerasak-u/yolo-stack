---
name: interrogate
description: "Use for \"interrogate\", \"adversarial review\", \"multi-model review\", \"challenge this\", \"stress test this\", \"find blind spots\", \"poke holes in this\", or \"tear this apart\". Reviewers on different models independently challenge a piece of work: a report, a contract review, a spreadsheet, a plan."
---

# Interrogate

On Codex, read the [platform mapping](../yolo-mode/references/codex-tools.md), including its per-skill notes, before following this skill.

Spawn one reviewer per configured model to adversarially review a piece of work. Each model gets the same prompt and rubric. The adversarial signal comes from model diversity, not assigned personas.

The deliverable is a synthesized verdict. Do NOT auto-apply changes.

## Step 1, Determine Scope

Identify what to review from context:

- If the user points at specific files or a passage, use that
- If the work is a change to something that existed, gather the before and the after (`git diff` if the folder is a git repository)
- If the user's message references recent work, gather the relevant files

Package the work plus any source material the reviewers need to check it.

## Step 2, State the Intent

Before spawning reviewers, state the intent explicitly. Derive this from:

- The user's message
- The request or brief the work answers
- The work itself

Write one clear paragraph. If you're unsure about the intent, ask the user before proceeding.

## Step 3, Spawn Reviewers

Launch all reviewers in a single message using the `Agent` tool. Use the `interrogate reviewers` line in the `stack-models.md` override sheet, one reviewer per entry, extending or shrinking the Reviewer A/B/C labels below to the configured entry count. If the sheet or that line is missing, use the table defaults.

| Subagent | Default model |
|----------|---------------|
| Reviewer A | `opus` |
| Reviewer B | `fable` |
| Reviewer C | `sonnet` |

For each reviewer:
- `subagent_type`: `general-purpose`
- `model`: the configured `interrogate reviewers` entry, or the table default with no configured line. For an `auto` or `inherit-parent` entry, omit `model` so that reviewer runs on the parent model.
- `readonly`: `true`

If the `Agent` tool rejects a configured entry, run that reviewer on the table default of its family and say so. Families go by model name, such as Opus, Fable, or Sonnet. With no family match, use Reviewer A's default. If it rejects a table default, check the valid slugs in the `Agent` tool's error message, pick the closest equivalent (prefer the highest-reasoning tier of the same family), spawn with it, and tell the user the default table needs updating. Do not block the review on the slug issue. Never treat an alias entry as a rejected slug or apply either fallback to it.

Read `references/reviewer-prompt.md` and fill in the template with:
1. The stated intent
2. The work under review
3. The review rubric from `references/rubric.md`

The same filled template goes to all reviewers.

## Step 4, Synthesize

As results come back, build a unified picture:

1. **Parse all findings** from the reviewers
2. **Identify consensus**. Findings raised by 2+ models independently are highest signal.
3. **Identify lone-model findings**. Still worth reading, but weight accordingly.
4. **Deduplicate**. Different models may describe the same issue differently. Merge these and note which models raised it.
5. **Note disagreements**. If one model flags something and another explicitly says the opposite, that's useful context for the verdict.

## Step 5, Lead Judgment

You are the lead reviewer, a pragmatic senior colleague, not a neutral aggregator.

Read `references/lead-judgment.md` for the full framework.

Categorize every finding using these buckets:

- **Act on**. Real issues affecting correctness, risk, or fitness for purpose given the actual goals. These would stop the work going out.
- **Consider**. Legitimate points, but you're not sure they outweigh the cost of addressing them right now. Worth the user's attention.
- **Noted**. Technically valid but not actionable. Context-dependent or low-impact given the current stage.
- **Dismissed**. Wrong, nitpicky, or missing context. Brief explanation why.

For each finding, include:
- Which model(s) raised it
- The category (act on / consider / noted / dismissed)
- A one-line rationale for the categorization

## Output Format

Present the verdict in this structure:

### Intent
> [The stated intent paragraph from Step 2]

### Reviewers
- Reviewer [label]: [model name], [N findings] (one bullet per reviewer)

### Act On
[Findings that should be addressed. For each: description, which models raised it, why it matters.]

### Consider
[Findings worth thinking about. For each: description, which models raised it, tradeoff involved.]

### Noted
[Valid but low-priority. Brief list.]

### Dismissed
[Rejected findings with brief rationale.]

### Agreement Map
[Where did models agree, where did they diverge, and what does the pattern of agreement/disagreement tell us?]
