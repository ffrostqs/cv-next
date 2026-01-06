#!/bin/bash
npm run build || exit 1

git checkout deploy
rm -rf *
cp -R out/* .
git add .
git commit -m "deploy"
git push origin deploy

git checkout main
