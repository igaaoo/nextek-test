# Etapa 1: Instalar dependências
FROM node:18-alpine AS deps
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install

# Etapa 2: Construir o projeto
FROM node:18-alpine AS builder
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Etapa 3: Configurar o ambiente de produção
FROM node:18-alpine AS runner
WORKDIR /frontend
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
