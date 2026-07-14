import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'

export function RelogioOperacional() {
  const [agora, setAgora] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hora = agora.toLocaleTimeString('pt-BR')
  const data = agora.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })

  return (
    <HStack gap="2">
      <Icon as={FiClock} color="tintaSuave" boxSize="4" />
      <Stack gap="0" lineHeight="1.15" textAlign="right">
        <Text fontSize="sm" fontWeight="600" color="tinta" fontVariantNumeric="tabular-nums">
          {hora}
        </Text>
        <Text fontSize="2xs" color="tintaSuave" textTransform="capitalize">
          {data}
        </Text>
      </Stack>
    </HStack>
  )
}
