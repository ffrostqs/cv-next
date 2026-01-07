#!/bin/bash
set -e

# =========================
# CONFIG
# =========================
MAIN_BRANCH="main"
DEPLOY_BRANCH="deploy"
TMP_DIR="/tmp/cv-next-deploy"

echo "▶ Starting deploy"

# =========================
# 1. Ensure clean working tree
# =========================
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working tree is not clean."
  echo "Commit or stash changes first."
  exit 1
fi

# =========================
# 2. Checkout main
# =========================
git checkout "$MAIN_BRANCH"

echo "▶ Building static site"

# =========================
# 3. Clean & build
# =========================
rm -rf .next out
npm ci
npm run build

# =========================
# 4. Safety checks
# =========================
if [ ! -d "out" ]; then
  echo "❌ out/ directory not found"
  exit 1
fi

if [ ! -f "out/index.html" ]; then
  echo "❌ index.html not found in out/"
  exit 1
fi

echo "✔ Build OK"

# =========================
# 5. Prepare clean temp dir (outside git)
# =========================
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cp -R out/. "$TMP_DIR/"

# =========================
# 6. Checkout deploy (or create orphan)
# =========================
if git show-ref --verify --quiet refs/heads/"$DEPLOY_BRANCH"; then
  git checkout "$DEPLOY_BRANCH"
else
  git checkout --orphan "$DEPLOY_BRANCH"
fi

# =========================
# 7. Hard clean deploy branch (keep .git)
# =========================
rm -rf *

# =========================
# 8. Copy static files
# =========================
cp -R "$TMP_DIR/." .

# =========================
# 9. Commit & push
# =========================
git add .
git commit -m "deploy static $(date '+%Y-%m-%d %H:%M')" || echo "Nothing to commit"
git push -f origin "$DEPLOY_BRANCH"

# =========================
# 10. Return to main
# =========================
git checkout "$MAIN_BRANCH"

echo "🚀 Deploy finished successfully"
