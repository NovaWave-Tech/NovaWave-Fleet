# NovaWave ERP — Frontend

> Guia do aplicativo web. Complementa o [`CLAUDE.md` da raiz](../CLAUDE.md).
> SPA em **React + TypeScript**, empacotada com **Vite** e construída sobre **Chakra UI**.

---

## 1. Stack

| Categoria | Biblioteca | Uso |
|-----------|-----------|-----|
| UI | **React 19** + **TypeScript** | Base da interface |
| Design system | **Chakra UI** (`@chakra-ui/react`, `@emotion/react`) | **Todos os componentes visuais** |
| Estado de servidor | **TanStack Query** | Fetching, cache, invalidação |
| Formulários | **React Hook Form** | Controle de formulários |
| Validação | **Zod** | Schemas e tipos derivados |
| Animação | **Framer Motion** | Transições e microinterações |
| Rotas | **React Router DOM** | Navegação |
| HTTP | **Axios** | Cliente da API |
| Ícones | **React Icons** | Iconografia |
| Build/Dev | **Vite** | Bundler e dev server |
| Lint | **ESLint** (`eslint.config.js`) | Qualidade de código |
| Formatação | **Prettier** | Estilo de código |

> ⚠️ **Não** introduzir outra biblioteca de UI, cliente HTTP, gerenciador de estado de servidor ou biblioteca de formulários. O padrão acima é fixo.

---

## 2. Regras obrigatórias

Antes de codar qualquer tela ou componente:

1. **Consulte a doc oficial** da lib envolvida (links na raiz) e siga as práticas recomendadas.
2. **Reutilize** componentes já existentes em `src/components`. Não duplique.
3. **Compatibilidade total com Chakra UI** — nada de CSS solto ou libs concorrentes de estilo. Use o sistema de estilo, tokens e componentes do Chakra.
4. **Formulários = React Hook Form + Zod.** O schema Zod é a fonte de verdade; derive os tipos com `z.infer`.
5. **Dados do servidor = TanStack Query.** Nunca faça `useEffect` + `fetch` manual para estado de servidor.
6. **HTTP apenas via Axios**, através da instância central (ver §4).
7. **Ícones apenas via React Icons.**

---

## 3. Estrutura recomendada

O `src/` atual contém apenas o esqueleto do template. À medida que os módulos do ERP forem criados, siga esta organização:

```
src/
├── main.tsx              # entrada da aplicação
├── App.tsx               # composição de providers + rotas
├── routes/               # definição de rotas (React Router)
├── lib/
│   ├── api.ts            # instância central do Axios
│   └── queryClient.ts    # QueryClient do TanStack Query
├── components/           # componentes reutilizáveis (Chakra UI)
├── features/             # módulos de negócio (ex.: fleet, clientes, financeiro)
│   └── <feature>/
│       ├── api/          # hooks de query/mutation (TanStack Query)
│       ├── components/   # UI da feature
│       └── schemas/      # schemas Zod
├── hooks/                # hooks genéricos
├── theme/               # tema/tokens do Chakra UI
└── types/                # tipos TypeScript compartilhados
```

> Prefira organização **por feature**. Componentes verdadeiramente genéricos vão em `components/`.

---

## 4. Padrões de integração

### Providers (App.tsx)
A árvore deve envolver a aplicação com, no mínimo:
- `ChakraProvider` (tema do design system)
- `QueryClientProvider` (TanStack Query)
- `BrowserRouter` (React Router)

### Instância do Axios (`src/lib/api.ts`)
- Uma única instância exportada, com `baseURL` vinda de variável de ambiente Vite (`import.meta.env.VITE_API_URL`).
- Interceptor de request para anexar o **token JWT**.
- Interceptor de response para tratar `401` (renovar/redirecionar para login).

### TanStack Query
- Chaves de query estáveis e tipadas.
- Invalidar caches após mutations.
- Evitar `refetch` manual quando a invalidação resolve.

### Formulários
- `useForm({ resolver: zodResolver(schema) })`.
- Integrar campos do Chakra UI (`FormControl`, `Input`, etc.) com `register`/`Controller`.

---

## 5. Variáveis de ambiente

Prefixo obrigatório **`VITE_`** para exposição ao client. Exemplo (`frontend/.env.local`):

```
VITE_API_URL=http://localhost:8000/api
```

Nunca colocar segredos no frontend — apenas configuração pública.

---

## 6. Scripts

```bash
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # type-check (tsc -b) + build de produção
npm run preview   # pré-visualização do build
npm run lint      # linter
```

---

## 7. Pendências de implementação

- [ ] Configurar `ChakraProvider`, `QueryClientProvider` e `BrowserRouter` em `App.tsx`.
- [ ] Criar a instância central do Axios com interceptor JWT.
- [ ] Definir o tema do Chakra UI em `src/theme`.
- [ ] Implementar tela de login consumindo a API JWT do backend.
