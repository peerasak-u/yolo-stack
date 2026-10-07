# File and version history

How the item itself changed over time. Other documents that explain it belong to the documents investigator.

## What this source contains

- Saved versions. The version history kept by the app or the drive, or sibling copies told apart by dates and suffixes (`v2`, `final`, `old`)
- Tracked changes, margin comments, and cell notes
- File details: created and modified dates, author, last editor
- Revision tables and change logs inside the document
- Other files in the same folder, and archive folders
- Git history, if the folder is a git repository

Always available, and tied directly to the item.

## How to search it

1. **List the folder by modified time**, archive folders included. Group the files that are versions of one item.
2. **Compare adjacent versions.** Find the version where the item first appears or changes. Record its date and editor.
3. **Read what sits next to the item.** Comments, tracked changes, cell notes, revision table entries.
4. **Search the folder tree** for the key terms and reference IDs from the anchor.
5. **If the folder is a git repository**, read `git log --follow -p -- <file>` and `git log -S '<exact text>'`. Read each commit message in full. If the remote hosts review discussion, pull it with `gh pr view <number> --json title,body,comments,reviews`.

## What good evidence looks like here

- A comment or tracked change next to the item that states a reason
- A revision table entry that names what changed and who asked for it
- A version note or commit message that names a ticket, a person, or an event
- A version saved right after a dated event. Circumstantial, so label it

## Common pitfalls

- **Modified dates mislead.** Copying, syncing, or re-saving resets them. Prefer dates in the version history or written inside the document.
- **File names prove nothing.** A file named `final` may not be the one that was sent. Check what went out.
- **Version history expires.** If nothing exists before a certain date, that is a gap, not a null result. Name it.
- **Copied text.** The author may have copied a clause or formula from a template without knowing its reason. Find where it first appeared and investigate that.
- **Treating the item as evidence of intent.** What the item says isn't evidence for why it exists.

## What to return

Every version, comment, or note that bears on the question, with:
- The exact text (quoted)
- The file path and version, or the commit hash
- Author or editor, and date
- Whether it's direct (explicitly addresses the question) or circumstantial
