import type { IconType } from 'react-icons'
import {
  FiAlertTriangle,
  FiBarChart2,
  FiCpu,
  FiDollarSign,
  FiDroplet,
  FiFileText,
  FiGrid,
  FiSearch,
  FiSettings,
  FiTool,
  FiTruck,
  FiUsers,
} from 'react-icons/fi'

export interface ItemMenu {
  rotulo: string
  caminho: string
  icone: IconType
  secao: string
}

export const secoesMenu = ['Operação', 'Gestão', 'Sistema'] as const

export const itemPainel: ItemMenu = {
  rotulo: 'Painel operacional',
  caminho: '/dashboard',
  icone: FiGrid,
  secao: 'Painel',
}

export const itensMenu: ItemMenu[] = [
  { rotulo: 'Veículos', caminho: '/veiculos', icone: FiTruck, secao: 'Operação' },
  { rotulo: 'Motoristas', caminho: '/motoristas', icone: FiUsers, secao: 'Operação' },
  { rotulo: 'Abastecimentos', caminho: '/abastecimentos', icone: FiDroplet, secao: 'Operação' },
  { rotulo: 'Manutenções', caminho: '/manutencoes', icone: FiTool, secao: 'Operação' },
  { rotulo: 'Custos', caminho: '/custos', icone: FiDollarSign, secao: 'Gestão' },
  { rotulo: 'Documentos', caminho: '/documentos', icone: FiFileText, secao: 'Gestão' },
  { rotulo: 'Multas', caminho: '/multas', icone: FiAlertTriangle, secao: 'Gestão' },
  { rotulo: 'Relatórios', caminho: '/relatorios', icone: FiBarChart2, secao: 'Gestão' },
  { rotulo: 'IA', caminho: '/ia', icone: FiCpu, secao: 'Sistema' },
  { rotulo: 'Auditoria', caminho: '/auditoria', icone: FiSearch, secao: 'Sistema' },
  { rotulo: 'Configurações', caminho: '/configuracoes', icone: FiSettings, secao: 'Sistema' },
]

export const todosItens: ItemMenu[] = [itemPainel, ...itensMenu]
