FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app/checkout

COPY package*.json ./
RUN npm install


COPY . .

RUN npx prisma generate


CMD ["npm", "run", "start:dev"]