#!/bin/bash
set -e

echo "▶ Build static site"

# 1. Go to main
git checkout main

# 2. Clean & build
rm -rf out
npm ci
npm run build

# 3. Safety check
if [ ! -d "out" ]; then
  echo "❌ out/ folder not found. Build failed."
  exit 1
fi

if [ ! -f "out/index.html" ]; then
  echo "❌ index.html not generated."
  exit 1
fi

echo "✔ Build OK"

# 4. Prepare temp
rm -rf .deploy_tmp
mkdir .deploy_tmp
cp -R out/. .deploy_tmp/

# 5. Switch to deploy
git checkout deploy

# 6. Clean branch (keep .git)
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +

# 7. Copy static
cp -R .deploy_tmp/. .

# 8. Commit & push
git add .
git commit -m "deploy static $(date '+%Y-%m-%d %H:%M')" || echo "Nothing to commit"
git push origin deploy

# 9. Cleanup
rm -rf .deploy_tmp
git checkout main

echo "🚀 Deploy finished"
