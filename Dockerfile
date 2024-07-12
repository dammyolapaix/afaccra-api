# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /usr/src/afaccra/api

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 2222

CMD [ "npm", "run", "start" ]
