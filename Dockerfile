FROM node:22.13.1-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.13.1-alpine
WORKDIR /app

RUN echo "VITE_API_URL='http://localhost:8000'" > .env

COPY --from=builder /app/dist ./dist
EXPOSE 4173

CMD ["npx", "vite", "preview", "--host", "--port", "4173"]
