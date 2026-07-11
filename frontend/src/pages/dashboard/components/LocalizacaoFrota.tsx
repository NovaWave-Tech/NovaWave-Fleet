import { Flex, Icon, Text } from '@chakra-ui/react'
import { FiMapPin } from 'react-icons/fi'
import { Cartao } from '../../../components/Cartao'

export function LocalizacaoFrota() {
  return (
    <Cartao titulo="Localização da frota" h="full">
      <Flex
        h="full"
        minH="260px"
        direction="column"
        align="center"
        justify="center"
        gap="3"
        rounded="lg"
        bg="gray.50"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="borda"
        color="gray.400"
      >
        <Icon as={FiMapPin} boxSize="8" color="brand.solid" />
        <Text fontSize="sm" fontWeight="medium" color="gray.600">
          Mapa da frota em breve
        </Text>
        <Text fontSize="xs">Rastreamento GPS · telemetria (PostGIS)</Text>
      </Flex>
    </Cartao>
  )
}
