#!/bin/bash

echo "Rodando migrations no serviço Checkout..."
docker exec checkout npx prisma migrate deploy
docker exec checkout npx prisma generate

echo "Rodando migrations no serviço Payments..."
docker exec payments npx prisma migrate deploy
docker exec payments npx prisma generate

echo "Rodando migrations no serviço Expeditions..."
docker exec expeditions npx prisma migrate deploy
docker exec expeditions npx prisma generate

echo "✅ Migrations concluídas!"
