#!/usr/bin/env bash
set -e

trap 'kill 0' EXIT

bun build src/app.ts --outfile src/app.js --watch &
bunx serve src -p 3000 &

wait
