FROM node:lts-alpine

  
FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 8080

CMD npm start