import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FiActivity, FiDollarSign, FiTruck, FiUsers } from 'react-icons/fi'
import { CartaoKpi } from './components/CartaoKpi'
import { InicioOperacao } from './components/InicioOperacao'
import { RecursosOperacao } from './components/RecursosOperacao'

const kpis = [
  { rotulo: 'Veículos', icone: FiTruck, cor: 'secundaria', valor: '0' },
  { rotulo: 'Motoristas', icone: FiUsers, cor: 'secundaria', valor: '0' },
  { rotulo: 'Em operação', icone: FiActivity, cor: 'sucesso', valor: '0' },
  { rotulo: 'Custos do mês', icone: FiDollarSign, cor: 'operacional', valor: 'R$ 0,00' },
]

export default function Dashboard() {
  return (
    <Stack gap="6">
      <Stack gap="0.5">
        <Heading size="lg" fontWeight="600" color="tinta">
          Visão geral
        </Heading>
        <Text color="tintaSuave" fontSize="sm">
          Panorama operacional da frota.
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 2, lg: 4 }} gap="4">
        {kpis.map((kpi) => (
          <CartaoKpi key={kpi.rotulo} rotulo={kpi.rotulo} icone={kpi.icone} cor={kpi.cor} valor={kpi.valor} />
        ))}
      </SimpleGrid>

      <InicioOperacao />

      <RecursosOperacao />
    </Stack>
  )
}
