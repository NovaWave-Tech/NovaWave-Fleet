# NovaWave ERP — Frontend (React + Vite)
FROM node:20-alpine

WORKDIR /app

# Instala dependências primeiro (aproveita cache de camadas)
COPY package.json package-lock.json ./
RUN npm ci

# Código da aplicação
COPY . .

EXPOSE 5173

# Dev server acessível fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
