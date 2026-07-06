# Finance Flow

Finance Flow é um sistema para gestão de clientes, planos e assinaturas. O projeto é organizado como um monorepo com uma API em Fastify, uma interface web em React + Vite e um pacote dedicado ao banco de dados com Drizzle ORM.

## Ideia

A proposta do projeto é centralizar o fluxo financeiro de cadastros e assinaturas em um só lugar. A aplicação permite organizar clientes, planos e suas relações de assinatura, servindo como base para uma operação mais controlada e simples de acompanhar.

## Estrutura

```text
finance-flow/
├── apps/
│   ├── api/        # Backend Fastify com rotas, controllers e schemas
│   └── web/        # Frontend React + Vite com páginas, componentes e serviços
├── packages/
│   └── database/   # Drizzle ORM, schema, migrations e configuração do Postgres
├── package.json    # Scripts principais do monorepo
├── pnpm-workspace.yaml
└── README.md
```

### Backend

O backend fica em `apps/api` e expõe as rotas da aplicação. Ele usa Fastify, validação com Zod e conecta no banco por meio do pacote `packages/database`.

### Frontend

O frontend fica em `apps/web` e é responsável pela interface do usuário. A aplicação usa React, Vite, React Router, Tailwind e componentes visuais preparados para o fluxo de gestão.

### Banco de dados

O pacote `packages/database` concentra a conexão com o PostgreSQL, o schema do Drizzle e as migrations. Há também um `docker-compose.yaml` para subir o banco localmente.

## Como rodar localmente

1. Instale as dependências:

```bash
pnpm install
```

2. Suba o banco de dados local:

```bash
docker compose -f packages/database/docker-compose.yaml up -d
```

3. Crie um arquivo `.env` na raiz do projeto.

4. Rode as migrations do banco:

```bash
pnpm db:migrate
```

5. Inicie a API:

```bash
pnpm api
```

6. Inicie a aplicação web:

```bash
pnpm web
```

Depois disso, a API sobe em `http://localhost:3000` e o frontend fica disponível no endereço exibido pelo Vite.

## Como configurar

O projeto depende principalmente destas variáveis de ambiente:

```env
DATABASE_URL=postgresql://postgres:123456@localhost:5432/finance_flow
PORT=3000
```

### Configuração do banco

O banco local padrão usa o container definido em `packages/database/docker-compose.yaml`:

- usuário: `postgres`
- senha: `123456`
- banco: `finance_flow`
- porta: `5432`

Se quiser mudar esses valores, atualize o `docker-compose.yaml` e ajuste a `DATABASE_URL` no arquivo `.env`.

### Scripts úteis

```bash
pnpm api         # sobe a API
pnpm web         # sobe o frontend
pnpm db:migrate  # aplica migrations
pnpm db:generate # gera novas migrations a partir do schema
pnpm db:push     # sincroniza o schema com o banco
```

### Depois de alterar o schema

Se você modificar as tabelas em `packages/database/src/schema.ts`, o fluxo normal é:

1. atualizar o schema
2. gerar uma migration com `pnpm db:generate`
3. aplicar com `pnpm db:migrate`

## Observações

O projeto usa `pnpm` como gerenciador de pacotes e foi organizado para separar bem interface, API e persistência.
