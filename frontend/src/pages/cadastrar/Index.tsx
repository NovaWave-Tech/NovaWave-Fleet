import { Box, Flex, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { FiBarChart2, FiShield, FiTrendingUp } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { MarcaNovaWave } from '../../components/MarcaNovaWave'
import { FormularioCadastro } from './components/FormularioCadastro'

const destaques = [
  { icone: FiShield, titulo: 'Mais controle' },
  { icone: FiTrendingUp, titulo: 'Mais eficiência' },
  { icone: FiBarChart2, titulo: 'Mais resultados' },
]

export default function Cadastro() {
  return (
    <Flex minH="100dvh">
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        flex="1.1"
        direction="column"
        justify="space-between"
        p="12"
        color="white"
        bg="linear-gradient(150deg, #0f62fe 0%, #2563eb 48%, #22c55e 135%)"
      >
        <MarcaNovaWave variante="claro" />

        <Stack gap="6" maxW="md">
          <Heading size="3xl" lineHeight="1.1" fontWeight="bold">
            Comece a gerir sua frota em minutos.
          </Heading>
          <Text fontSize="lg" opacity="0.9">
            Crie a conta da sua transportadora e centralize veículos, motoristas,
            abastecimentos e custos em um só lugar.
          </Text>
          <Stack gap="3" pt="2">
            {destaques.map(({ icone: Icone, titulo }) => (
              <HStack key={titulo} gap="3">
                <Box bg="whiteAlpha.300" rounded="full" p="2">
                  <Icone />
                </Box>
                <Text fontWeight="medium">{titulo}</Text>
              </HStack>
            ))}
          </Stack>
        </Stack>

        <Text fontSize="xs" opacity="0.7">
          © {new Date().getFullYear()} NovaWave Fleet
        </Text>
      </Flex>

      <Flex flex="1" align="center" justify="center" p={{ base: '6', md: '12' }} bg="fundo">
        <Box w="full" maxW="md">
          <Stack gap="8">
            <Stack gap="3">
              <Box display={{ base: 'block', lg: 'none' }}>
                <MarcaNovaWave />
              </Box>
              <Stack gap="1">
                <Heading size="xl" color="gray.900">
                  Criar conta
                </Heading>
                <Text color="gray.500">Cadastre sua transportadora no NovaWave Fleet.</Text>
              </Stack>
            </Stack>

            <FormularioCadastro />

            <Text fontSize="sm" color="gray.500" textAlign="center">
              Já tem conta?{' '}
              <Link asChild color="brand.fg" fontWeight="medium">
                <RouterLink to="/login">Entrar</RouterLink>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
