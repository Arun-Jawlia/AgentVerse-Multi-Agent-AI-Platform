FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./services/billing/package*.json ./services/billing/

RUN cd services/billing && npm ci

COPY services/billing ./services/billing

COPY shared ./shared

WORKDIR /app/services/billing

EXPOSE 8004

CMD [ "npm", "start" ]