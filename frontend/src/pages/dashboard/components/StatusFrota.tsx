import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { statusFrota } from './dados'

export function StatusFrota() {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
      {statusFrota.map((status) => (
        <Box
          key={status.rotulo}
          bg="white"
          borderWidth="1px"
          borderColor="borda"
          borderLeftWidth="4px"
          borderLeftColor={status.cor}
          rounded="xl"
          p="4"
          boxShadow="xs"
        >
          <Text fontSize="2xl" fontWeight="bold" color="gray.900" lineHeight="1.2">
            {status.valor}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {status.rotulo}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
