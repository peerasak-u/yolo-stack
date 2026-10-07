---
name: principle-prove-it
description: "Apply after completing a task, before declaring done or reporting a result. Check the real thing (the source record, the actual value, the produced file), not a proxy, a summary, or a self-report."
user-invocable: false
---

# Prove It

Verify every output by checking the real thing directly. Do not infer from a proxy, a summary, or what an agent said it did.

**Why:** A summary that sounds right reads the same whether it is true or not. Acting on a wrong inference costs far more than checking the source.

**Pattern:**
1. Name the real thing for this claim: the source record, the produced file, the live value. Replace this line with the domain's own list before first use.
2. Read it in this session. A value copied from an earlier summary, or from a file you generated yourself, is not the source.
3. Point at it. Every claim carries a pointer a reviewer can follow, such as `file:line` or document and page.
4. Script the check when you can. A script that reruns the same comparison beats a one-time look, and its output is an artifact a reviewer reruns instead of trusting your word.
5. When a check fails, suspect the way you checked before you suspect the thing.

Say how far the proof went. Stated without a pointer, pointed at the source, or rerun by script are different strengths, and the reply names which one applies. `INCONCLUSIVE` is a valid result and is never reported as a pass.

**You skipped this if:** a claim has no pointer, or its pointer leads to a file the agent created.

**Evidence:** seed, unconfirmed. Adapted from pstack's `principle-prove-it-works`.
