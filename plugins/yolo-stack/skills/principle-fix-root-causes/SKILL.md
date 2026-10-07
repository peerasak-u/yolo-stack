---
name: principle-fix-root-causes
description: "Apply when something came out wrong and you are about to correct it: a total that does not tie, a document with a wrong figure, a step that keeps failing. Find what produced the error and fix it there, not only where it showed up."
user-invocable: false
---

# Fix Root Causes

Do not patch the place an error showed up. Trace it to what produced it and fix it there.

**Why:** A patched output hides the cause, and the cause fires again next time. Each patch also makes the work harder to check, because the result no longer follows from its inputs.

**Pattern:**
1. Reproduce it. See the wrong result yourself, from the source, before changing anything.
2. Ask why until you reach the step that produced it. The total is off, because one line is counted twice, because the export includes cancelled entries.
3. Fix that step. Overwriting the total or adding a manual adjustment is a patch.
4. Look for the same cause elsewhere. One instance found usually means more.
5. When stuck, look closer. Open the record and read what it says. Do not guess.

**You skipped this if:** the fix overrides an output by hand, or the reply cannot name the step that produced the error.

**Evidence:** seed, unconfirmed. Adapted from pstack's `principle-fix-root-causes`.
