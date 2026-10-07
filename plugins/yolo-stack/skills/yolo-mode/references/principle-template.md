# Principle template

One rule per file. Aim for under 35 lines. A principle the human's corrections produced goes to `~/.yolo-stack/principles/<kebab-name>.md`. A principle shipped with the stack goes to `skills/principle-<kebab-name>/SKILL.md`. Both use the same block. Copy the block below and fill every part. A part you cannot fill means the principle is not ready.

```markdown
---
name: principle-<kebab-name>
description: "Apply when <the situation, in words a task would use>. <The rule in one sentence.>"
user-invocable: false
---

# <Title>

<The rule, as an instruction.>

**Why:** <What goes wrong without it. One or two sentences from a real case.>

**Pattern:**
1. <What to do, as steps.>

**You skipped this if:** <An observable sign in the output that the rule was not followed.>

**Evidence:** <Two real occurrences that produced this rule: session, file, or inbox entry for each.>
```

## Rules for the parts

- **description** starts with "Apply when" or "Apply before". "Be careful" has no trigger and never fires.
- **Why** comes from a case that happened, not from what sounds wise.
- **You skipped this if** names something a reviewer can see without asking the agent.
- **Evidence** holds two occurrences. One occurrence is a one-off and stays out. A seed principle written before any work exists has no occurrences yet. Mark it `Evidence: seed, unconfirmed`, and replace or delete it after the first reflect that touches it.

After writing, add its one-line entry to the index: Principles in `~/.yolo-stack/mode.md` for a personal one, the Principles index in the **yolo-mode** skill for a shipped one.
