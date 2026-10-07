# Epistemics

How to reason about confidence when evidence is historical, fragmentary, and sometimes contradictory, and how to communicate it without flattening it into false certainty.

A piece of work doesn't carry its own motivation. You can read what a clause, a figure, or a process says. You can't read *why it exists*. That lives in version history, emails, tickets, documents, and conversations, all incomplete, biased, and sometimes missing entirely. Pretending otherwise produces confident-sounding guesses that mislead the user.

## Claims about human decisions

Before investigating whether a rule permits an action, identify the component or stage that owns the action and whether the question affects the current task. Ownership elsewhere may make the question unnecessary; it does not end a relevant cross-component investigation.

When the exact scope of a human ruling matters, locate the person's original attributable words. Preserve a source pointer, the speaker, and enough original wording to establish scope. Label an agent summary or interpretation as such, regardless of its age. A paraphrase alone cannot establish the original instruction's exact scope. If the original is unavailable, say so and leave that scope uncertain; do not invent a firm restriction or permission.

For example, "hold that vendor's payments during this audit" and an agent's "the user permanently forbids paying that vendor" are different claims. Report the scoped original and the broader interpretation separately. Copies of that interpretation in several notes form one dependent evidence chain, not independent decisions. Trace them to their source before increasing confidence. This rule concerns human rulings; ordinary factual reporting does not require verbatim quotes for every claim.

## Confidence Tiers

Every claim in the final output must sit in one of these tiers. The tier determines which output section the claim goes in and how it's phrased.

### 1. Direct

An explicit, textual citation that answers the question. Not "the item does X so the author must have wanted X." Something an author actually *wrote* that says why.

Examples:
- An email that says "we moved the deadline to the 15th because the client's auditor needs two weeks"
- A ticket that says "we're adding this because customer Acme requested it in their compliance review"
- A cell note that says "capped at 100 because the bank rejects larger batches"
- A memo that says "we chose option A over option B because it stays inside the existing contract"
- A chat message from the author saying "switching to this template since the old one kept getting rejected"

Phrasing: confident, present tense. "This exists because X." Cite the source.

### 2. Supported

Multiple pieces of indirect evidence converge. No single source states it explicitly, but the pattern across sources makes it likely.

Examples:
- The email subject says "cut costs," the ticket is labeled "budget," and the versions saved that week all change the same line items
- The author's other messages from the same week all mention the same audit

Phrasing: confident but clearly derived. "The evidence points strongly to X: [the specific pieces]." Cite multiple sources.

### 3. Inferred

A reasonable reading of the context, but nothing explicitly supports it. The reader should understand this is *your interpretation*, not a fact from the record.

Examples:
- The email doesn't say why, but the complaint arrived that morning (per the chat timing) and the change was saved the same day, so it was likely a rushed fix.
- The procedure sends three reminders. This matches the "three reminders" convention seen in the team's other procedures.

Phrasing: hedged. "It appears", "likely", "suggests", "is consistent with", "one reading is". Make the inference chain explicit: "Given A and B, C seems likely because D."

### 4. Speculative

A plausible hypothesis, but the evidence is thin and other explanations fit equally well. Presenting these is valuable, but mark them clearly as guesses.

Examples:
- "This might be a workaround for a rule that has since changed, but we found no contemporary evidence of that."
- "It's possible this threshold was chosen to match a contract commitment, but no contract references it."

Phrasing: explicitly speculative. "One possibility is X, but we have no direct evidence." Usually lives in the "Competing Hypotheses" section alongside other possibilities.

### 5. Unknown

You looked and couldn't find out. A valid and important outcome. Document it.

Phrasing: "We searched X, Y, and Z and found no evidence of why." Be specific about *what* you searched. "We couldn't find out" is less useful than "we searched the ticket tracker with keywords A and B, read the 6 saved versions of this file since 2023, and searched the shared folder for the threshold value. None surfaced a rationale."

## Phrasing Guide

### Words that carry confidence. Use carefully

These imply **Direct** or **Supported** confidence. Don't use them for inferences.

- "because". Implies a causal claim with evidence
- "the reason is". Same
- "was designed to". Claims author intent
- "fixes", "addresses", "solves". Claims the change achieved its goal
- "the team decided". Claims a group decision happened

If you're using these, you should have a citation immediately adjacent.

### Words that hedge. Use for inferences

- "appears to"
- "seems to"
- "likely"
- "suggests"
- "is consistent with"
- "one reading is"
- "plausibly"
- "may have been"
- "the evidence points toward"

These signal that you're interpreting, not reporting. Use them liberally in the "What We Can Reasonably Infer" section.

### Words to avoid

- "obviously". If it were obvious, the user wouldn't be asking
- "clearly". Almost always precedes a claim that isn't clear
- "of course". Same
- "just" (as in "it's just X for speed"). Dismissive and usually hides uncertainty
- "I think" / "I believe". You're synthesizing evidence, not giving a personal opinion. Use "the evidence suggests" instead.

### Avoid rationalization

Work that "makes sense" today may have been done for reasons that no longer apply, or that were wrong when they were written. Don't retrofit a clean rationale onto messy history.

Resist the urge to:
- Assume the author did the "right" thing and work backward to justify it
- Assume a consistent pattern across the files was intentional when it might be copy-paste
- Turn an absence of evidence into evidence of absence ("no one mentioned legal concerns, so it must not have been a concern")

## The Sycophancy Trap

Users often phrase `why` questions with an embedded hypothesis: "Why do we do it this way, I assume it's for tax reasons?" Don't simply confirm it. Treat it as one candidate among others and check the evidence independently. If the evidence supports it, say so with citations. If not, say so and present what the evidence *does* support.

The user's guess is a prompt for investigation, not a conclusion to validate.

## When Evidence Contradicts

If two sources disagree (the email says one thing, the ticket says another), surface both. Don't pick the one that fits a tidier narrative. A typical pattern:

- **The ticket says** "we need this for customer X's compliance requirement"
- **The email says** "tidying up the old template"

Both may be true (the ticket motivated the work, the email is the author's framing of it), or one may be wrong. Present both with their citations and let the user make the call.

## When Evidence Is Missing

An honest "we don't know" is one of the most valuable outputs this skill can produce. The user now knows:

- The answer isn't in the obvious places
- They'll need to ask a human (the original author, the person in charge) to find out
- Or they can decide the question isn't worth pursuing further

Failing to mark a gap and filling it with a confident guess actively harms the user. They'll act on the guess.

When you hit a gap, name it concretely:
- What question you were trying to answer
- What sources you searched
- What you searched for in each
- What you found (nothing, or only tangentially related material)

## Calibration Check Before Finalizing

Before delivering the output, the synthesizer should review every claim in "What We Found" and "What We Can Reasonably Infer" and ask:

1. Does this claim have a citation? If not, either add one or move it to "Inferred" / "Hypotheses".
2. Is the phrasing calibrated to the tier? (A Direct claim can use "because". An Inferred claim cannot.)
3. Am I treating the item itself as evidence for its own intent? If so, that's not evidence. Remove or reclassify.
4. Does the output include a "What We Don't Know" section? If no gaps are mentioned, that's suspicious. Either the evidence was unusually complete or something is being swept under the rug.
