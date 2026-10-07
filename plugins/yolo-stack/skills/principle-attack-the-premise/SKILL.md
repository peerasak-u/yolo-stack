---
name: principle-attack-the-premise
description: "Apply when two or more attempts at the same problem have failed and they all assumed the same thing. Write the assumption down and check it before trying again."
user-invocable: false
---

# Attack the Premise

When attempts that share one assumption keep failing, suspect the assumption, not the attempts.

**Why:** Each failure under a shared assumption is evidence about the assumption. A third attempt that still depends on it will most likely fail the same way.

**Pattern:**
1. Write the premise down. It is the one sentence every failed attempt took for granted.
2. Choose an observation that could show it is false, and make it.
3. If it is false, start the next attempt from what you observed.
4. If it holds, keep the observation as evidence and look for the cause elsewhere.

Do not start the next attempt before the premise is written and checked.

**You skipped this if:** three attempts in a row differ only in detail, and none of them states what all three assumed.

**Evidence:** seed, unconfirmed. Adapted from pstack's `principle-attack-the-premise`.
