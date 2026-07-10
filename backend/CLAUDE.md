# NovaWave Fleet — Backend

> Guia da API. Complementa o [`CLAUDE.md` da raiz](../CLAUDE.md).
> **API REST** em **Laravel / PHP 8.4**, com **PostgreSQL 17 + PostGIS**, **Redis 8**, autenticação **JWT** e acesso a dados via **PDO/Eloquent**. Servido por **Nginx + PHP-FPM**.

---

## 1. Stack

| Categoria | Tecnologia | Observação |
|-----------|-----------|-----------|
| Runtime | **PHP 8.4** | |
| Framework | **Laravel 13.8** | Estrutura, roteamento, ORM |
| Banco | **PostgreSQL 17 + PostGIS** | Relacional + geoespacial (rastreamento futuro) |
| Cache/Filas/Sessão | **Redis 8** | `phpredis` |
| Acesso a dados | **PDO** (via Eloquent) | Driver `pgsql` |
| Autenticação | **JWT** | `php-open-source-saver/jwt-auth` |
| Análise estática | **Larastan** + **PHPStan** | |
| Testes | **PHPUnit** | |
| Estilo | **Laravel Pint** | |
| Servidor web | **Nginx + PHP-FPM** | Em Docker/produção |

> ⚠️ **Não** trocar Laravel, PostgreSQL/PostGIS, Redis ou JWT por alternativas sem decisão registrada na raiz.

---

## 2. Regras obrigatórias

Antes de criar qualquer endpoint ou regra de negócio:

1. **Consulte a doc oficial do Laravel** (https://laravel.com/docs) e siga as convenções.
2. **Reutilize** Models, Requests, Resources e Services existentes.
3. **Arquitetura em camadas**: Rota → Controller (fino) → Service → Model.
4. **Validação** via **Form Requests**.
5. **Respostas JSON** via **API Resources**.
6. **Autenticação** por **JWT** (`auth:api`).
7. **Multiempresa/Multifilial:** toda query de negócio deve ser escopada por empresa/filial do usuário autenticado.
8. **RBAC:** cada ação verifica papéis/permissões.
9. **Auditoria:** alterações relevantes registram trilha (quem/o quê/quando).
10. Código deve passar em Larastan/PHPStan.

---

## 3. Estrutura

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/    # controllers finos (delegam a services)
│   │   ├── Requests/       # Form Requests (validação)
│   │   ├── Resources/      # API Resources (JSON)
│   │   └── Middleware/     # JWT, escopo de empresa/filial, RBAC
│   ├── Models/             # models Eloquent
│   ├── Services/           # regras de negócio
│   └── Providers/
├── routes/
│   ├── api.php             # rotas da API (a criar)
│   └── web.php
├── database/
│   ├── migrations/         # schema (PostgreSQL/PostGIS)
│   ├── factories/
│   └── seeders/
├── config/
├── docker/nginx/           # configuração do Nginx (default.conf)
└── tests/                  # Feature + Unit
```

---

## 4. Fluxo de uma nova funcionalidade

1. Migration (`php artisan make:migration`).
2. Model (`php artisan make:model`) — com escopo de empresa/filial.
3. Form Request — validação.
4. Service — regra de negócio.
5. Controller — orquestra request → service → resource.
6. Resource — molda o JSON.
7. Rota em `routes/api.php`, protegida por `auth:api` + verificação RBAC.
8. Auditoria da operação, quando aplicável.
9. Testes de Feature/Unit (PHPUnit).

---

## 5. Banco de dados — PostgreSQL 17 + PostGIS ✅

Configurado em `backend/.env` (`DB_CONNECTION=pgsql`):

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1        # "db" quando executando via Docker Compose
DB_PORT=5432
DB_DATABASE=novawave
DB_USERNAME=novawave
DB_PASSWORD=secret
```

Requer extensões PHP `pdo_pgsql`/`pgsql` (o `Dockerfile` instala). Migrar e habilitar PostGIS:

```bash
php artisan migrate
# habilitar a extensão geoespacial (uma vez, para rastreamento/telemetria)
psql -d novawave -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

---

## 6. Redis 8 ✅

Usado para **cache, filas e sessão**. Configuração no `.env` (`REDIS_HOST`, `REDIS_CLIENT=phpredis`). No Docker Compose o serviço `backend` já usa Redis (`CACHE_STORE`/`SESSION_DRIVER`/`QUEUE_CONNECTION=redis`, `REDIS_HOST=redis`).

Filas: processar com `php artisan queue:work` (ou `queue:listen` em dev).

---

## 7. Autenticação JWT ✅

Via **`php-open-source-saver/jwt-auth`**.

- `config/jwt.php` publicado e `JWT_SECRET` gerado (`php artisan jwt:secret`).
- Guard **`api`** com driver `jwt` em `config/auth.php` (guard padrão).
- `App\Models\User` implementa `PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject`.

Uso:
```php
$token = auth('api')->attempt($request->validated());
return response()->json(['token' => $token]);
```
Proteger rotas em `routes/api.php` com o middleware `auth:api`.

---

## 8. Comandos úteis

```bash
composer install
php artisan jwt:secret           # (já executado) gera JWT_SECRET
php artisan migrate
php artisan serve                # dev local (sem Nginx)
php artisan queue:work           # processar filas (Redis)
php artisan test                 # PHPUnit
./vendor/bin/phpstan analyse     # Larastan/PHPStan
./vendor/bin/pint                # formatação
```

---

## 9. Pendências de implementação

- [x] PostgreSQL/PostGIS (`pgsql`) configurado.
- [x] Redis para cache/filas/sessão (Docker).
- [x] JWT (guard `api` + `User` como `JWTSubject`).
- [x] Docker: PHP-FPM + Nginx.
- [ ] `AuthController` (login, logout, refresh, me) e `routes/api.php`.
- [ ] Middleware de escopo empresa/filial (multitenancy).
- [ ] RBAC (papéis/permissões) + middleware de autorização.
- [ ] Trilha de auditoria.
- [ ] Migrations dos módulos (empresas, filiais, veículos, motoristas, ...).
- [ ] `phpstan.neon` com Larastan e nível de análise.
