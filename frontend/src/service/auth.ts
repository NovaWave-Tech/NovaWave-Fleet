import http, { limparAuth, salvarAuth } from './http'

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

export async function logar(credenciais: CredenciaisLogin): Promise<RespostaLogin> {
  const { data } = await http.post<RespostaLogin>('/login', credenciais)
  salvarAuth(data.token, data.expira_em, data.usuario)
  return data
}

export async function sair(): Promise<void> {
  try {
    await http.post('/sair')
  } finally {
    limparAuth()
  }
}

export async function perfil(): Promise<Usuario> {
  const { data } = await http.get<{ data: Usuario }>('/perfil')
  return data.data
}
