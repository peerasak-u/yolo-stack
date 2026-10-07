---
name: capture-playbook
description: "Interview a person about one recurring job, walking a real finished case step by step, and write the result as a playbook. Use for /capture-playbook, 'capture a playbook', 'let me teach you how I do X', 'write down how I do X', or when a job that will recur has no playbook yet."
---

# Capture a playbook

Turn how a person does one recurring job into a playbook an agent can follow. The knowledge is in their head. Your job is to get it out without adding to it.

This is an interview about what they did, not a review of what they should do. Do not recommend answers, do not offer options to pick from, and do not improve the process. A suggested answer gets agreement, and agreement is not how they work.

## Before you start

Three things must be true. If one is missing, stop and say which.

- **One job.** One session captures one kind of job. A second job is a second session.
- **One real case.** A finished instance of the job is open in front of both of you. Ask for it if it is not there.
- **They talk, you write.** They should not have to type more than a sentence at a time.

Read the case yourself first. What a document contains is a fact you look up, never a question for them. Ask only what the case cannot show: what they looked at, why, and how they decided.

## The walk

Go through the case in the order they worked it. Ask one question, wait for the answer, then ask the next. Always ask about this case ("what did you do next here?"), never in general ("what do you usually do?"). General questions get textbook answers.

Start with "You open this case. What do you look at first?" Then for each step they describe, ask whichever of these the answer has not already covered:

1. What did you do next, and what were you looking for?
2. How did you know that step was finished, or that you had seen enough?
3. Did anything here make you stop and doubt? What was it?
4. If someone else did this step and got it wrong, how would you catch it?
5. If this step went wrong, could it be undone? Is this a step only you may decide?

Stop the walk when they reach the point where the job leaves their hands.

When they say "it depends", ask what it depended on in this case. When they skip ahead, go back to the gap. When they state a rule ("I always check X"), ask where in this case they did it. A rule with no instance in the case is noted as stated, not as a step.

## Read it back

Replay the job to them as numbered steps, in their words. Ask what is missing and what is wrong. Repeat until they say it is right.

If a second finished case is at hand, check the steps against it. A step that did not happen there is either a branch, which you write as a condition, or specific to the first case, which you remove.

## Write it

1. Write the playbook from [`../yolo-mode/playbooks/_template.md`](../yolo-mode/playbooks/_template.md), following the **Authoring or modifying a skill** playbook. One action per step. Mark any step you inferred and they did not say with `(inferred)`, and ask about each before finishing.
2. Sort what else the walk produced:
   - Answers to question 5 go to them as proposed additions to the Autonomy lists in the **yolo-mode** skill.
   - What they checked a result against, from questions 2 and 4, goes to them as the proposed "real thing" for the **principle-prove-it** skill.
   - Each doubt from question 3, and each stated rule, becomes one entry in `corrections.md` at the project root, with the case it came from. These are single occurrences. They are not principles yet. The **reflect** skill counts them later.
3. Add the playbook's line to the Playbooks section of the **yolo-mode** skill and run `node scripts/check-refs.mjs` from the **yolo-mode** skill's folder.

Do not write a principle in this skill. One case is one occurrence.

**Reply:** the playbook's path and its steps, the proposed Autonomy and "real thing" additions awaiting their decision, the entries added to `corrections.md`, and every step still marked `(inferred)`.
