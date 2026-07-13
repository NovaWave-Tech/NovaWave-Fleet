import { Box, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

interface CartaoKpiProps {
  rotulo: string
  icone: IconType
}

export function CartaoKpi({ rotulo, icone }: CartaoKpiProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="borda"
      rounded="xl"
      p="5"
      boxShadow="xs"
      transition="border-color 0.15s ease, box-shadow 0.15s ease"
      _hover={{ borderColor: 'brand.emphasized', boxShadow: 'sm' }}
    >
      <HStack justify="space-between" align="flex-start">
        <Stack gap="2">
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="0.05em"
          >
            {rotulo}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.300" lineHeight="1">
            —
          </Text>
          <Text fontSize="xs" color="gray.400">
            Sem registros no período
          </Text>
        </Stack>
        <Flex
          align="center"
          justify="center"
          boxSize="11"
          rounded="lg"
          bg="brand.subtle"
          color="brand.solid"
          flexShrink="0"
        >
          <Icon as={icone} boxSize="5" />
        </Flex>
      </HStack>
    </Box>
  )
}
