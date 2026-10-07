# Review Rubric

Review through whichever lenses are relevant. Not every lens applies to every piece of work. Use judgment.

## Correctness

Does the work do what the intent says it should?

- Facts, figures, dates, names, and references: does each match its source?
- Arithmetic: do the totals add up, and does a number agree everywhere it repeats?
- Internal consistency: does one section contradict another? Is a defined term used the same way throughout?
- Edge cases: the empty case, the boundary value, the exception the rule didn't foresee
- Does the normal case work? Does the exceptional case?
- Repeat use: what happens if this is applied twice, or picked up after someone stopped halfway?

When you find a potential error, trace it. Don't just flag "this could be wrong". Show the source and the place where the work departs from it.

## Root Causes vs. Symptoms

Is the work fixing the actual problem or papering over a symptom?

Answering this often requires looking beyond the piece under review. Read the source documents, the earlier version, and what the work relies on. Use the tools available to you (Read, Grep, Glob) to explore. Understand why the piece exists before judging whether it addresses the right thing.

- A manual adjustment that hides a broken formula or process
- An exception that hides a flawed rule
- If you see a workaround, ask why it is needed and what a proper fix would look like
- A fix made here that belongs in the template, the policy, or the upstream record
- Instructions where structure would be better: if the fix is a note saying "don't do X" or a convention someone has to remember, ask whether a locked cell, a template, or a check could make the wrong thing impossible

## Fit

Does the work fit what surrounds it?

- Does it follow the template, the standard, or the earlier documents it has to agree with?
- Level: does it mix the summary with low-level detail?
- Dependencies: does it rely on something that will make later changes harder?
- Bolted-on vs. integrated: was the change patched onto the existing piece, or does it read as if the piece always accounted for it?
- Two versions of the truth: does it leave the old figure, clause, or process alive beside the new one? If nothing depends on the old one, remove it in the same pass.

Don't penalize simple work for lacking structure.

## Verification

Can a reader tell that this is right?

- Does each claim name its source? Does each figure tie back to a record?
- Was the real thing checked, or a proxy? A summary of a document is not the document.
- If this corrects an error: is there a check that would catch the error next time?
- For delegated work: was the output itself checked, or was the report about it trusted?

## Complexity Budget

Is the complexity justified by what the work accomplishes?

- Work that could be shorter or simpler without losing correctness or clarity
- Sections, options, or caveats for cases that don't exist yet
- Dead material: leftover template text, unused sheets, superseded clauses
- Does the reader's benefit justify each part? A half-finished section is worse than a missing one.

Simpler is better unless simpler is wrong.

## Risk

For each risk finding, show where it sits in the work and who it would reach.

- Confidential or personal information the recipient should not see
- Hidden content that travels with the file: tracked changes, comments, hidden sheets or columns, file properties
- Commitments, admissions, or deadlines the author did not intend to make
- What happens if this is wrong and someone relies on it
