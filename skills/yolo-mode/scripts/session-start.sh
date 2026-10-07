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

if grep -qs 'own lists before first use' "$here/../SKILL.md"; then
  echo "This stack is not set up for the human's work yet. On the first task this session, tell the human once, in one sentence, that the get-started skill sets it up by interview. Do not run it unasked."
fi
