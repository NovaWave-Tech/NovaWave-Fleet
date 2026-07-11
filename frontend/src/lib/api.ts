import axios from 'axios'

const CHAVE_TOKEN = 'novawave.token'

export function obterToken(): string | null {
  return localStorage.getItem(CHAVE_TOKEN)
}

export function salvarToken(token: string): void {
  localStorage.setItem(CHAVE_TOKEN, token)
}

export function limparToken(): void {
  localStorage.removeItem(CHAVE_TOKEN)
}

/** Instância central do Axios usada por toda a aplicação. */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Anexa o token JWT em toda requisição.
api.interceptors.request.use((config) => {
  const token = obterToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Em 401, limpa o token e volta para o login (exceto na própria tela de login).
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401 && !location.pathname.startsWith('/login')) {
      limparToken()
      location.assign('/login')
    }
    return Promise.reject(erro)
  },
)
