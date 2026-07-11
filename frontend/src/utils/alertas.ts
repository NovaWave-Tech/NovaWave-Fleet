import { createToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
  pauseOnPageIdle: true,
})

export function showError(mensagem?: string): void {
  toaster.create({
    title: 'Erro',
    description: mensagem ?? 'Ocorreu um erro. Tente novamente.',
    type: 'error',
    closable: true,
  })
}

export function showSuccess(mensagem?: string): void {
  toaster.create({
    title: 'Sucesso',
    description: mensagem ?? 'Operação realizada com sucesso.',
    type: 'success',
    closable: true,
  })
}

export function showInfo(mensagem: string): void {
  toaster.create({ description: mensagem, type: 'info', closable: true })
}
