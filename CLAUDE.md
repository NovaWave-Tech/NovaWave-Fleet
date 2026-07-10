# NovaWave Business ERP — Guia do Projeto

> Documento de referência para agentes de IA (Claude Code) e desenvolvedores.
> Define o padrão **obrigatório** de tecnologias, arquitetura e fluxo de trabalho.
> Existem guias específicos em [`frontend/CLAUDE.md`](frontend/CLAUDE.md) e [`backend/CLAUDE.md`](backend/CLAUDE.md).

---

## 1. Visão geral

**NovaWave Business ERP** é um sistema de gestão empresarial. Este repositório é um monorepo com dois aplicativos independentes:

| Pasta | Papel | Stack principal |
|-------|-------|-----------------|
| [`frontend/`](frontend/) | SPA web (interface do ERP) | React + TypeScript + Chakra UI + Vite |
| [`backend/`](backend/) | API / regras de negócio | PHP (Laravel) + PostgreSQL + JWT |

A comunicação entre as camadas é feita por **API HTTP JSON**, consumida no frontend via **Axios** + **TanStack Query** e protegida por **JWT**.

---

## 2. Stack obrigatória

Estas tecnologias são o **padrão do projeto**. Não substitua nenhuma delas sem decisão explícita registrada aqui.

### Frontend
- **React** + **TypeScript** — base da UI.
- **Chakra UI** — biblioteca de componentes e design system. **Toda a UI deve ser compatível com Chakra UI.**
- **TanStack Query** — estado de servidor (fetching, cache, sincronização).
- **React Hook Form** — formulários.
- **Zod** — validação e schemas (fonte única de verdade dos tipos de formulário).
- **Framer Motion** — animações.
- **React Router DOM** — roteamento.
- **Axios** — cliente HTTP.
- **React Icons** — ícones.

### Ferramentas (frontend)
- **Vite** — build e dev server.
- **ESLint** — linter (padrão do projeto).
- **Prettier** — formatação.

### Backend
- **PHP** (Laravel) — framework e runtime.
- **PostgreSQL** — banco de dados.
- **JWT** — autenticação stateless.
- **PDO** — acesso ao banco (usado internamente pelo Eloquent/Laravel).

### Qualidade (backend)
- **Larastan** + **PHPStan** — análise estática.

### Infraestrutura
- **Docker** + **Docker Compose** — ambiente de desenvolvimento e execução.

---

## 3. Estado atual

O repositório foi inicializado a partir dos esqueletos padrão e a base de infraestrutura já foi configurada:

| Item | Estado |
|------|--------|
| Banco de dados | ✅ **PostgreSQL** (`pgsql`) configurado em `backend/.env` |
| Autenticação | ✅ **JWT** instalado (`php-open-source-saver/jwt-auth`), guard `api` + `User` como `JWTSubject` |
| Linter frontend | ✅ **ESLint** (`frontend/eslint.config.js`) |
| Docker | ✅ **Docker + Docker Compose** (`docker-compose.yml`, `Dockerfile` em cada app) |
| Código de aplicação | ⏳ Esqueletos — módulos do ERP a implementar |

Falta apenas construir os módulos de negócio (telas e endpoints). A base de auth/DB/infra está pronta.

---

## 4. Regras de trabalho (obrigatórias)

Antes de implementar **qualquer** funcionalidade:

1. **Consulte a documentação oficial** da biblioteca correspondente e siga as melhores práticas recomendadas.
2. **Reutilize componentes/serviços existentes** — não duplique código.
3. **Respeite a arquitetura atual** do projeto (estrutura de pastas, camadas, convenções).
4. **Mantenha compatibilidade com Chakra UI** em toda a interface.
5. **Não substitua** bibliotecas já adotadas pelo projeto.
6. Escreva código que **se pareça com o código ao redor** (nomes, estilo, densidade de comentários).

### Links oficiais de referência

| Biblioteca | Documentação |
|-----------|--------------|
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org/docs |
| Chakra UI | https://www.chakra-ui.com/docs |
| TanStack Query | https://tanstack.com/query/latest |
| React Hook Form | https://react-hook-form.com/get-started |
| Zod | https://zod.dev |
| Framer Motion | https://www.framer.com/motion |
| React Router | https://reactrouter.com |
| Axios | https://axios-http.com/docs/intro |
| React Icons | https://react-icons.github.io/react-icons |
| Vite | https://vite.dev/guide |
| ESLint | https://eslint.org/docs/latest |
| Prettier | https://prettier.io/docs |
| Laravel | https://laravel.com/docs |
| PostgreSQL | https://www.postgresql.org/docs |
| Larastan | https://github.com/larastan/larastan |
| PHPStan | https://phpstan.org/user-guide/getting-started |
| Docker Compose | https://docs.docker.com/compose |

---

## 5. Estrutura do repositório

```
NovaWave - Fleet/
├── CLAUDE.md            # este arquivo (guia geral)
├── frontend/            # SPA React — ver frontend/CLAUDE.md
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── backend/             # API Laravel — ver backend/CLAUDE.md
    ├── app/
    ├── routes/
    ├── database/
    └── composer.json
```

---

## 6. Como executar (desenvolvimento)

### Opção A — Docker (recomendada)

Sobe PostgreSQL, backend e frontend de uma vez:

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend/API: http://localhost:8000
- PostgreSQL: localhost:5432

Aplicar as migrações (primeira execução):

```bash
docker compose exec backend php artisan migrate
```

### Opção B — Local (sem Docker)

Requer PostgreSQL rodando e as extensões PHP `pdo_pgsql`/`sodium` habilitadas.

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && composer install && php artisan migrate && php artisan serve
```

---

## 7. Convenções gerais

- **Idioma:** documentação e comentários em **português**; código (identificadores) em **inglês**, seguindo as convenções de cada framework.
- **Commits:** mensagens claras e no imperativo, agrupadas por funcionalidade.
- **Não commitar** segredos (`.env`), `node_modules/`, `vendor/` nem artefatos de build.
- Toda nova funcionalidade deve passar por lint e análise estática antes de ser considerada pronta.
