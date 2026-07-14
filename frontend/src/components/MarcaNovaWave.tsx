import { Stack, Text } from '@chakra-ui/react'

interface MarcaNovaWaveProps {
  variante?: 'claro' | 'escuro'
  tamanho?: number
  somenteIcone?: boolean
}

export function MarcaNovaWave({
  variante = 'escuro',
  tamanho = 36,
  somenteIcone = false,
}: MarcaNovaWaveProps) {
  const claro = variante === 'claro'
  const badge = claro ? '#ffffff' : '#1e3a5f'
  const rota = claro ? '#1e3a5f' : '#ffffff'

  const icone = (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="NovaWave Fleet"
    >
      <rect width="40" height="40" rx="9" fill={badge} />
      {/* Rota formando N e W (malha rodoviária) */}
      <path
        d="M9 28 V13 L18 28 V13"
        stroke={rota}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 13 L24 28 L27 19 L30 28 L33 13"
        stroke={rota}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  if (somenteIcone) return icone

  return (
    <Stack direction="row" gap="2.5" align="center">
      {icone}
      <Stack gap="0" lineHeight="1.05">
        <Text
          fontSize="lg"
          fontWeight="600"
          letterSpacing="-0.01em"
          color={claro ? 'white' : 'tinta'}
        >
          NovaWave
        </Text>
        <Text
          fontSize="10px"
          fontWeight="600"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={claro ? 'whiteAlpha.700' : 'secundaria'}
        >
          Fleet
        </Text>
      </Stack>
    </Stack>
  )
}
