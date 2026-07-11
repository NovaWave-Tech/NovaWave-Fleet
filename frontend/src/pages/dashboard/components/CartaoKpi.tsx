import { Box, Circle, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

interface CartaoKpiProps {
  rotulo: string
  icone: IconType
}

export function CartaoKpi({ rotulo, icone }: CartaoKpiProps) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="borda" rounded="xl" p="5" boxShadow="xs">
      <HStack justify="space-between" align="center">
        <Stack gap="1">
          <Text fontSize="sm" color="gray.500">
            {rotulo}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.300" lineHeight="1">
            —
          </Text>
          <Text fontSize="xs" color="gray.400">
            Sem dados ainda
          </Text>
        </Stack>
        <Circle size="12" bg="brand.subtle" color="brand.solid">
          <Icon as={icone} boxSize="5" />
        </Circle>
      </HStack>
    </Box>
  )
}
