import { Circle, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import { Cartao } from '../../../components/Cartao'
import { ultimasOcorrencias, type Ocorrencia } from './dados'

const estilo: Record<Ocorrencia['tom'], { bg: string; cor: string; icone: IconType }> = {
  perigo: { bg: 'red.50', cor: 'perigo', icone: FiAlertTriangle },
  atencao: { bg: 'orange.50', cor: 'atencao', icone: FiAlertCircle },
  sucesso: { bg: 'green.50', cor: 'sucesso', icone: FiCheckCircle },
}

export function UltimasOcorrencias() {
  return (
    <Cartao titulo="Últimas ocorrências" h="full">
      <Stack gap="1">
        {ultimasOcorrencias.map((ocorrencia) => {
          const e = estilo[ocorrencia.tom]
          return (
            <HStack key={ocorrencia.titulo} gap="3" py="2.5">
              <Circle size="9" bg={e.bg} color={e.cor} flexShrink="0">
                <Icon as={e.icone} boxSize="4" />
              </Circle>
              <Stack gap="0" flex="1" minW="0">
                <Text fontSize="sm" fontWeight="medium" color="gray.900">
                  {ocorrencia.titulo}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {ocorrencia.placa}
                </Text>
              </Stack>
              <Text fontSize="xs" color="gray.400" flexShrink="0">
                {ocorrencia.quando}
              </Text>
            </HStack>
          )
        })}
      </Stack>
    </Cartao>
  )
}
