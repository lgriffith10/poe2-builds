# Exile Codex: builds the Next.js app and serves it with `next start` on port 3000.
#   docker build -t exile-codex .
#   docker run --rm -p 3000:3000 exile-codex

FROM node:24-alpine AS base
WORKDIR /app
# pnpm at the version pinned in package.json ("packageManager").
RUN corepack enable

# Dependencies, cached as long as the lockfile does not change.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Not --frozen-lockfile: pnpm 12 wants to add its own "packageManagerDependencies" block to the lockfile;
# the package versions still come from pnpm-lock.yaml.
RUN pnpm install --no-frozen-lockfile

# Build: pages are prerendered from content/ and src/data/generated (committed, no network needed).
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3000
# next directly: pnpm (via corepack) was downloaded for root and would be fetched again for this user.
CMD ["node_modules/.bin/next", "start"]
