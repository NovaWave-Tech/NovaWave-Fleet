import { Grid, SimpleGrid, Stack } from '@chakra-ui/react'
import { FiActivity, FiDollarSign, FiDroplet, FiPieChart, FiTruck, FiUsers } from 'react-icons/fi'
import { Cartao } from '../../components/Cartao'
import { EstadoVazio } from '../../components/EstadoVazio'
import { BoasVindas } from './components/BoasVindas'
import { CartaoKpi } from './components/CartaoKpi'
import { PrimeirosPassos } from './components/PrimeirosPassos'

const kpis = [
  { rotulo: 'Veículos ativos', icone: FiTruck },
  { rotulo: 'Motoristas', icone: FiUsers },
  { rotulo: 'Abastecimentos no mês', icone: FiDroplet },
  { rotulo: 'Custos no mês', icone: FiDollarSign },
]

export default function Dashboard() {
  return (
    <Stack gap="6">
      <BoasVindas />

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="5">
        {kpis.map((kpi) => (
          <CartaoKpi key={kpi.rotulo} rotulo={kpi.rotulo} icone={kpi.icone} />
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', xl: '3fr 2fr' }} gap="6" alignItems="start">
        <PrimeirosPassos />

        <Stack gap="6">
          <Cartao titulo="Custos do mês">
            <EstadoVazio
              icone={FiPieChart}
              titulo="Sem custos ainda"
              descricao="Os gráficos aparecem conforme você registra abastecimentos e manutenções."
              alturaMin="160px"
            />
          </Cartao>
          <Cartao titulo="Atividade recente">
            <EstadoVazio
              icone={FiActivity}
              titulo="Nenhuma atividade"
              descricao="As últimas movimentações da sua frota aparecerão aqui."
              alturaMin="160px"
            />
          </Cartao>
        </Stack>
      </Grid>
    </Stack>
  )
}
