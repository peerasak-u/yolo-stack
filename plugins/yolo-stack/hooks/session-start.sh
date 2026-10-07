#!/bin/sh
set -eu

# Each runtime's hooks file passes its own name.
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

cat "${CLAUDE_PLUGIN_ROOT}/hooks/session-start-context.md"

# What the person taught lives outside the plugin, so an update never erases it.
home="$HOME/.yolo-stack"
if [ -f "$home/mode.md" ]; then
  echo "Personal stack: $home. Read $home/mode.md right after the yolo-mode skill."
else
  echo "Personal stack: none at $home yet. On the first task this session, tell the human once, in one sentence, that the get-started skill sets it up by interview. Do not run it unasked."
fi
