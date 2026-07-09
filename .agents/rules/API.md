---
trigger: model_decision
description: Regras API (use quando for mexer na api)
---

# Diretrizes e Regras do App API

## 🛠️ Stack Tecnológica
- Fastify
- TypeScript
- Zod
- pnpm

## 📁 Estrutura de Pastas
- apps/api: API
- apps/api/app.ts: codigo main
- apps/api/src/controllers: Controles de modelos do banco de dados
- apps/api/src/routes: Rotas e metodos
- apps/api/src/schemas: Schemas e tipagens com zod

## 📏 Padrões de Código
- Arquivos sempre devem seguir essa estrutura: nomeDaTabela.responsabilidade.ts (responsabilidades: schemas, controllers, routes)
- Use modelos do banco (finance-flow/models)