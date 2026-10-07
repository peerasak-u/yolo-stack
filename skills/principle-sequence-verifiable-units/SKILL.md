---
name: principle-sequence-verifiable-units
description: "Apply to work with many similar steps or parts: a batch of documents, a month of entries, a long report built section by section. Do it in small units that each end in a check, and check each before starting the next."
user-invocable: false
---

# Sequence Work into Verifiable Units

Order work as small units, each ending in a state you can check. Do not start the next unit until the current one passes.

**Why:** An error caught at the unit that caused it is cheap to find. An error caught after the whole batch is buried, and everything after it was built on it.

**Pattern:**
1. Split the work into units small enough that a failed check points at one cause.
2. Name the check for a unit before doing it: a count, a total, a comparison against the source.
3. Finish the first unit completely and check it before doing the rest the same way.
4. Do one unit, run its check, then start the next. A cheap check still runs.
5. Hand the work over in an order the reviewer can replay: the starting state, each change, the check after it.

**You skipped this if:** every check appears at the end, or an error turned up late and the reply cannot say which unit introduced it.

**Evidence:** seed, unconfirmed. Adapted from pstack's `principle-sequence-verifiable-units`.
