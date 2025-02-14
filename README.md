# Ecommerce API 🚀
![image](./new_arch.png)

Este repositório contém um projeto de arquitetura de microsserviços para um sistema de ecommerce, desenvolvido com **NestJS**, **Kafka**, **Prisma** e **MySQL**, utilizando **Docker**.

## 📦 Estrutura do Projeto

```
ecommerce_api/
│── .docker/                # Scripts e configurações do banco MySQL
│── bff/                    # Backend For Frontend (BFF) para consumir e orquestrar os serviços
│── checkout/               # Serviço responsável pela criação e consulta de pedidos
|── payments/               # Serviço responsável pelo processamento de pagamentos
│── expeditions/            # Serviço responsável pela gestão de expedições
│── docker-compose.yml      # Orquestração dos serviços Docker
│── README.md               # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js para construção de aplicações escaláveis
- **Kafka** - Plataforma de mensageria para comunicação assíncrona
- **Prisma ORM** - Gerenciador de banco de dados
- **MySQL** - Banco de dados relacional
- **Docker** - Containerização dos serviços

## 🚀 Executando o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados

### Rodar o Projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/HenriqueRicardoFigueira/ecommerce_api.git
    ```
2. Acesse o diretório do projeto:
    ```bash
    cd ecommerce_api
    ```
3. Execute o Docker Compose:
    ```bash
    docker-compose up --build
    ```
4. Execute o script abaixo para gerar as migrações:
  ```bash
    ./run_migrations
  ```

Isso irá iniciar os seguintes serviços:
- BFF rodando na porta **3003**
- Kafka e Zookeeper
- MySQL rodando na porta **3306**
- Serviço Checkout
- Control Center do Kafka na porta **9021**

## 🛒 Como Usar

### 🔹 Criar um Pedido

Faça uma requisição **POST** para criar um pedido:

```bash
curl --location --request POST 'http://localhost:3003/checkout' --header 'Content-Type: application/json' --data-raw '{
  "total": 150.00,
  "client_id": 1,
  "item": "item",
  "quantity": 1,
  "item_id": 10
}'
```

🔄 **Resposta de Sucesso (201 Created):**
```json
{
  "id": 2,
  "createdAt": "2025-02-14T19:40:53.346Z",
  "updatedAt": "2025-02-14T19:40:53.346Z",
  "client_id": 1,
  "item_id": 10,
  "quantity": 1,
  "item": "item",
  "total": 150,
  "status": "PENDING"
}
```

❌ **Possíveis Erros:**
| Código | Motivo                | Exemplo de Resposta                                      |
|--------|------------------------|-----------------------------------------------------------|
| `500`  | Erro interno na API    | `{ "statusCode": 500, "message": "Erro ao criar pedido" }` |
| `400`  | Erro de validação      | `{ "statusCode": 400, "message": "Bad Request" }` |

---

### 🔹 Consultar Pedidos e seus Status

Faça uma requisição **GET** para listar os pedidos:

```bash
curl --location --request GET 'http://localhost:3003/checkout'
```

🔄 **Resposta de Sucesso (200 OK):**
```json
[
  {
    "id": 1,
    "createdAt": "2025-02-14T19:40:35.515Z",
    "updatedAt": "2025-02-14T19:40:40.605Z",
    "client_id": 1,
    "item_id": 10,
    "quantity": 1,
    "item": "item",
    "total": 150,
    "status": "CANCELLED"
  },
  {
    "id": 2,
    "createdAt": "2025-02-14T19:40:53.346Z",
    "updatedAt": "2025-02-14T19:40:53.366Z",
    "client_id": 1,
    "item_id": 10,
    "quantity": 1,
    "item": "item",
    "total": 150,
    "status": "PAID"
  }
]
```

### 🔹 Consultar Pagamentos

```bash
curl --location --request GET 'http://localhost:3001/payments'
```

### 🔹 Consultar Expedições

```bash
curl --location --request GET 'http://localhost:3002/expeditions'
```

❌ **Possíveis Erros:**
| Código | Motivo                | Exemplo de Resposta                                 |
|--------|------------------------|------------------------------------------------------|
| `500`  | Erro interno na API    | `{ "statusCode": 500, "message": "Erro ao buscar pedidos" }` |

---

### ✅ Resumo dos Endpoints Disponíveis
| Método | Rota                      | Serviço       | Descrição                        |
|--------|----------------------------|---------------|------------------------------------|
| `POST` | `/checkout`                | BFF           | Criar um novo pedido              |
| `GET`  | `/checkout`                | BFF           | Listar todos os pedidos           |
| `GET`  | `/payments`                | Payments      | Listar pagamentos                 |
| `GET`  | `/expeditions`             | Expeditions   | Listar expedições                 |

---

## 🧪 Testes

Dentro de cada microserviço, você pode rodar os testes com:
```bash
npm run test
```
Para testes end-to-end:
```bash
npm run test:e2e
```

## 🔥 Funcionalidades

- Criar pedidos
- Listar pedidos
- Consultar pagamentos e expedições
- Comunicação assíncrona entre serviços via Kafka
- Persistência de dados em MySQL


## 📚 Referências

- https://docs.nestjs.com/
- https://github.com/confluentinc/cp-all-in-one/blob/7.8.0-post/cp-all-in-one/docker-compose.yml
- https://github.com/devfullcycle/live-imersao-13-nestjs-kafka
- https://www.youtube.com/watch?v=z87Yo6j_iK8
- https://victorfjansen.com/bffs-pra-tratativa-de-dados-com-nestjs-dbfde05bdce8
- https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei

## 🧑‍💻 Autor

[Henrique Ricardo Figueira](https://github.com/HenriqueRicardoFigueira)