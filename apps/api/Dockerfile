FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo pnpm
COPY . .
RUN cd apps/api && npx prisma generate
RUN npx turbo prune --scope=api --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM builder AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=api...
 
FROM node:alpine AS runner
WORKDIR /app

COPY --from=installer /app/apps/api/package.json .

EXPOSE 8080
 
CMD node apps/api/dist/main.js