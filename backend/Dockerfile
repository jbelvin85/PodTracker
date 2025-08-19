# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build_output ./build_output
CMD ["tail", "-f", "/dev/null"]
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/auth.schema.ts ./auth.schema.ts
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001
CMD ["tail", "-f", "/dev/null"]