FROM node:20-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /home/node/app/bff

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]