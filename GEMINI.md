# Diretrizes e Regras do Projeto

## 🛠️ Stack Tecnológica
- **Linguagem:** TypeScript (Modo Estrito)
- **Estilização:** Tailwind CSS, Shadcn/ui
- **Banco de Dados:** PostgreSQL
- **ORM:** Drizzle
- **Backend:** Fastify, Zod
- **Frontend:** React, Vite, React Router   
- **Gerenciador de Pacotes:** pnpm

## 📏 Padrões de Código
- **Componentes:** Use funções declarativas (`export function Componente()`). Não use `export default`.
- **Nomenclatura de Arquivos:** Kebab-case para arquivos normais (ex: `user-profile.tsx`) e PascalCase apenas para componentes principais se necessário.
- **Tipagem:** Defina explicitamente os tipos de retorno de todas as funções e propriedades de componentes. O uso de `any` é estritamente proibido.

## 📁 Estrutura de Pastas (Monorepo)
- Frontend: apps/web
- Backend: apps/api
- Database: packages/database


## 🤖 Regras para Agentes de IA (Antigravity/Copilot)
1. **Antes de alterar o código:** Sempre leia o arquivo de tipos correspondente para entender o modelo de dados.