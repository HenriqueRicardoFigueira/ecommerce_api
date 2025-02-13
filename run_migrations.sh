#!/bin/bash
echo "Rodando migrations no serviço Checkout..."
docker exec checkout npx prisma migrate deploy

echo "Rodando migrations no serviço Payments..."
docker exec payments npx prisma migrate deploy

echo "✅ Migrations concluídas!"
