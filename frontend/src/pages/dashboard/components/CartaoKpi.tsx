import { Box, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

interface CartaoKpiProps {
  rotulo: string
  icone: IconType
  cor: string
  valor?: string
  unidade?: string
}

export function CartaoKpi({ rotulo, icone, cor, valor, unidade }: CartaoKpiProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="borda"
      rounded="lg"
      p="4"
      boxShadow="cartao"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: 'brand.200' }}
    >
      <HStack justify="space-between" align="flex-start" gap="3">
        <Stack gap="1.5" minW="0">
          <Text
            fontSize="2xs"
            fontWeight="600"
            color="tintaSuave"
            textTransform="uppercase"
            letterSpacing="0.05em"
          >
            {rotulo}
          </Text>
          <HStack align="baseline" gap="1">
            <Text fontSize="2xl" fontWeight="600" color={valor ? 'tinta' : 'gray.300'} lineHeight="1">
              {valor ?? '—'}
            </Text>
            {unidade && (
              <Text fontSize="sm" color="tintaSuave">
                {unidade}
              </Text>
            )}
          </HStack>
          {!valor && (
            <Text fontSize="2xs" color="gray.400">
              Sem registros no período
            </Text>
          )}
        </Stack>
        <Flex align="center" justify="center" boxSize="10" rounded="lg" bg={`${cor}/12`} color={cor} flexShrink="0">
          <Icon as={icone} boxSize="5" />
        </Flex>
      </HStack>
    </Box>
  )
}
