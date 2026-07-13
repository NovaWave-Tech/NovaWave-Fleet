import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { LayoutAutenticacao } from '../../components/LayoutAutenticacao'
import { FormularioCadastro } from './components/FormularioCadastro'

export default function Cadastro() {
  return (
    <LayoutAutenticacao larguraMax="460px">
      <Stack gap="8">
        <Stack gap="1.5">
          <Heading size="xl" color="gray.900" letterSpacing="-0.01em">
            Criar conta
          </Heading>
          <Text color="gray.500">
            Cadastre sua transportadora e comece a operar em minutos.
          </Text>
        </Stack>

        <FormularioCadastro />

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Já tem conta?{' '}
          <Link asChild color="brand.fg" fontWeight="semibold">
            <RouterLink to="/login">Entrar</RouterLink>
          </Link>
        </Text>
      </Stack>
    </LayoutAutenticacao>
  )
}
