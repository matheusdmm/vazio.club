# ── build stage ───────────────────────────────────────────────────────────────
FROM oven/bun:alpine AS build

WORKDIR /app
COPY tsconfig.json app.ts ./
RUN bun build app.ts --outfile app.js

# ── serve stage ───────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY nginx.conf  /etc/nginx/conf.d/default.conf
COPY index.html  /usr/share/nginx/html/
COPY style.css   /usr/share/nginx/html/
COPY --from=build /app/app.js /usr/share/nginx/html/

EXPOSE 80
