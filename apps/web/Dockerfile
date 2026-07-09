FROM node:22-alpine AS builder

# Configurar pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar dependências do monorepo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/

# Instalar dependências
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copiar código-fonte
COPY apps/web ./apps/web
COPY packages/database ./packages/database

# Injetar a URL da API recebida como argumento de build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Compilar o frontend
RUN pnpm --filter @finance-flow/views build

# Estágio de produção com Nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
