# NovaWave Fleet — Frontend

> Guia do aplicativo web. Complementa o [`CLAUDE.md` da raiz](../CLAUDE.md).
> SPA em **React 19 + TypeScript**, empacotada com **Vite 7** e construída sobre **Chakra UI v3**.

---

## 1. Stack

| Categoria | Biblioteca | Uso |
|-----------|-----------|-----|
| UI | **React 19** + **TypeScript 5.x** | Base da interface |
| Design system | **Chakra UI v3** (`@chakra-ui/react`, `@emotion/react`) | **Todos os componentes visuais** |
| Estado de servidor | **React Query v5** | Fetching, cache, invalidação |
| Formulários | **React Hook Form v7** | Controle de formulários |
| Validação | **Zod v4** | Schemas e tipos derivados |
| Tabelas | **TanStack Table v8** | Listagens (veículos, motoristas, etc.) |
| Gráficos | **Recharts v3** | Dashboard e relatórios |
| Animação | **Framer Motion v12** | Transições e microinterações |
| Rotas | **React Router v7** | Navegação |
| HTTP | **Axios** | Cliente da API REST |
| Ícones | **React Icons** | Iconografia |
| Build/Dev | **Vite 7** | Bundler e dev server |
| Lint/Format | **ESLint** + **Prettier** | Qualidade e estilo |

> ⚠️ **Não** introduzir outra biblioteca de UI, HTTP, estado de servidor, tabelas, gráficos ou formulários. O padrão acima é fixo.

---

## 2. Regras obrigatórias

Antes de codar qualquer tela ou componente:

1. **Consulte a doc oficial** da lib (links na raiz) e siga as práticas recomendadas.
2. **Reutilize** componentes de `src/components`. Não duplique.
3. **Compatibilidade total com Chakra UI v3** — sem CSS solto ou libs de estilo concorrentes; use o sistema de estilo, tokens e componentes do Chakra.
4. **Formulários = React Hook Form + Zod** (schema Zod como fonte de verdade; tipos via `z.infer`).
5. **Dados do servidor = React Query.** Nunca `useEffect` + `fetch` manual para estado de servidor.
6. **Listagens = TanStack Table**; **gráficos = Recharts**.
7. **HTTP apenas via Axios**, pela instância central (§4).
8. **Respeite RBAC** — esconda/desabilite ações conforme as permissões do usuário.

---

## 3. Estrutura recomendada

O `src/` atual é só o esqueleto do template. Organize por **feature/módulo** (ver módulos na raiz):

```
src/
├── main.tsx              # entrada
├── App.tsx               # providers + rotas
├── routes/               # rotas (React Router)
├── lib/
│   ├── api.ts            # instância central do Axios (+ interceptor JWT)
│   └── queryClient.ts    # QueryClient do React Query
├── components/           # componentes reutilizáveis (Chakra UI)
├── features/             # módulos de negócio
│   ├── auth/
│   ├── dashboard/
│   ├── companies/        # empresas
│   ├── branches/         # filiais
│   ├── vehicles/         # veículos
│   ├── drivers/          # motoristas
│   ├── fuelings/         # abastecimentos
│   ├── maintenances/     # manutenções
│   ├── documents/
│   ├── costs/            # custos
│   ├── reports/          # relatórios
│   ├── audit/            # auditoria
│   └── permissions/      # RBAC
│       ├── api/          # hooks React Query (queries/mutations)
│       ├── components/   # UI da feature
│       └── schemas/      # schemas Zod
├── hooks/                # hooks genéricos
├── theme/               # tema/tokens do Chakra UI v3
└── types/                # tipos compartilhados
```

---

## 4. Padrões de integração

### Providers (App.tsx)
Envolver a aplicação com, no mínimo:
- `ChakraProvider` (Chakra UI v3 — usa `value={system}` do `createSystem`)
- `QueryClientProvider` (React Query)
- `BrowserRouter` (React Router v7)

### Instância do Axios (`src/lib/api.ts`)
- Instância única com `baseURL` de `import.meta.env.VITE_API_URL`.
- Interceptor de request anexando o **token JWT** (`Authorization: Bearer`).
- Interceptor de response tratando `401` (refresh/redirect para login).

### React Query
- Chaves de query estáveis e tipadas; invalidar caches após mutations.

### Formulários
- `useForm({ resolver: zodResolver(schema) })` integrando campos do Chakra UI.

---

## 5. Variáveis de ambiente

Prefixo obrigatório **`VITE_`**. Exemplo (`frontend/.env.local`):

```
VITE_API_URL=http://localhost:8000/api
```

Nunca colocar segredos no frontend.

---

## 6. Scripts

```bash
npm run dev       # dev server (Vite)
npm run build     # type-check (tsc -b) + build
npm run preview   # preview do build
npm run lint      # ESLint
```

---

## 7. Pendências de implementação

- [ ] Configurar `ChakraProvider` (v3), `QueryClientProvider` e `BrowserRouter` em `App.tsx`.
- [ ] Instância central do Axios com interceptor JWT.
- [ ] Tema do Chakra UI v3 em `src/theme` (`createSystem`).
- [ ] Tela de login consumindo a API JWT.
- [ ] Layout base (sidebar de módulos) com controle por RBAC.
