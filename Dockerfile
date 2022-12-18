# syntax=docker/dockerfile:1

FROM node:16.13.0

ENV NODE_ENV=development

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["npm", "run", "build"]