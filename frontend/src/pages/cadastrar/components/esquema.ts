import { z } from 'zod'

export const esquemaCadastro = z
  .object({
    nome: z.string().trim().min(1, 'Informe seu nome'),
    nome_empresa: z.string().trim().min(1, 'Informe o nome da empresa'),
    cnpj: z
      .string()
      .trim()
      .refine((v) => v === '' || /^\d{14}$/.test(v), 'O CNPJ deve ter 14 dígitos'),
    email: z
      .string()
      .trim()
      .min(1, 'Informe o e-mail')
      .email('Informe um e-mail válido'),
    senha: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
    senha_confirmation: z.string().min(1, 'Confirme a senha'),
  })
  .refine((d) => d.senha === d.senha_confirmation, {
    message: 'As senhas não conferem',
    path: ['senha_confirmation'],
  })

export type DadosCadastro = z.infer<typeof esquemaCadastro>
