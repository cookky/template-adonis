FROM node:latest

WORKDIR /src

COPY package.json ./

RUN yarn

COPY . .

RUN yarn global add nodemon

EXPOSE 80
CMD [ "nodemon", "server.js" ]
