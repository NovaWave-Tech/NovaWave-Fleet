import { Circle, Icon, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'

interface EstadoVazioProps {
  icone: IconType
  titulo: string
  descricao?: string
  acao?: ReactNode
  alturaMin?: string
}

export function EstadoVazio({ icone, titulo, descricao, acao, alturaMin = '220px' }: EstadoVazioProps) {
  return (
    <Stack align="center" justify="center" textAlign="center" gap="4" minH={alturaMin} py="8">
      <Circle size="14" bg="brand.subtle" color="brand.solid">
        <Icon as={icone} boxSize="6" />
      </Circle>
      <Stack gap="1" maxW="sm">
        <Text fontWeight="semibold" color="gray.900">
          {titulo}
        </Text>
        {descricao && (
          <Text fontSize="sm" color="gray.500">
            {descricao}
          </Text>
        )}
      </Stack>
      {acao}
    </Stack>
  )
}
