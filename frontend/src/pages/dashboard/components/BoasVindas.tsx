import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { type Usuario } from '../../../service/auth'
import { obterUsuario } from '../../../service/http'

function dataDeHoje(): string {
  const formatada = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  return formatada.charAt(0).toUpperCase() + formatada.slice(1)
}

export function BoasVindas() {
  const usuario = obterUsuario<Usuario>()
  const primeiroNome = usuario?.nome?.trim().split(/\s+/)[0]

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'stretch', md: 'center' }}
      gap="4"
    >
      <Stack gap="1">
        <Text fontSize="sm" color="gray.500">
          {dataDeHoje()}
        </Text>
        <Heading size="xl" color="gray.900" letterSpacing="-0.01em">
          {primeiroNome ? `Olá, ${primeiroNome}` : 'Olá'}
        </Heading>
        <Text color="gray.500">Este é o panorama da operação da sua frota.</Text>
      </Stack>
      <Button asChild colorPalette="brand" size="lg" fontWeight="semibold" flexShrink="0">
        <RouterLink to="/veiculos">
          <FiPlus /> Cadastrar veículo
        </RouterLink>
      </Button>
    </Flex>
  )
}
