# Personal mode template

The person's own stack lives in `~/.yolo-stack/`, outside the plugin, so a plugin update never erases it.

```
~/.yolo-stack/
├── mode.md            # the lists and the two indexes, from the block below
├── playbooks/         # one file per recurring job, from ../playbooks/_template.md
└── principles/        # one file per rule, from principle-template.md
```

Copy the block below to `~/.yolo-stack/mode.md` and fill every part in the person's own words and language. Delete a placeholder line that has no content yet. Leave no `<...>` behind.

```markdown
# <Name>'s stack

<One line: the work this person does.>

## Autonomy

**Just do it.**
- <Work the agent does without asking.>

**Always pause.**
- <Work that waits for the person every time.>

## Real things

- <What a claim is checked against in this work: the record, the document, the system.>

## Playbooks

- **<Name of the job>.** <When it applies.> `playbooks/<stem>.md`.

## Principles

- **<Title>.** <When it applies.> `principles/<kebab-name>.md`.
```

## Rules for the parts

- **Autonomy** adds to the lists in the **yolo-mode** skill. It never removes an entry from Always pause there.
- **Real things** is the list the **principle-prove-it** skill checks against.
- **Playbooks** and **Principles** hold one line per file. A file with no line is never opened.

After any change, run `node tools/check-refs.mjs --personal` from the stack root.
