---
name: get-started
description: "Help a person start with one real job: help them do it now, or capture a method they already use. Use for /get-started, 'set me up', 'how do I start', 'เริ่มใช้', or 'เริ่มยังไง'. A task already asking for execution or teaching goes directly to the matching skill."
---

# Get started

Start with the work they want help with. Choose between doing that work now and learning a method they already use.

Speak their language. Describe the two paths in everyday words, without skill names. Ask one question at a time. Use what they already told you instead of asking again.

Do not open with an interview about permissions, actions that cannot be undone, or what counts as proof. Understand the job first. Keep any boundaries they volunteered and pass them to the next skill.

## Find the first job

Read the **yolo-mode** skill for existing boundaries, preferences, and playbooks. Keep what they have already taught.

If they have not named a job, ask "What would you like help with first?" In Thai: "อยากให้ช่วยงานอะไรเป็นอย่างแรก?" Ask only for the missing context needed to identify that job.

## Choose the path

If their intent is clear, take that path. Otherwise ask whether they want help doing this job now or want to teach a method they already use. In Thai: "งานนี้อยากให้ช่วยลงมือทำเลย หรือมีวิธีทำอยู่แล้วและอยากสอนให้ทำตาม?"

- **Do the work now.** Use an existing playbook if one fits. Otherwise hand a multi-step or unfamiliar job to the **figure-it-out** skill. A small, clear task proceeds directly under the mode's rules. Ask for the material needed for this job, not a finished example from an earlier job.
- **Teach an existing method.** Hand the job to the **capture-playbook** skill with one real finished case. If they have no case at hand, say what to bring. They can choose to do current work now instead; do not switch paths for them.

## Hand over

Pass the job, its available material, and any stated boundaries to the selected skill. Once a concrete job is ready to start, replace `<!-- get-started: pending -->` with `<!-- get-started: started -->` in the **yolo-mode** skill. If you changed that file, run `node scripts/check-refs.mjs` from its folder. Do not treat this marker as permission to perform the job's actions.

The selected skill learns what the agent may do and which decisions belong to the human while working through actual steps. Ask at a relevant step, in the words of that job, such as "I can prepare this payment list. Who decides which payments to approve?" Record confirmed boundaries in the mode's Autonomy section, with their job context. Identify the records used to check this job through the **principle-prove-it** skill. Neither is a prerequisite interview.

**Reply:** the first job and the next action, or the specific material needed to begin.
