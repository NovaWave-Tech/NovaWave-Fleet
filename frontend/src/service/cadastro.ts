import type { RespostaLogin } from './auth'
import http, { salvarAuth } from './http'

export interface DadosCadastro {
  nome: string
  nome_empresa: string
  cnpj?: string
  email: string
  senha: string
  senha_confirmation: string
}

export async function cadastrar(dados: DadosCadastro): Promise<RespostaLogin> {
  const { data } = await http.post<RespostaLogin>('/cadastrar', dados)
  salvarAuth(data.token, data.expira_em, data.usuario)
  return data
}
