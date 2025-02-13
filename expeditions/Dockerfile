FROM node:20-slim
WORKDIR /home/node/app/expeditions

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate


CMD ["npm", "run", "start:dev"]