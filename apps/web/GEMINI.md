# Diretrizes e Regras do App Web

## 🛠️ Stack Tecnológica
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Router
- Vite
- Lucide-react

## 📁 Estrutura de Pastas
- components/: componentes
- components/layouts/: layouts (Header, Sidebar, Footer)
- components/tables/: tabelas
- components/modals/: modais
- components/ui/: componentes de ui (botões, inputs, etc)
- contexts/: estados e funções reutiliziveis
- services/: fetches
- types/: tipagens
- pages/: rotas
- hooks/: hooks reutiliziveis

## 📏 Padrões de Código
- Componentes devem seguir a estrutura: components/nomeDoComponente.tsx
- Sempre utilize o TypeScript
- Fetch devem ser feitos em @/services/*.ts
- Tipagens devem ser feitas em @/types/*.ts
- Estados e funções reutiliziveis devem ficar em @/contexts/*.tsx
- Use cores do sistemas @index.css
