import { Flex, HStack, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiDollarSign, FiMapPin, FiTool } from 'react-icons/fi'

interface Recurso {
  icone: IconType
  titulo: string
  descricao: string
}

const recursos: Recurso[] = [
  {
    icone: FiDollarSign,
    titulo: 'Custos & abastecimentos',
    descricao: 'Consumo, custo por km e média da frota.',
  },
  {
    icone: FiTool,
    titulo: 'Manutenções & documentos',
    descricao: 'Preventivas, corretivas e vencimentos.',
  },
  {
    icone: FiMapPin,
    titulo: 'Rastreamento GPS',
    descricao: 'Posição e telemetria da frota (em breve).',
  },
]

export function RecursosOperacao() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
      {recursos.map((recurso) => (
        <HStack
          key={recurso.titulo}
          gap="3.5"
          align="flex-start"
          bg="white"
          borderWidth="1px"
          borderColor="borda"
          rounded="lg"
          p="4"
          boxShadow="cartao"
        >
          <Flex boxSize="10" rounded="lg" bg="fundo" color="brand.solid" align="center" justify="center" flexShrink="0">
            <Icon as={recurso.icone} boxSize="5" />
          </Flex>
          <Stack gap="0.5">
            <Text fontSize="sm" fontWeight="600" color="tinta">
              {recurso.titulo}
            </Text>
            <Text fontSize="sm" color="tintaSuave">
              {recurso.descricao}
            </Text>
          </Stack>
        </HStack>
      ))}
    </SimpleGrid>
  )
}
