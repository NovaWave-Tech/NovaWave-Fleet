import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { type Usuario } from '../../../service/auth'
import { obterUsuario } from '../../../service/http'

export function BoasVindas() {
  const usuario = obterUsuario<Usuario>()
  const primeiroNome = usuario?.nome?.trim().split(/\s+/)[0] ?? 'bem-vindo'

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'stretch', md: 'center' }}
      gap="4"
    >
      <Stack gap="1">
        <Heading size="xl" color="gray.900">
          Olá, {primeiroNome} 👋
        </Heading>
        <Text color="gray.500">
          Bem-vindo ao NovaWave Fleet. Vamos configurar sua frota para começar.
        </Text>
      </Stack>
      <Button asChild colorPalette="brand" size="lg" flexShrink="0">
        <RouterLink to="/veiculos">
          <FiPlus /> Cadastrar veículo
        </RouterLink>
      </Button>
    </Flex>
  )
}
