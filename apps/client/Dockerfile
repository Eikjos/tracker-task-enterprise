FROM --platform=linux/amd64 node:lts-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo pnpm
COPY . .
RUN npx turbo prune --scope=client --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM builder AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --force
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=client...
 
FROM node:lts-alpine AS runner
WORKDIR /app

COPY --from=installer /app/apps/client/package.json .

EXPOSE 3000
 
CMD node apps/client/dist/main.js