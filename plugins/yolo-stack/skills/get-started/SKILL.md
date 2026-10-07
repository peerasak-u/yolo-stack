---
name: get-started
description: "Set up a person's own stack by interview: what the agent may do without asking, what always waits for them, what counts as proof in their work, and their first recurring job. Use for /get-started, 'set me up', 'how do I start', 'เริ่มใช้', or when the session hook reports no personal stack."
---

# Get started

Fill a person's own stack by asking, so they never open a file. What they tell you goes to `~/.yolo-stack/`, laid out in [`../yolo-mode/references/mode-template.md`](../yolo-mode/references/mode-template.md).

They may not work with software. Speak their language, and write their files in it. Say "the steps for a job" before you say playbook, and "a rule you want me to keep" before you say principle. Ask one question, wait for the answer, then ask the next. They should not type more than a sentence at a time.

Ask about things that happened, not about policy. "What would you never let an assistant do?" gets a textbook answer. "What was the last thing you sent that you could not take back?" gets theirs. Do not offer a list to pick from. A suggested answer gets agreement, and agreement is not how they work.

## Before you start

Read `~/.yolo-stack/mode.md` if it exists. A filled stack is not overwritten. Read it back to them, ask what has changed, and edit only that.

## The interview

1. **The work.** "What is your job, and what do you do every week that you would hand to an assistant?" Keep the one-line answer and the list of jobs.
2. **What always waits for them.** "Think of the last time something left your hands and could not be taken back. What was it?" Ask again until they run out. Then read them the Always pause list in the **yolo-mode** skill and ask what in their work it misses.
3. **What needs no permission.** "A new assistant starts tomorrow. What do you let them do on day one without checking with you?"
4. **What counts as proof.** "When an assistant gives you a number or a fact, what do you open to check it?" Each answer names a real thing: a system, a record, a signed document.

## Write it

1. Write `~/.yolo-stack/mode.md` from the template. Answers to question 2 go under Always pause, question 3 under Just do it, question 4 under Real things. Delete the placeholder lines under Playbooks and Principles.
2. Read it back in plain words and fix it until they say it is right.
3. Run `node tools/check-refs.mjs --personal` from the stack root. It must print `ok`.
4. Pick the first job. From the list in question 1, take the one they do most often and have a finished case of at hand. Hand that job to the **capture-playbook** skill. With no finished case at hand, stop here and tell them what to bring next time.

Never write what they told you into the plugin folder. A plugin update erases it.

**Reply:** the path of their stack, the three lists as written, the job chosen for the first playbook, and what they should bring if the capture did not start.
