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
}

export const itensMenu: ItemMenu[] = [
  { rotulo: 'Dashboard', caminho: '/dashboard', icone: FiGrid },
  { rotulo: 'Veículos', caminho: '/veiculos', icone: FiTruck },
  { rotulo: 'Motoristas', caminho: '/motoristas', icone: FiUsers },
  { rotulo: 'Abastecimentos', caminho: '/abastecimentos', icone: FiDroplet },
  { rotulo: 'Manutenções', caminho: '/manutencoes', icone: FiTool },
  { rotulo: 'Documentos', caminho: '/documentos', icone: FiFileText },
  { rotulo: 'Ocorrências', caminho: '/ocorrencias', icone: FiAlertTriangle },
  { rotulo: 'Relatórios', caminho: '/relatorios', icone: FiBarChart2 },
  { rotulo: 'Configurações', caminho: '/configuracoes', icone: FiSettings },
]
