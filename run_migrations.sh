#!/bin/bash

echo "⏳ Aguardando os containers subirem..."
sleep 5 # Ajuste esse tempo se necessário, só pra garantir

echo "🚀 Rodando migrations no serviço BFF..."
docker exec bff npx prisma migrate deploy

echo "🚀 Rodando migrations no serviço Payments..."
docker exec payments npx prisma migrate deploy

echo "✅ Migrations concluídas!"
