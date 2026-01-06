#!/bin/bash
set -e

# 1. Build у main
git checkout main
npm run build

# 2. Тимчасова папка
rm -rf .deploy_tmp
mkdir .deploy_tmp
cp -R out/* .deploy_tmp/

# 3. Перехід у deploy
git checkout deploy

# 4. Очистити ВСЕ, КРІМ .git
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +

# 5. Скопіювати static
cp -R .deploy_tmp/* .

# 6. Коміт і push
git add .
git commit -m "deploy static" || echo "Nothing to commit"
git push origin deploy

# 7. Cleanup і назад у main
rm -rf .deploy_tmp
git checkout main
