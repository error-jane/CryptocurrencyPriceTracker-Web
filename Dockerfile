FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci 

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
