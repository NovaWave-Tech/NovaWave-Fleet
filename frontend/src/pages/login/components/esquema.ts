import { z } from 'zod'

export const esquemaLogin = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Informe o e-mail')
    .email('Informe um e-mail válido'),
  senha: z.string().min(1, 'Informe a senha'),
})

export type DadosLogin = z.infer<typeof esquemaLogin>
