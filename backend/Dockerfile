FROM node:18

RUN mkdir /backend

RUN apt-get update && apt-get install -y postgresql postgresql-client
COPY package*.json ./
RUN npm install

COPY . ./backend
COPY . init.sql
WORKDIR /backend

EXPOSE 4000

CMD [ "node", "server.js" ]