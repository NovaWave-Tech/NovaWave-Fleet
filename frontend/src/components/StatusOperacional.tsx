import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiCircle, FiPauseCircle, FiSlash, FiTool, FiTruck } from 'react-icons/fi'

export type Situacao = 'operando' | 'manutencao' | 'parado' | 'disponivel' | 'inativo'

interface DefinicaoStatus {
  texto: string
  cor: string
  icone: IconType
}

export const statusFrota: Record<Situacao, DefinicaoStatus> = {
  operando: { texto: 'Operando', cor: 'sucesso', icone: FiTruck },
  manutencao: { texto: 'Manutenção', cor: 'atencao', icone: FiTool },
  parado: { texto: 'Parado', cor: 'perigo', icone: FiSlash },
  disponivel: { texto: 'Disponível', cor: 'operacional', icone: FiPauseCircle },
  inativo: { texto: 'Inativo', cor: 'gray.500', icone: FiCircle },
}

interface StatusOperacionalProps {
  situacao: Situacao
  tamanho?: 'sm' | 'md'
}

export function StatusOperacional({ situacao, tamanho = 'md' }: StatusOperacionalProps) {
  const { texto, cor, icone } = statusFrota[situacao]
  return (
    <HStack
      gap="1.5"
      display="inline-flex"
      px="2"
      py={tamanho === 'sm' ? '0.5' : '1'}
      rounded="md"
      bg={`${cor}/12`}
    >
      <Icon as={icone} color={cor} boxSize={tamanho === 'sm' ? '3' : '3.5'} />
      <Text fontSize={tamanho === 'sm' ? 'xs' : 'sm'} fontWeight="500" color={cor} lineHeight="1">
        {texto}
      </Text>
    </HStack>
  )
}

interface PontoStatusProps {
  cor: string
}

export function PontoStatus({ cor }: PontoStatusProps) {
  return <Box boxSize="2" rounded="full" bg={cor} flexShrink="0" />
}
