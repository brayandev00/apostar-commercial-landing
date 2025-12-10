FROM node:24.11.1-alpine3.21 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk add --no-cache git

FROM base AS packages-install

COPY --chown=node:node [ \
  "./package.json", \
  "./pnpm-lock.yaml", \
  "/app/" \
  ]

WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM packages-install AS packages-copy

USER root

FROM packages-copy AS build-main

COPY --chown=node:node [ \
  "./package.json", \
  "./astro.config.mjs", \
  "./tsconfig.json", \
  "./tailwind.config.mjs", \
  "/app/" \
  ]

COPY --chown=node:node [ \
  "./public", \
  "/app/public" \
  ]

COPY --chown=node:node [ \
  "./src", \
  "/app/src" \
  ]

WORKDIR /app



RUN pnpm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD [ "node", "./dist/server/entry.mjs" ]