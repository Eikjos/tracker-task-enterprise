FROM node:lts-alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN npm install --frozen-lockfile
RUN npx psrisma generate 


FROM node:lts-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN npx turbo run build --scope=api --include-dependencies --no-deps

FROM node:lts-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
CMD [ "node", "apps/api/dist/main.js" ]