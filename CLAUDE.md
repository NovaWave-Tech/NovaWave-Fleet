# NovaWave Fleet — Guia do Projeto

> Documento de referência para agentes de IA (Claude Code) e desenvolvedores.
> Define o padrão **obrigatório** de tecnologias, arquitetura e fluxo de trabalho.
> Guias específicos: [`frontend/CLAUDE.md`](frontend/CLAUDE.md) e [`backend/CLAUDE.md`](backend/CLAUDE.md).

---

## 1. Visão geral

**NovaWave Fleet** é uma plataforma moderna de **gestão de frotas empresariais**: veículos, motoristas, abastecimentos, manutenções, documentos, custos operacionais e indicadores — evoluindo futuramente para **rastreamento GPS e telemetria**.

Monorepo com dois aplicativos independentes:

| Pasta | Papel | Stack principal |
|-------|-------|-----------------|
| [`frontend/`](frontend/) | SPA web (interface) | React 19 + TypeScript + Chakra UI v3 + Vite 7 |
| [`backend/`](backend/) | API REST / regras de negócio | Laravel + PHP 8.4 + PostgreSQL 17/PostGIS + Redis 8 |

Comunicação por **API REST JSON**, consumida no frontend via **Axios + React Query** e protegida por **JWT**. Em produção o backend é servido por **Nginx + PHP-FPM**.

---

## 2. Módulos

- **Dashboard** — visão geral e indicadores.
- **Empresas** — cadastro de empresas (raiz do multiempresa).
- **Filiais** — unidades por empresa (multifilial).
- **Veículos** — frota.
- **Motoristas** — condutores e vínculos.
- **Abastecimentos** — registros de combustível.
- **Manutenções** — preventivas/corretivas.
- **Documentos** — documentação de veículos/motoristas.
- **Custos** — custos operacionais.
- **Relatórios** — relatórios e exportações.
- **Auditoria** — trilha completa de alterações.
- **Permissões** — RBAC (papéis e permissões).
- **Configurações** — parâmetros do sistema.
- **IA** — recursos assistidos por IA.
- **Rastreamento** — GPS/telemetria (futuro; base geoespacial via PostGIS).

---

## 3. Stack obrigatória

Padrão do projeto. Não substituir nenhuma tecnologia sem decisão registrada aqui.

### Frontend
- **React 19** + **TypeScript 5.x**
- **Vite 7** — build/dev server
- **Chakra UI v3** — design system (toda a UI é compatível com Chakra)
- **React Query v5** (TanStack Query) — estado de servidor
- **React Router v7** — roteamento
- **React Hook Form v7** — formulários
- **Zod v4** — validação/schemas
- **TanStack Table v8** — tabelas de dados
- **Recharts v3** — gráficos
- **Framer Motion v12** — animações
- **Axios** — cliente HTTP
- **React Icons** — ícones
- **ESLint** + **Prettier** — lint/format

### Backend
- **PHP 8.4** + **Laravel** (13.8 instalado)
- **PostgreSQL 17 + PostGIS** — banco relacional + geoespacial
- **Redis 8** — cache, filas e sessão
- **JWT** — autenticação stateless (`php-open-source-saver/jwt-auth`)
- **PDO** — acesso a dados (via Eloquent)
- **Larastan** + **PHPStan** — análise estática

### Infraestrutura
- **Docker** + **Docker Compose**
- **Nginx** — servidor web (proxy para PHP-FPM)

---

## 4. Arquitetura

- **Multiempresa** — dados isolados por empresa.
- **Multifilial** — filiais dentro de cada empresa.
- **RBAC** — papéis e permissões controlando acesso a módulos/ações.
- **Auditoria completa** — trilha de todas as alterações relevantes.
- **API REST** — backend expõe endpoints JSON; frontend é cliente.
- **Arquitetura em camadas** — Rota → Controller → Service → Model.
- **Escalabilidade** — filas (Redis), cache e serviços desacoplados.

---

## 5. Estado atual

Infra base configurada; falta construir os módulos de negócio.

| Item | Estado |
|------|--------|
| Banco | ✅ **PostgreSQL/PostGIS** (`pgsql`) em `backend/.env` |
| Cache/Filas/Sessão | ✅ **Redis** (configurado no Docker) |
| Autenticação | ✅ **JWT** — guard `api` + `User` como `JWTSubject` |
| Linter frontend | ✅ **ESLint** |
| Docker | ✅ **Compose** com db (PostGIS), redis, backend (PHP-FPM), nginx, frontend |
| Módulos | ⏳ A implementar (ver §2) |

---

## 6. Regras de trabalho (obrigatórias)

Antes de implementar **qualquer** funcionalidade:

1. **Consulte a documentação oficial** da biblioteca e siga as melhores práticas.
2. **Reutilize** componentes/serviços existentes — não duplique código.
3. **Respeite a arquitetura** (camadas, multiempresa/multifilial, RBAC, auditoria).
4. **Mantenha compatibilidade com Chakra UI** em toda a interface.
5. **Não substitua** bibliotecas já adotadas.
6. Todo dado sensível respeita o **escopo de empresa/filial** e as **permissões** do usuário.

### Links oficiais

| Biblioteca | Documentação |
|-----------|--------------|
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org/docs |
| Chakra UI v3 | https://www.chakra-ui.com/docs |
| React Query | https://tanstack.com/query/latest |
| TanStack Table | https://tanstack.com/table/latest |
| Recharts | https://recharts.org |
| React Router | https://reactrouter.com |
| React Hook Form | https://react-hook-form.com |
| Zod | https://zod.dev |
| Framer Motion | https://www.framer.com/motion |
| Axios | https://axios-http.com/docs/intro |
| React Icons | https://react-icons.github.io/react-icons |
| Vite | https://vite.dev/guide |
| ESLint | https://eslint.org/docs/latest |
| Laravel | https://laravel.com/docs |
| PostgreSQL | https://www.postgresql.org/docs |
| PostGIS | https://postgis.net/documentation |
| Redis | https://redis.io/docs/latest |
| Larastan | https://github.com/larastan/larastan |
| Docker Compose | https://docs.docker.com/compose |
| Nginx | https://nginx.org/en/docs |

---

## 7. Estrutura do repositório

```
NovaWave - Fleet/
├── CLAUDE.md            # este guia geral
├── docker-compose.yml   # db (PostGIS) + redis + backend (FPM) + nginx + frontend
├── frontend/            # SPA React — ver frontend/CLAUDE.md
└── backend/             # API Laravel — ver backend/CLAUDE.md
    └── docker/nginx/     # configuração do Nginx
```

---

## 8. Como executar (desenvolvimento)

### Opção A — Docker (recomendada)

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- API (Nginx → PHP-FPM): http://localhost:8000
- PostgreSQL/PostGIS: localhost:5432 · Redis: localhost:6379

Primeira execução (migrações + extensão PostGIS):

```bash
docker compose exec backend php artisan migrate
docker compose exec db psql -U novawave -d novawave -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

### Opção B — Local (sem Docker)

Requer PostgreSQL 17+PostGIS e Redis rodando, e extensões PHP `pdo_pgsql`/`sodium`/`redis` habilitadas.

```bash
cd frontend && npm install && npm run dev
cd backend  && composer install && php artisan migrate && php artisan serve
```

---

## 9. Convenções gerais

- **Idioma:** documentação/comentários em **português**; identificadores de código em **inglês**.
- **Não commitar** segredos (`.env`), `node_modules/`, `vendor/` ou artefatos de build.
- Toda funcionalidade passa por lint e análise estática antes de ser considerada pronta.
