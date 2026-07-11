import axios, { AxiosError, type AxiosInstance } from 'axios'
import { showError } from '../utils/alertas'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

const CHAVE_TOKEN = 'novawave.token'
const CHAVE_EXP = 'novawave.token_exp'
const CHAVE_USUARIO = 'novawave.usuario'

// ---- Helpers de autenticação (localStorage) ----

export function obterToken(): string | null {
  return localStorage.getItem(CHAVE_TOKEN)
}

/** Verifica se o token existe e ainda não expirou. */
export function tokenValido(): boolean {
  const exp = localStorage.getItem(CHAVE_EXP)
  if (!obterToken() || !exp) return false
  return Number(exp) > Date.now() / 1000
}

export function salvarAuth(token: string, expiraEm: number, usuario: unknown): void {
  localStorage.setItem(CHAVE_TOKEN, token)
  localStorage.setItem(CHAVE_EXP, String(Date.now() / 1000 + expiraEm))
  localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario))
}

export function limparAuth(): void {
  localStorage.removeItem(CHAVE_TOKEN)
  localStorage.removeItem(CHAVE_EXP)
  localStorage.removeItem(CHAVE_USUARIO)
}

export function obterUsuario<T = unknown>(): T | null {
  const usuario = localStorage.getItem(CHAVE_USUARIO)
  return usuario ? (JSON.parse(usuario) as T) : null
}

// ---- Instância central do Axios ----

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Anexa o token JWT quando válido.
http.interceptors.request.use((config) => {
  const token = obterToken()
  if (token && tokenValido()) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Trata erros de forma central: 401/403 desloga; demais mostram alerta.
http.interceptors.response.use(
  (resposta) => resposta,
  (erro: AxiosError<{ mensagem?: string; message?: string }>) => {
    const status = erro.response?.status
    const mensagem = erro.response?.data?.mensagem ?? erro.response?.data?.message

    if (status === 401 || status === 403) {
      limparAuth()
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
      return Promise.reject(erro)
    }

    if (mensagem) showError(mensagem)
    else if (status === 400) showError('Requisição inválida. Verifique os dados.')
    else if (status === 404) showError('Recurso não encontrado.')
    else if (status && status >= 500) showError('Erro no servidor. Tente novamente mais tarde.')
    else showError(erro.message || 'Erro ao processar a requisição.')

    return Promise.reject(erro)
  },
)

export default http
