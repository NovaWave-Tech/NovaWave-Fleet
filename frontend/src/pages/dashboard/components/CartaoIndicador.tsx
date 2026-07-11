import { Box, Circle, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { formatarNumero } from '../../../utils/formato'
import type { Indicador } from './dados'

export function CartaoIndicador({ indicador }: { indicador: Indicador }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="borda" rounded="xl" p="5" boxShadow="xs">
      <HStack justify="space-between" align="start">
        <Stack gap="1">
          <Text fontSize="sm" color="gray.500">
            {indicador.rotulo}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.900" lineHeight="1">
            {formatarNumero(indicador.valor)}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {indicador.detalhe}
          </Text>
        </Stack>
        <Circle size="12" bg={indicador.cor} color="white">
          <Icon as={indicador.icone} boxSize="5" />
        </Circle>
      </HStack>
    </Box>
  )
}
