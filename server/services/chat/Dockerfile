FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./services/chat/package*.json ./services/chat/

RUN cd services/chat && npm ci

COPY services/chat ./services/chat

COPY shared ./shared

WORKDIR /app/services/chat

EXPOSE 8002

CMD [ "npm", "start" ]