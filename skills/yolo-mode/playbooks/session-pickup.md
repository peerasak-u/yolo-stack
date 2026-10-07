### Session pickup

**You own the resume point. Read the prior trail, don't redo it.**

1. Locate the prior trail. Read the decision log first if the prior run kept one (the **show-me-your-work** skill). Otherwise use a local transcript under Claude Code's per-project transcripts directory at `~/.claude/projects/<encoded-cwd>/*.jsonl`, where `<encoded-cwd>` is the workspace cwd with `/` → `-`. Do not glob across other directories under `~/.claude/projects/`. That crosses workspace boundaries and reads private chats from unrelated projects. Read the last messages first, then scan back for the decision points. Parse a long transcript in a subagent and keep the reduced timeline in the main thread.
2. Reconstruct operational state. What already exists on disk, the open todos, the decisions made. Use the prior trail to recover progress. For claims about human rulings, follow [Claims about human decisions](../../why/references/epistemics.md#claims-about-human-decisions). An agent summary is not the original ruling.
3. Diff done vs pending. Compare what was finished against what was planned, name the resume point, and do not redo completed work. Recheck claims that affect the remaining work without repeating completed investigations.
4. Route the remaining work to the matching playbook and pick the verdict: continue the execution, hand over a finished recommendation, ratify or override a prior conclusion, or postmortem a failed run. The pickup playbook ends here. The routed playbook owns the rest.
5. Verify the inherited claims against the original goal on the real artifact (the **principle-prove-it** skill). A passing prior self-report is not the proof.

**Reply:** where the prior agent stopped, what you inherited vs redid (ideally nothing redone), the resume point, and the outcome.
