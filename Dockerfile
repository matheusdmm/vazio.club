# ── build stage ───────────────────────────────────────────────────────────────
FROM oven/bun:alpine AS build

WORKDIR /app
COPY tsconfig.json ./
COPY src/ ./src/
RUN bun build src/app.ts --outfile src/app.js

# ── serve stage ───────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY nginx.conf          /etc/nginx/conf.d/default.conf
COPY src/index.html      /usr/share/nginx/html/
COPY src/style.css       /usr/share/nginx/html/
COPY src/tangerine.svg   /usr/share/nginx/html/
COPY --from=build /app/src/app.js /usr/share/nginx/html/

EXPOSE 80
