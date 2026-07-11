import { api, limparToken, salvarToken } from './api'

export interface Usuario {
  idusuario: number
  nome: string
  email: string
  idempresa: number
  idfilial: number | null
  telefone: string | null
  cargo: string | null
  situacao: number
}

export interface CredenciaisLogin {
  email: string
  senha: string
}

export interface RespostaLogin {
  token: string
  tipo: string
  expira_em: number
  usuario: Usuario
}

/** Autentica no backend e guarda o token JWT. */
export async function logar(credenciais: CredenciaisLogin): Promise<RespostaLogin> {
  const { data } = await api.post<RespostaLogin>('/login', credenciais)
  salvarToken(data.token)
  return data
}

/** Encerra a sessão no backend e limpa o token local. */
export async function sair(): Promise<void> {
  try {
    await api.post('/sair')
  } finally {
    limparToken()
  }
}
