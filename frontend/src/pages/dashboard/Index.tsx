import { Box, Flex, Grid, Heading, HStack, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import {
  FiActivity,
  FiAlertTriangle,
  FiBarChart2,
  FiCalendar,
  FiChevronDown,
  FiDollarSign,
  FiDroplet,
  FiFileText,
  FiMap,
  FiPieChart,
  FiSlash,
  FiTool,
  FiTrendingUp,
  FiTruck,
  FiUsers,
} from 'react-icons/fi'
import { CartaoKpi } from './components/CartaoKpi'
import { PainelVazio } from './components/PainelVazio'

const kpis = [
  { rotulo: 'Veículos ativos', icone: FiTruck, cor: 'sucesso' },
  { rotulo: 'Em manutenção', icone: FiTool, cor: 'atencao' },
  { rotulo: 'Veículos parados', icone: FiSlash, cor: 'perigo' },
  { rotulo: 'Custos do mês', icone: FiDollarSign, cor: 'secundaria' },
  { rotulo: 'Consumo médio', icone: FiDroplet, cor: 'secundaria' },
  { rotulo: 'Disponibilidade', icone: FiActivity, cor: 'operacional' },
]

const operacao = [
  { titulo: 'Evolução dos custos', icone: FiTrendingUp, mensagem: 'O gráfico aparece quando houver lançamentos de custo.' },
  { titulo: 'Mapa operacional', icone: FiMap, mensagem: 'Posição da frota via rastreamento GPS (em breve).' },
  { titulo: 'Distribuição da frota', icone: FiPieChart, mensagem: 'Distribuição por status e filial quando houver veículos.' },
]

const acompanhamento = [
  { titulo: 'Próximas manutenções', icone: FiTool, mensagem: 'Preventivas e corretivas programadas.' },
  { titulo: 'Documentos vencendo', icone: FiFileText, mensagem: 'CRLV, CNH e demais documentos a vencer.' },
  { titulo: 'Eventos recentes', icone: FiActivity, mensagem: 'Últimas movimentações da operação.' },
  { titulo: 'Alertas operacionais', icone: FiAlertTriangle, mensagem: 'Ocorrências que exigem atenção.' },
]

const desempenho = [
  { titulo: 'Ranking de veículos', icone: FiTruck, mensagem: 'Veículos por custo, consumo e disponibilidade.' },
  { titulo: 'Ranking de motoristas', icone: FiUsers, mensagem: 'Desempenho e condução por motorista.' },
  { titulo: 'Eficiência operacional', icone: FiBarChart2, mensagem: 'Indicadores consolidados da operação.' },
]

export default function Dashboard() {
  return (
    <Stack gap="6">
      <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap="4" wrap="wrap">
        <Stack gap="0.5">
          <Heading size="lg" fontWeight="600" color="tinta">
            Visão geral
          </Heading>
          <Text color="tintaSuave" fontSize="sm">
            Panorama operacional da frota.
          </Text>
        </Stack>
        <HStack
          as="button"
          gap="2.5"
          px="3"
          py="2"
          rounded="md"
          bg="white"
          borderWidth="1px"
          borderColor="borda"
          _hover={{ bg: 'fundo' }}
        >
          <Icon as={FiCalendar} color="tintaSuave" boxSize="4" />
          <Text fontSize="sm" fontWeight="500" color="tinta">
            Este mês
          </Text>
          <Icon as={FiChevronDown} color="gray.400" boxSize="4" />
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 6 }} gap="4">
        {kpis.map((kpi) => (
          <CartaoKpi key={kpi.rotulo} rotulo={kpi.rotulo} icone={kpi.icone} cor={kpi.cor} />
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '1.6fr 1.4fr 1.2fr' }} gap="5">
        {operacao.map((p) => (
          <PainelVazio key={p.titulo} titulo={p.titulo} icone={p.icone} mensagem={p.mensagem} alturaMin="200px" />
        ))}
      </Grid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="5">
        {acompanhamento.map((p) => (
          <PainelVazio key={p.titulo} titulo={p.titulo} icone={p.icone} mensagem={p.mensagem} />
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="5">
        {desempenho.map((p) => (
          <PainelVazio key={p.titulo} titulo={p.titulo} icone={p.icone} mensagem={p.mensagem} />
        ))}
      </SimpleGrid>

      <Box h="1" />
    </Stack>
  )
}
