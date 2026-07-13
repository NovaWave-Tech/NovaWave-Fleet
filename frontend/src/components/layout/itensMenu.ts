import type { IconType } from 'react-icons'
import {
  FiAlertTriangle,
  FiBarChart2,
  FiDroplet,
  FiFileText,
  FiGrid,
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

/** Ordem de exibição das seções na sidebar. */
export const secoesMenu = ['Principal', 'Operação', 'Gestão', 'Sistema'] as const

export const itensMenu: ItemMenu[] = [
  { rotulo: 'Dashboard', caminho: '/dashboard', icone: FiGrid, secao: 'Principal' },
  { rotulo: 'Veículos', caminho: '/veiculos', icone: FiTruck, secao: 'Operação' },
  { rotulo: 'Motoristas', caminho: '/motoristas', icone: FiUsers, secao: 'Operação' },
  { rotulo: 'Abastecimentos', caminho: '/abastecimentos', icone: FiDroplet, secao: 'Operação' },
  { rotulo: 'Manutenções', caminho: '/manutencoes', icone: FiTool, secao: 'Operação' },
  { rotulo: 'Documentos', caminho: '/documentos', icone: FiFileText, secao: 'Gestão' },
  { rotulo: 'Ocorrências', caminho: '/ocorrencias', icone: FiAlertTriangle, secao: 'Gestão' },
  { rotulo: 'Relatórios', caminho: '/relatorios', icone: FiBarChart2, secao: 'Gestão' },
  { rotulo: 'Configurações', caminho: '/configuracoes', icone: FiSettings, secao: 'Sistema' },
]
