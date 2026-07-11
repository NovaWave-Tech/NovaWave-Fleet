import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { FiBarChart2, FiShield, FiTrendingUp } from 'react-icons/fi'
import { MarcaNovaWave } from '../../components/MarcaNovaWave'
import { FormularioLogin } from './components/FormularioLogin'

const destaques = [
  { icone: FiShield, titulo: 'Mais controle' },
  { icone: FiTrendingUp, titulo: 'Mais eficiência' },
  { icone: FiBarChart2, titulo: 'Mais resultados' },
]

export default function Login() {
  return (
    <Flex minH="100dvh">
      {/* Painel da marca */}
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
            Gestão inteligente para sua frota, sempre em movimento.
          </Heading>
          <Text fontSize="lg" opacity="0.9">
            Veículos, motoristas, abastecimentos, manutenções e custos — tudo em
            um só lugar, com os dados que geram melhores decisões.
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

      {/* Painel do formulário */}
      <Flex flex="1" align="center" justify="center" p={{ base: '6', md: '12' }} bg="fundo">
        <Box w="full" maxW="sm">
          <Stack gap="8">
            <Stack gap="3">
              <Box display={{ base: 'block', lg: 'none' }}>
                <MarcaNovaWave />
              </Box>
              <Stack gap="1">
                <Heading size="xl" color="gray.900">
                  Entrar
                </Heading>
                <Text color="gray.500">
                  Acesse o painel da sua transportadora.
                </Text>
              </Stack>
            </Stack>

            <FormularioLogin />
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
