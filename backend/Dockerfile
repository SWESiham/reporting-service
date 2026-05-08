FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node typescript

EXPOSE 4000

CMD ["npm", "start"]