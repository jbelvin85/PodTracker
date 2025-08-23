FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-slim AS runner
WORKDIR /app

# Install dependencies required by Prisma and the migration script
RUN apt-get update && apt-get install -y -q openssl netcat-traditional && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY .env ./

# Copy and prepare the migration script
COPY migrate.sh ./migrate.sh
RUN chmod +x ./migrate.sh

EXPOSE 3000
CMD ["npm", "start"]
