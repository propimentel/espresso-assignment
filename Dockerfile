FROM node:18-alpine3.17 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Use 'serve' to serve the static files
FROM node:18-alpine3.17

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY package*.json ./
RUN npm install serve -g

EXPOSE 5000 

CMD ["serve", "-s", "dist", "-l", "5000"]
