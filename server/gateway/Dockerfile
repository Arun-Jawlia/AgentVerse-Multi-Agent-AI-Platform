FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./gateway/package*.json ./gateway/ 

RUN cd gateway && npm ci

# Source Code
COPY gateway ./gateway

COPY shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD [ "npm", "start" ]