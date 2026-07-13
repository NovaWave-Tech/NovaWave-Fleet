import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { LayoutAutenticacao } from '../../components/LayoutAutenticacao'
import { FormularioLogin } from './components/FormularioLogin'

export default function Login() {
  return (
    <LayoutAutenticacao>
      <Stack gap="8">
        <Stack gap="1.5">
          <Heading size="xl" color="gray.900" letterSpacing="-0.01em">
            Acessar o painel
          </Heading>
          <Text color="gray.500">Entre com os dados da sua conta.</Text>
        </Stack>

        <FormularioLogin />

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Ainda não usa o NovaWave Fleet?{' '}
          <Link asChild color="brand.fg" fontWeight="semibold">
            <RouterLink to="/cadastrar">Cadastre sua transportadora</RouterLink>
          </Link>
        </Text>
      </Stack>
    </LayoutAutenticacao>
  )
}
