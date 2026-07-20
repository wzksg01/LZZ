FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/config ./config

ENV NODE_ENV=production

EXPOSE 18789

CMD ["node", "dist/gateway/server.js"]
