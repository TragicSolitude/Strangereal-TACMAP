#!/usr/bin/env bash

set -e

host=nsbkvm.tail80360.ts.net

# Workaround weird issue where platform-fastify is ignored from package.json if
# the nx cache isn't reset
nx reset
nx run strangereal-api:build
nx run strangereal-frontend:build

rsync -r ./dist/apps/strangereal-api/ $host:/home/tacmap/strangereal-api
ssh $host <<EOF
    sudo -iu tacmap
    npm i
    pm2 restart ecosystem.config.js
EOF
