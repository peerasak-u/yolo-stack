---
name: yolo-update
description: "Bring this stack's shipped skills, principles, and playbooks up to date from the repository it was installed from, and merge them with what the human has taught it since. Use for /yolo-update, 'update the stack', 'get the latest version', 'อัปเดต stack', or 'มีของใหม่ไหม'."
---

# Update the stack

On Codex, read the [platform mapping](../yolo-mode/references/codex-tools.md) before following this skill.

Take what is new upstream without losing anything the human taught. The script in the **yolo-mode** skill's folder does the part that needs no judgment. You do the rest.

The script compares three versions of every shipped file: the one installed, the one upstream has now, and yours. A file only the human has, such as a playbook or principle that the **reflect** skill wrote, is never touched.

## Steps

1. Read `UPSTREAM` in the **yolo-mode** skill's folder. It names the source repository and the commit this stack started from.
2. Clone the source to a temporary folder with its full history. A shallow clone cannot show the starting commit.
3. Run `node scripts/update.mjs --source <clone>` from the **yolo-mode** skill's folder. It prints the plan and writes nothing.
4. Tell the human what the plan means in plain words: which skills change, which are new, and how many places they and upstream both changed. Say that nothing they taught is removed. Wait for their go-ahead. With nothing to update, say so and stop.
5. Run it again with `--apply`. It copies the stack as it was to a backup folder first and prints the path. Then it writes every change that does not conflict.
6. Resolve each conflict by editing the human's file, following the rules below. Their file is unchanged until you edit it. The script prints the folder that holds the other versions.
7. Run it again with `--finish`. Then run `node scripts/check-refs.mjs` from the same folder. It must print `ok`.
8. Delete the temporary clone. Keep the backup until the human has used the stack in a new session and says it works.

## Resolving a conflict

Open the three versions and decide by what the lines are.

- **What the human taught wins.** Their Autonomy lists, their reply preferences, their real things, their playbooks, their principles, and any Evidence line with their cases.
- **Upstream wins on mechanism.** The steps of a shipped skill, a script, the wording of a shipped trigger.
- **An index keeps both.** In Triggers, Principles, and Playbooks, keep every line from both sides.
- **A seed the human rewrote or removed stays as they left it.** Do not bring back a principle they deleted. Mention the upstream change in the reply.
- **A new upstream skill whose name they already use** is not installed. Say so, and ask.
- **You cannot tell.** Keep the human's version and list it for them.

Write the resolved file whole. Never leave merge markers in a skill.

**Reply:** what was updated, what is new, each conflict and how you resolved it, anything left for the human to decide, and the backup path. Tell them the changes load in the next session.
