import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiBarChart2, FiDroplet, FiTool, FiTruck } from 'react-icons/fi'
import { MarcaNovaWave } from './MarcaNovaWave'

interface Destaque {
  icone: IconType
  titulo: string
  descricao: string
}

const destaques: Destaque[] = [
  {
    icone: FiTruck,
    titulo: 'Frota sob controle',
    descricao: 'Veículos, documentos e motoristas em um só painel.',
  },
  {
    icone: FiDroplet,
    titulo: 'Custos monitorados',
    descricao: 'Abastecimentos e despesas por veículo e por filial.',
  },
  {
    icone: FiTool,
    titulo: 'Manutenção em dia',
    descricao: 'Preventivas e corretivas com histórico completo.',
  },
  {
    icone: FiBarChart2,
    titulo: 'Decisões com dados',
    descricao: 'Indicadores e relatórios da operação em tempo real.',
  },
]

const selos = ['Multiempresa', 'Permissões por papel', 'Auditoria completa']

interface LayoutAutenticacaoProps {
  children: ReactNode
  /** Largura máxima da coluna do formulário (o cadastro usa uma coluna mais larga). */
  larguraMax?: string
}

/**
 * Layout das telas públicas (login e cadastro): painel institucional em cor
 * sólida à esquerda e coluna do formulário à direita.
 */
export function LayoutAutenticacao({ children, larguraMax = '400px' }: LayoutAutenticacaoProps) {
  return (
    <Flex minH="100dvh" bg="white">
      {/* Painel institucional (somente desktop) */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        w="44%"
        maxW="600px"
        direction="column"
        justify="space-between"
        gap="10"
        px="14"
        py="12"
        bg="brand.900"
        color="white"
      >
        <MarcaNovaWave variante="claro" />

        <Stack gap="10" maxW="sm">
          <Stack gap="4">
            <Heading size="2xl" fontWeight="600" lineHeight="1.2" color="white" letterSpacing="-0.01em">
              O sistema de gestão da sua transportadora.
            </Heading>
            <Text color="whiteAlpha.800">
              Frota, motoristas, abastecimentos, manutenções e custos — a operação
              inteira em um só lugar.
            </Text>
          </Stack>

          <Stack gap="5">
            {destaques.map(({ icone: Icone, titulo, descricao }) => (
              <HStack key={titulo} gap="4" align="flex-start">
                <Flex
                  align="center"
                  justify="center"
                  boxSize="10"
                  rounded="lg"
                  bg="whiteAlpha.100"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  flexShrink="0"
                >
                  <Icone size="18" />
                </Flex>
                <Stack gap="0.5">
                  <Text fontWeight="semibold" lineHeight="1.3">
                    {titulo}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.700">
                    {descricao}
                  </Text>
                </Stack>
              </HStack>
            ))}
          </Stack>
        </Stack>

        <Stack gap="5">
          <HStack gap="2" flexWrap="wrap">
            {selos.map((selo) => (
              <Text
                key={selo}
                fontSize="xs"
                fontWeight="medium"
                color="whiteAlpha.800"
                borderWidth="1px"
                borderColor="whiteAlpha.300"
                rounded="full"
                px="3"
                py="1"
              >
                {selo}
              </Text>
            ))}
          </HStack>
          <Text fontSize="xs" color="whiteAlpha.600">
            © {new Date().getFullYear()} NovaWave Fleet — Gestão de frotas
          </Text>
        </Stack>
      </Flex>

      {/* Coluna do formulário */}
      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="center"
        px={{ base: '5', md: '12' }}
        py={{ base: '8', md: '12' }}
      >
        <Box w="full" maxW={larguraMax}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Box display={{ base: 'block', lg: 'none' }} mb="8">
              <MarcaNovaWave />
            </Box>
            {children}
          </motion.div>
        </Box>
      </Flex>
    </Flex>
  )
}
