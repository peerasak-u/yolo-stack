# Install yolo-stack

These steps are for the agent, not the human. The human pasted a prompt that pointed you here. Do the work yourself and ask them only what a step tells you to ask. Speak their language. They may not work with software, so say what you are doing in plain words and do not show them commands unless one fails.

The stack is a set of skill folders. Installing it means copying them into the skills folder your runtime reads, and adding one session hook. The stack then edits those copies as it learns.

## 1. Names

You should already have two answers from the prompt. If not, ask now, one question at a time.

- **Stack name.** Their own name for this stack, such as `acct`. It becomes `<stack>-stack`.
- **First mode name.** The name of the way of working it will hold, such as `audit`. It becomes `<mode>-mode`.

Each name is lowercase letters and digits and starts with a letter. Turn what they say into that form and read it back. If they have no preference, use `yolo` for both.

## 2. Where it goes

Install into the work folder this session is open in. That keeps the stack with the work it is for, and lets another folder hold a different stack.

Install for every folder only if the human asked for that, by adding `--scope user` in step 3. One user-level stack fits on a machine, because skill names are not prefixed.

## 3. Run the installer

Decide which runtime you are from your own system context. Do not ask the human. Then, from the work folder, with `<source>` as the folder this file is in:

```shell
node <source>/skills/yolo-mode/scripts/install.mjs --runtime <claude|codex> --stack <stack> --mode <mode>
```

| Runtime | Skills go to | Hook goes to |
|---|---|---|
| Claude Code | `.claude/skills/` | `.claude/settings.json` |
| Codex | `.agents/skills/` | `.codex/hooks.json` |

With `--scope user` the same paths are under the home folder.

The installer stops without writing anything when a skill of the same name is already there. Tell the human which names collided and ask what to do. Never delete a skill to make room.

If the other runtime already has this stack in the same place, the installer links to it, so both runtimes share one copy.

If `node` is missing, say so and stop. The stack's own checks need it too.

## 4. Check

The installer ends by running the stack's checker. Its last lines must be `ok: ...` and `installed ...`. Then delete the `<source>` folder if you cloned it to a temporary place.

On Codex, tell the human that Codex will ask them to trust the hook through `/hooks`. The Codex path has not been run in a live Codex session by the stack's author. Confirm that a skill opens. If the hook does not run, add one line to `AGENTS.md` in the work folder that says to route multi-step work through the `<mode>-mode` skill, and report that the hook was replaced by that line.

## 5. Hand over

Tell the human, in their language:

- that the stack is in this folder, and everything they teach is saved here
- to start a new session in this folder, then say "get started" or the same in their language
- what did not work, if anything

Do not run `get-started` in this session. The skills load in the next one.
