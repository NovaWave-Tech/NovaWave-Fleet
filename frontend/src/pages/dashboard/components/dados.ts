import type { IconType } from 'react-icons'
import { FiSlash, FiTool, FiTruck } from 'react-icons/fi'

// Dados ilustrativos — serão substituídos por endpoints reais.

export interface Indicador {
  rotulo: string
  valor: number
  detalhe: string
  icone: IconType
  cor: string
}

export const indicadores: Indicador[] = [
  { rotulo: 'Em operação', valor: 24, detalhe: 'Veículos rodando', icone: FiTruck, cor: 'sucesso' },
  { rotulo: 'Em manutenção', valor: 5, detalhe: 'Na oficina', icone: FiTool, cor: 'atencao' },
  { rotulo: 'Parados', valor: 3, detalhe: 'Sem operação', icone: FiSlash, cor: 'perigo' },
  { rotulo: 'Total da frota', valor: 32, detalhe: 'Veículos ativos', icone: FiTruck, cor: 'secundaria' },
]

export interface StatusItem {
  rotulo: string
  valor: number
  cor: string
}

export const statusFrota: StatusItem[] = [
  { rotulo: 'Em operação', valor: 24, cor: 'sucesso' },
  { rotulo: 'Em manutenção', valor: 5, cor: 'atencao' },
  { rotulo: 'Parado', valor: 3, cor: 'perigo' },
  { rotulo: 'Indisponível', valor: 2, cor: 'cinza' },
]

export interface PontoCusto {
  dia: string
  valor: number
}

export const custoMensal: PontoCusto[] = [
  { dia: '01', valor: 3200 },
  { dia: '04', valor: 4100 },
  { dia: '07', valor: 3800 },
  { dia: '10', valor: 5200 },
  { dia: '13', valor: 4700 },
  { dia: '16', valor: 6100 },
  { dia: '19', valor: 5600 },
  { dia: '22', valor: 7200 },
  { dia: '25', valor: 6800 },
  { dia: '28', valor: 8300 },
  { dia: '30', valor: 9100 },
]

export const custoTotalMes = 125430.75
export const variacaoCusto = 8.5

export interface CategoriaCusto {
  categoria: string
  valor: number
  cor: string
}

export const custosCategoria: CategoriaCusto[] = [
  { categoria: 'Combustível', valor: 77768, cor: '#2563eb' },
  { categoria: 'Manutenção', valor: 22654, cor: '#22c55e' },
  { categoria: 'Pedágios', valor: 12543, cor: '#f59e0b' },
  { categoria: 'Outros', valor: 12465, cor: '#8b5cf6' },
]

export interface Ocorrencia {
  titulo: string
  placa: string
  quando: string
  tom: 'perigo' | 'atencao' | 'sucesso'
}

export const ultimasOcorrencias: Ocorrencia[] = [
  { titulo: 'Troca de óleo vencida', placa: 'ABC-1234', quando: 'Hoje, 09:15', tom: 'perigo' },
  { titulo: 'Pneu dianteiro furado', placa: 'DEF-5678', quando: 'Hoje, 07:42', tom: 'atencao' },
  { titulo: 'Abastecimento realizado', placa: 'GHI-9012', quando: 'Hoje, 06:30', tom: 'sucesso' },
]
