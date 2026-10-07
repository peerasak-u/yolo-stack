---
name: get-started
description: "Set this stack up for one person's work by interview: what the agent may do without asking, what always waits for them, what counts as proof in their work, and their first recurring job. Use for /get-started, 'set me up', 'how do I start', 'เริ่มใช้', 'เริ่มยังไง', or when the session hook reports the stack is not set up."
---

# Get started

Fill this stack with one person's rules by asking, so they never open a file. What they tell you is written into the stack's own skills.

They may not work with software. Speak their language, and write their rules in it. Say "the steps for a job" before you say playbook, and "a rule you want me to keep" before you say principle. Ask one question, wait for the answer, then ask the next. They should not type more than a sentence at a time.

Ask about things that happened, not about policy. "What would you never let an assistant do?" gets a textbook answer. "What was the last thing you sent that you could not take back?" gets theirs. Do not offer a list to pick from. A suggested answer gets agreement, and agreement is not how they work.

## Before you start

Read the Autonomy section of the **yolo-mode** skill. If its lists are already theirs, read them back, ask what has changed, and edit only that.

## The interview

1. **The work.** "What is your job, and what do you do every week that you would hand to an assistant?" Keep the list of jobs.
2. **What always waits for them.** "Think of the last time something left your hands and could not be taken back. What was it?" Ask again until they run out. Then read them the Always pause examples in the **yolo-mode** skill and ask which hold in their work.
3. **What needs no permission.** "A new assistant starts tomorrow. What do you let them do on day one without checking with you?"
4. **What counts as proof.** "When an assistant gives you a number or a fact, what do you open to check it?" Each answer names a real thing: a system, a record, a signed document.

## Write it

1. In the Autonomy section of the **yolo-mode** skill, replace the example lists with their answers to questions 2 and 3, and delete the line that says to replace them.
2. In step 1 of the Pattern in the **principle-prove-it** skill, replace the last sentence with their answers to question 4.
3. Under Writing the reply in the **yolo-mode** skill, set the language they answered in, and add any preference they stated without being asked.
4. Read all of it back in plain words and fix it until they say it is right.
5. Run `node scripts/check-refs.mjs` from the **yolo-mode** skill's folder. It must print `ok`.
6. Pick the first job. From the list in question 1, take the one they do most often and have a finished case of at hand. Hand that job to the **capture-playbook** skill. With no finished case at hand, stop here and tell them what to bring next time.

**Reply:** the lists as written, the job chosen for the first playbook, and what they should bring if the capture did not start.
