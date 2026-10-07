# Tracker or ticket system

## What this source contains

- Tickets, tasks, cases, or requests that describe work and its motivation
- Parent and child relationships (a broad initiative, then specific tasks)
- Comments (clarifications, scope changes, the stated reason)
- Labels and categories that signal the type of motivation
- Status history and due dates
- Attachments and links

The tracker is where the request behind the work often lives: who asked, for whom, and by when.

## How to search it

1. **Start with linked tickets.** If the anchor carries reference IDs, fetch those first. Read each in full, comments included.
2. **Search by keyword** for the item's name and the key terms. Try several phrasings.
3. **Walk up the tree.** If you land on a child task, fetch its parent. The parent often carries the reason.
4. **Read attached documents** on the ticket and on its project.
5. **Check labels and due dates.** A deadline often reveals the motivation.

## What good evidence looks like here

- A description stating the problem: "Customer Acme needs X for their audit"
- A comment recording a decision: "We went with B because A would need a new contract"
- A parent ticket titled like an initiative
- An attached brief or specification

## Common pitfalls

- **Scope drift.** A ticket may have been closed and reopened with a different scope. Read the whole history.
- **Template filler.** Generic text ("improve customer experience") is probably not a real answer.
- **Stale tickets.** Old tickets reflect a plan that may have changed. Cross-check dates against when the item changed.
- **Closed-as-duplicate chains.** Follow them back to the original ticket.
- **Restricted tickets.** If you can't open one, note that as a gap. Don't guess.

## What to return

For each relevant ticket:
- Ticket ID and title
- The motivation quoted from the description or comments
- Labels, parent, project
- Author, created date, closed date
- Link if available
