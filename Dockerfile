FROM node:lts-alpine

  
FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 8282

CMD npm start
