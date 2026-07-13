import { z } from 'zod'

/** Aplica a máscara 00.000.000/0000-00 enquanto o usuário digita. */
export function formatarCnpj(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 14)
  return digitos
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export const esquemaCadastro = z
  .object({
    nome: z.string().trim().min(1, 'Informe seu nome'),
    nome_empresa: z.string().trim().min(1, 'Informe o nome da empresa'),
    cnpj: z
      .string()
      .trim()
      .refine(
        (v) => v === '' || /^\d{14}$/.test(v.replace(/\D/g, '')),
        'O CNPJ deve ter 14 dígitos',
      ),
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
