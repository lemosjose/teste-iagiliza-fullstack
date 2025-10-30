FROM node:20-slim AS build


# prod case: use differente ARG
#ARG VITE_API_URL=http://<full_vps_ip>:<port>
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true

RUN corepack enable


COPY . /app
WORKDIR /app


RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]