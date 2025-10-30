FROM node:20-alpine AS builder 

#simplify some stuff
ENV CI="true"

RUN corepack enable

WORKDIR /app

COPY . .
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile

RUN ls -la /app

RUN pnpm prisma generate 

RUN pnpm run build

EXPOSE 8080