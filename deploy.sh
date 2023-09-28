#!/usr/bin/env bash

set -e

host=nsbkvm.tail80360.ts.net

nx run strangereal-api:build
nx run strangereal-frontend:build

rsync -r ./dist/apps/strangereal-api $host:/home/tacmap
ssh $host <<EOF
    sudo -iu tacmap
    npm i
    pm2 restart ecosystem.config.js
EOF
