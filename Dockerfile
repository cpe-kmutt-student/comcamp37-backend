
FROM node:22-bullseye

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm tsx ts-node nodemon

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]