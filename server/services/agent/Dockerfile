FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./services/agent/package*.json ./services/agent/

RUN cd services/agent && npm ci

COPY services/agent ./services/agent

COPY shared ./shared

WORKDIR /app/services/agent

EXPOSE 8003

CMD [ "npm", "start" ]