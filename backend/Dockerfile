FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./backend/prisma ./prisma
COPY ./tsconfig.json .
COPY ./auth.schema.ts .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/index.js"]