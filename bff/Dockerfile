FROM node:20
WORKDIR /home/node/app/bff

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]