#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/etax}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

echo "==> Pulling latest from $BRANCH"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> Installing dependencies"
npm ci --legacy-peer-deps || npm install --legacy-peer-deps

echo "==> Building"
npm run build

echo "==> Syncing static + public into standalone bundle"
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

echo "==> Restarting PM2 process"
pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js

echo "==> Done."
