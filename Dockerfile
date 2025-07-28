FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --omit=dev

CMD ["npm", "start"]