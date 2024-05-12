FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 55455

CMD npm run start
