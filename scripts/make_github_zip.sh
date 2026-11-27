#!/usr/bin/env bash
# Build the GitHub-ready source zip for the portfolio repo.
# Source only: no node_modules, .next, .env, backups, upload, skills,
# sandbox scripts/docs. Output: download/zafarullah-portfolio-github.zip
set -euo pipefail
cd /home/z/my-project

ZIP=download/zafarullah-portfolio-github.zip
rm -f "$ZIP"

FILES=(
  README.md
  .env.example
  .gitignore
  package.json
  bun.lock
  components.json
  eslint.config.mjs
  next.config.ts
  next-env.d.ts
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
  Caddyfile
  prisma/schema.prisma
)

# fail loudly if any required file is missing (zip would silently skip it)
for f in "${FILES[@]}"; do
  [ -f "$f" ] || { echo "MISSING FILE: $f"; exit 1; }
done

DIRS=(
  src
  public
  scripts
)

# deterministic-ish listing for verification
zip -q "$ZIP" "${FILES[@]}"
zip -rq "$ZIP" "${DIRS[@]}" \
  -x "src/lib/generated/*" "*/node_modules/*"

echo "=== zip contents ==="
unzip -l "$ZIP" | tail -3
echo "=== sanity: no forbidden entries ==="
if unzip -l "$ZIP" | awk 'NR>3 && $4 != "" {print $4}' | grep -E "node_modules|^\.next/|/\.env$|^\.env$|^backups/|^upload/|^skills/|^download/|^worklog|^\.zscripts|^examples|^mini-services|^tests/|^db/|^backup/"; then
  echo "FORBIDDEN ENTRY FOUND — ABORT"; exit 1
else
  echo "clean"
fi
ls -la "$ZIP"
