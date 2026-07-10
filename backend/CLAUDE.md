# NovaWave ERP — Backend

> Guia da API. Complementa o [`CLAUDE.md` da raiz](../CLAUDE.md).
> API em **PHP (Laravel)** com **PostgreSQL**, autenticação **JWT** e acesso a dados via **PDO/Eloquent**.

---

## 1. Stack

| Categoria | Tecnologia | Observação |
|-----------|-----------|-----------|
| Runtime | **PHP 8.3+** | `composer.json` exige `^8.3` |
| Framework | **Laravel 13** | Estrutura, roteamento, ORM |
| Banco | **PostgreSQL** | Padrão obrigatório (ver §5) |
| Acesso a dados | **PDO** (via Eloquent) | Driver `pgsql` |
| Autenticação | **JWT** | Stateless, para a SPA |
| Análise estática | **Larastan** + **PHPStan** | `larastan/larastan`, `phpstan/phpstan` |
| Testes | **PHPUnit** | `phpunit/phpunit` |
| Estilo | **Laravel Pint** | Formatação PHP |

> ⚠️ **Não** trocar Laravel, PostgreSQL ou JWT por alternativas sem decisão registrada na raiz.

---

## 2. Regras obrigatórias

Antes de criar qualquer endpoint ou regra de negócio:

1. **Consulte a doc oficial do Laravel** (https://laravel.com/docs) e siga as convenções do framework.
2. **Reutilize** — use Models, Requests, Resources e Services existentes antes de criar novos.
3. **Respeite a arquitetura em camadas**: Rota → Controller → (Service) → Model.
4. **Validação** sempre via **Form Requests** (`php artisan make:request`).
5. **Respostas JSON** padronizadas via **API Resources** (`php artisan make:resource`).
6. **Autenticação** protegida por **JWT** nas rotas de API.
7. **Análise estática limpa**: código deve passar em Larastan/PHPStan antes de ser considerado pronto.

---

## 3. Estrutura

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/    # controllers (finos; delegam a services)
│   │   ├── Requests/       # Form Requests (validação)
│   │   ├── Resources/      # API Resources (serialização JSON)
│   │   └── Middleware/     # middlewares (ex.: JWT)
│   ├── Models/             # models Eloquent
│   ├── Services/           # regras de negócio
│   └── Providers/
├── routes/
│   ├── api.php             # rotas da API (a criar)
│   └── web.php
├── database/
│   ├── migrations/         # schema (PostgreSQL)
│   ├── factories/
│   └── seeders/
├── config/
└── tests/                  # Feature + Unit
```

> Controllers **finos**: validação em Form Requests, regra de negócio em Services, saída em Resources.

---

## 4. Fluxo de uma nova funcionalidade

1. Migration (`php artisan make:migration`) — define o schema.
2. Model (`php artisan make:model`) — mapeamento Eloquent.
3. Form Request — regras de validação.
4. Service — regra de negócio (quando houver lógica além de CRUD).
5. Controller — orquestra request → service → resource.
6. Resource — molda a resposta JSON.
7. Rota em `routes/api.php`, protegida por middleware JWT.
8. Testes de Feature/Unit (PHPUnit).

---

## 5. Banco de dados — PostgreSQL ✅

Já configurado em `backend/.env` (`DB_CONNECTION=pgsql`):

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1        # "db" quando executando via Docker Compose
DB_PORT=5432
DB_DATABASE=novawave
DB_USERNAME=novawave
DB_PASSWORD=secret
```

Requer as extensões PHP `pdo_pgsql`/`pgsql` habilitadas (o `Dockerfile` já as instala). Aplicar migrações:

```bash
php artisan migrate
```

---

## 6. Autenticação JWT ✅

Instalada via **`php-open-source-saver/jwt-auth`** (fork mantido do `tymon/jwt-auth`).

Configuração já aplicada:
- `config/jwt.php` publicado e `JWT_SECRET` gerado no `.env` (`php artisan jwt:secret`).
- Guard **`api`** com driver `jwt` em `config/auth.php` (é o guard padrão).
- `App\Models\User` implementa `PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject`.

Uso:
- Token emitido no login (`auth('api')->attempt($credentials)`) e enviado pelo frontend no header `Authorization: Bearer <token>`.
- Proteger rotas em `routes/api.php` com o middleware `auth:api`.

Exemplo de controller de login:

```php
$token = auth('api')->attempt($request->validated());
return response()->json(['token' => $token]);
```

---

## 7. Comandos úteis

```bash
composer install                 # dependências
php artisan key:generate         # chave da aplicação
php artisan migrate              # migrações
php artisan serve                # servidor de desenvolvimento
php artisan test                 # testes (PHPUnit)
./vendor/bin/phpstan analyse     # análise estática (Larastan/PHPStan)
./vendor/bin/pint                # formatação
```

---

## 8. Pendências de implementação

- [x] Migrar `DB_CONNECTION` para **PostgreSQL** (`pgsql`).
- [x] Instalar e configurar **JWT** (guard `api` + `User` como `JWTSubject`).
- [x] Dockerfile com extensões PostgreSQL.
- [ ] Criar `routes/api.php` com rotas de login/registro e rotas protegidas por `auth:api`.
- [ ] Criar `AuthController` (login, logout, refresh, me).
- [ ] Configurar `phpstan.neon` com Larastan e definir o nível de análise.
