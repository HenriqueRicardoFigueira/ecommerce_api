FROM node:20
WORKDIR /home/node/app/expeditions

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate


CMD ["npm", "run", "start:dev"]