import { Grid, SimpleGrid, Stack } from '@chakra-ui/react'
import { CartaoIndicador } from './components/CartaoIndicador'
import { CustoMensal } from './components/CustoMensal'
import { CustosPorCategoria } from './components/CustosPorCategoria'
import { indicadores } from './components/dados'
import { LocalizacaoFrota } from './components/LocalizacaoFrota'
import { StatusFrota } from './components/StatusFrota'
import { UltimasOcorrencias } from './components/UltimasOcorrencias'

export default function Dashboard() {
  return (
    <Stack gap="6">
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="5">
        {indicadores.map((indicador) => (
          <CartaoIndicador key={indicador.rotulo} indicador={indicador} />
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '1.4fr 1fr' }} gap="6">
        <LocalizacaoFrota />
        <CustoMensal />
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="6">
        <CustosPorCategoria />
        <UltimasOcorrencias />
      </Grid>

      <StatusFrota />
    </Stack>
  )
}
