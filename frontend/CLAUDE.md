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

## 3. Estrutura

Organização por **camada de service + páginas**: cada domínio tem um arquivo em
`service/` que faz as requisições e devolve os dados; as páginas (`pages/`)
consomem essas funções (via React Query).

```
src/
├── main.tsx              # entrada
├── App.tsx               # providers + rotas + <Toaster/>
├── service/              # camada de acesso à API (uma função por rota)
│   ├── http.ts           # instância do Axios + helpers de token + interceptors
│   ├── auth.ts           # logar, sair, perfil
│   ├── veiculos.ts       # (futuro) listarVeiculos, criarVeiculo, ...
│   └── ...               # um arquivo por domínio
├── lib/
│   └── queryClient.ts    # QueryClient do React Query
├── utils/
│   └── alertas.ts        # showError/showSuccess (toaster do Chakra)
├── components/           # componentes reutilizáveis (Chakra UI)
│   ├── MarcaNovaWave.tsx
│   ├── RotaProtegida.tsx
│   └── Toaster.tsx
├── pages/                # uma pasta por página
│   └── <pagina>/
│       ├── Index.tsx     # a página
│       └── components/   # componentes e schemas Zod da página
├── theme/                # tema/tokens do Chakra UI v3
└── types/                # tipos compartilhados
```

> Padrão: **o `service/` faz a requisição na rota e retorna os dados**; a tela
> chama a função do service (normalmente dentro de `useQuery`/`useMutation`).

---

## 4. Padrões de integração

### Providers (App.tsx)
Envolver a aplicação com, no mínimo:
- `ChakraProvider` (Chakra UI v3 — usa `value={system}` do `createSystem`)
- `QueryClientProvider` (React Query)
- `BrowserRouter` (React Router v7)

### Camada de service (`src/service/`)
- `http.ts`: instância única do Axios com `baseURL` de `import.meta.env.VITE_API_URL`,
  helpers de token (`obterToken`, `tokenValido`, `salvarAuth`, `limparAuth`,
  `obterUsuario`) e interceptors: request anexa o **JWT**; response em `401/403`
  desloga e redireciona ao login, demais erros mostram `showError`.
- Um arquivo por domínio (`auth.ts`, `veiculos.ts`, ...) exportando funções
  `async` que chamam o `http` e **retornam os dados**.

### React Query
- As telas consomem os services via `useQuery`/`useMutation` (a função do service
  é o `queryFn`/`mutationFn`).
- Chaves de query estáveis e tipadas; invalidar caches após mutations.

### Alertas
- `utils/alertas.ts` expõe `showError`/`showSuccess` (toaster do Chakra); o
  `<Toaster/>` fica montado uma vez em `App.tsx`.

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

- [x] `ChakraProvider` (v3), `QueryClientProvider` e `BrowserRouter` em `App.tsx`.
- [x] Camada de service (`http.ts` com interceptor JWT) + `auth.ts`.
- [x] Tema do Chakra UI v3 em `src/theme` (`createSystem`).
- [x] Tela de login consumindo a API JWT.
- [x] Alertas globais (toaster do Chakra).
- [ ] Layout base (sidebar de módulos) com controle por RBAC.
