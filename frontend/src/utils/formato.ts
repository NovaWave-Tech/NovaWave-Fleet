const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const decimal2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const inteiro = new Intl.NumberFormat('pt-BR')

export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '')
}

export function formatarMoeda(valor: number): string {
  return moeda.format(valor)
}

export function formatarNumero(valor: number): string {
  return inteiro.format(valor)
}

export function formatarQuilometragem(km: number): string {
  return `${inteiro.format(km)} km`
}

export function formatarLitros(litros: number): string {
  return `${decimal2.format(litros)} L`
}

export function formatarConsumo(kmPorLitro: number): string {
  return `${decimal2.format(kmPorLitro)} km/L`
}

export function formatarPercentual(valor: number): string {
  return `${decimal2.format(valor)}%`
}

export function formatarCpf(valor: string): string {
  return apenasDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatarCnpj(valor: string): string {
  return apenasDigitos(valor)
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

export function formatarCpfCnpj(valor: string): string {
  return apenasDigitos(valor).length > 11 ? formatarCnpj(valor) : formatarCpf(valor)
}

export function formatarTelefone(valor: string): string {
  const d = apenasDigitos(valor).slice(0, 11)
  if (d.length <= 10) {
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2')
  }
  return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

export function formatarPlaca(valor: string): string {
  const p = valor
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 7)
  return p.length > 3 ? `${p.slice(0, 3)}-${p.slice(3)}` : p
}

export function formatarRenavam(valor: string): string {
  return apenasDigitos(valor).slice(0, 11)
}

export function formatarCnh(valor: string): string {
  return apenasDigitos(valor).slice(0, 11)
}

export function formatarData(valor: string | Date): string {
  const data = typeof valor === 'string' ? new Date(valor) : valor
  return new Intl.DateTimeFormat('pt-BR').format(data)
}

export function formatarDataHora(valor: string | Date): string {
  const data = typeof valor === 'string' ? new Date(valor) : valor
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(data)
}
