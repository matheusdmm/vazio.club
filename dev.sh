#!/usr/bin/env bash
set -e

trap 'kill 0' EXIT

bun build app.ts --outfile app.js --watch &
bunx serve . -p 3000 &

wait
