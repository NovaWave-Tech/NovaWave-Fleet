import { Box, HStack, Stack, Text } from '@chakra-ui/react'

export interface ResumoFrota {
  ativos: number
  manutencao: number
  parados: number
}

const linhas = [
  { cor: 'sucesso', chave: 'ativos', rotulo: 'ativos' },
  { cor: 'atencao', chave: 'manutencao', rotulo: 'manutenção' },
  { cor: 'perigo', chave: 'parados', rotulo: 'parados' },
] as const

export function StatusFrotaSidebar({ frota }: { frota: ResumoFrota }) {
  return (
    <Box borderTopWidth="1px" borderColor="whiteAlpha.100" px="4" py="4">
      <Text
        fontSize="2xs"
        fontWeight="600"
        color="whiteAlpha.500"
        textTransform="uppercase"
        letterSpacing="0.08em"
        mb="3"
      >
        Frota operacional
      </Text>
      <Stack gap="2.5">
        {linhas.map((linha) => (
          <HStack key={linha.chave} gap="2.5">
            <Box boxSize="2" rounded="full" bg={linha.cor} flexShrink="0" />
            <Text fontSize="sm" fontWeight="600" color="white" minW="6">
              {frota[linha.chave]}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600">
              {linha.rotulo}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  )
}
