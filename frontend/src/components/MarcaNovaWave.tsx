import { Box, HStack, Stack, Text } from '@chakra-ui/react'

interface MarcaNovaWaveProps {
  variante?: 'claro' | 'escuro'
  tamanho?: number
  somenteIcone?: boolean
}

export function MarcaNovaWave({
  variante = 'escuro',
  tamanho = 40,
  somenteIcone = false,
}: MarcaNovaWaveProps) {
  const corTexto = variante === 'claro' ? 'white' : 'gray.900'

  const icone = (
    <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M5 31 C 12 17, 18 17, 24 27 S 36 37, 43 15"
        stroke="#0f62fe"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M5 40 C 12 26, 18 26, 24 36 S 36 46, 43 24"
        stroke="#22c55e"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )

  if (somenteIcone) return icone

  return (
    <HStack gap="3" align="center">
      {icone}
      <Stack gap="0" lineHeight="1">
        <Text fontWeight="bold" fontSize="xl" letterSpacing="-0.02em" color={corTexto}>
          Nova
          <Box as="span" color={variante === 'claro' ? 'white' : 'secundaria'}>
            Wave
          </Box>
        </Text>
        <Text fontWeight="semibold" fontSize="sm" color="sucesso" letterSpacing="0.02em">
          Fleet
        </Text>
      </Stack>
    </HStack>
  )
}
