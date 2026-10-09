# Codex tool mapping

These skills are written in Claude Code tool language (the `Skill` tool, the `Agent` tool, `AskUserQuestion`, Claude model names). On Codex the skills are the same files. Only the tool names resolve differently. This file is Codex-specific.

## Tool actions

| Claude action | Codex equivalent |
|---------------|------------------|
| Read a file | `shell` (`cat`, `head`, `tail`) |
| Create / edit / delete a file | `apply_patch` |
| Run a shell command | `shell` |
| Search file contents / find files | `shell` (`rg`, `grep`, `find`, `ls`) |
| Invoke a skill (the `Skill` tool, `/command`) | Skills load natively. Follow the instructions presented. |
| Dispatch a subagent (the `Agent` tool) | `spawn_agent` |
| Dispatch N parallel subagents in one turn | N `spawn_agent` calls in one response |
| Wait for a subagent result | `wait_agent` |
| Track tasks (the todolist) | `update_plan` |
| Ask the human a fixed-choice question (`AskUserQuestion`) | Ask in plain text and let the user answer. |

Subagent dispatch needs `multi_agent` enabled in `~/.codex/config.toml`:

```toml
[features]
multi_agent = true
```

Without it, the fan-out skills (`interrogate`, `why`, `arena`, `swarm`, `reflect`) degrade to a single sequential pass.

## Model names

Each fan-out skill lists Claude defaults in its Models section. These slugs do not resolve on Codex. Substitute your configured Codex models, using the `codex` block of `models.json` in the **yolo-mode** skill's folder as the default. A panel's signal comes from model diversity, so use distinct models. If only one family is reachable, say in the verdict that diversity was reduced.

## Per-skill notes

| Skill | On Codex |
|-------|----------|
| `reflect` | The three reviewers and the synthesizer map to `spawn_agent`. The transcript finder reads Claude Code's layout under `~/.claude/projects/`, so pass the session digest that step 1 allows instead. |
| `recall`, `automate-me` | Transcript paths in the skill are Claude Code's. Point the mining at your runtime's transcript directory. |
| `why` | A category is available through an MCP server Codex exposes to the session, a skill, or an export on disk. |
| `get-started`, `capture-playbook`, `setup-yolo-stack`, `automate-me` | Ask each question in plain text, one at a time. `get-started` offers doing work now or teaching an existing method. |
| `setup-yolo-stack` | The sheet is `~/.codex/stack-models.md`. Paste its model rows into `AGENTS.md`. |
| `interrogate`, `arena`, `swarm` | Each reviewer, candidate, or worker is one `spawn_agent` call. Give each writer its own output directory. |

## Session hook and instructions file

The installer adds the stack's `SessionStart` hook to `.codex/hooks.json`, and Codex runs it after the user trusts it through `/hooks`. If the hook does not run, add a standing line to `AGENTS.md` that routes work through the **yolo-mode** skill, and check yourself at the start of a task whether the Autonomy section of the mode skill still holds its placeholder line.

Where a skill says "your instructions file", on Codex that is `AGENTS.md`. On Claude Code it is `CLAUDE.md`.
