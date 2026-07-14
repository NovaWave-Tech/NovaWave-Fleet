import { Flex, Icon, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'

interface EstadoVazioProps {
  icone: IconType
  titulo: string
  descricao?: string
  acao?: ReactNode
  alturaMin?: string
}

export function EstadoVazio({ icone, titulo, descricao, acao, alturaMin = '180px' }: EstadoVazioProps) {
  return (
    <Stack align="center" justify="center" textAlign="center" gap="3" minH={alturaMin} py="6">
      <Flex align="center" justify="center" boxSize="12" rounded="lg" bg="fundo" color="gray.400">
        <Icon as={icone} boxSize="5" />
      </Flex>
      <Stack gap="1" maxW="xs">
        <Text fontSize="sm" fontWeight="600" color="tinta">
          {titulo}
        </Text>
        {descricao && (
          <Text fontSize="sm" color="tintaSuave">
            {descricao}
          </Text>
        )}
      </Stack>
      {acao}
    </Stack>
  )
}
