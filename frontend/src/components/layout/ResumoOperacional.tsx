import { Box, HStack, Text } from '@chakra-ui/react'
import type { ResumoFrota } from './StatusFrotaSidebar'

export function ResumoOperacional({ frota }: { frota: ResumoFrota }) {
  const itens = [
    { cor: 'sucesso', valor: frota.ativos, rotulo: 'em rota' },
    { cor: 'atencao', valor: frota.manutencao, rotulo: 'manutenção' },
    { cor: 'perigo', valor: frota.parados, rotulo: 'indisponíveis' },
  ]

  return (
    <HStack gap="4" pl="5" borderLeftWidth="1px" borderColor="borda" h="8">
      {itens.map((i) => (
        <HStack key={i.rotulo} gap="1.5">
          <Box boxSize="2" rounded="full" bg={i.cor} />
          <Text fontSize="sm" fontWeight="600" color="tinta">
            {i.valor}
          </Text>
          <Text fontSize="sm" color="tintaSuave">
            {i.rotulo}
          </Text>
        </HStack>
      ))}
    </HStack>
  )
}
