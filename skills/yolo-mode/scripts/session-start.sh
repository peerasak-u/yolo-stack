#!/bin/sh
set -eu

# The hook entry passes the runtime's name.
case "${1:-}" in
  claude) sheet="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/stack-models.md" ;;
  codex) sheet="${CODEX_HOME:-$HOME/.codex}/stack-models.md" ;;
  *)
    echo "session-start.sh: unknown runtime '${1:-}' (expected claude or codex)" >&2
    exit 2
    ;;
esac

if grep -qs '^session hook: off$' "$sheet"; then
  exit 0
fi

here="$(cd "$(dirname "$0")" && pwd)"
cat "$here/session-start-context.md"

if grep -Fxqs '<!-- get-started: pending -->' "$here/../SKILL.md"; then
  echo "No first job has been chosen for this stack yet. If the human asks how to start, the get-started skill offers help doing a job now or learning a method they already use. If they already ask for concrete work or teaching, follow that request directly. Do not interrupt it with onboarding or a permissions interview."
fi
