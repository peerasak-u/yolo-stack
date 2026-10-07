---
name: principle-explain-the-number
description: "Apply before you trust, report, or act on a number you computed or pulled: a total, a count, a rate, a variance, a percentage change. Say what it is made of, and rule out that it counted something else."
user-invocable: false
---

# Explain the Number

A number is a claim about the records behind it. Before you report it or act on it, show what it is made of and rule out that it measured something else.

**Why:** A wrong pull still returns a plausible number. Duplicates, missing records, the wrong period, and a filter left on all produce a figure that looks fine.

**Pattern:**
1. Reach it a second way. Tie it to a control total, a prior period, or a hand count of a sample.
2. List what else it could be counting, and rule out each with evidence: duplicates, missing records, the wrong period or cutoff, mixed units or currencies, a filter left on, a blank read as zero.
3. Ask why it is not half or double. If you cannot say what bounds it, you do not know what it measures.
4. Keep the evidence with the number: the source, the date pulled, the row count, the tie-out.

Distinct from the **principle-prove-it** skill, which checks that an output is real. This checks that a number means what you say it means.

**You skipped this if:** a number is reported with no source, row count, or tie-out, or a surprising change is reported with no explanation of what moved.

**Evidence:** seed, unconfirmed. Adapted from pstack's `principle-explain-the-number`.
