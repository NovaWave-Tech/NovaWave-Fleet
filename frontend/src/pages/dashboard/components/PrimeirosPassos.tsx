import { Box, chakra, Circle, HStack, Icon, Progress, Stack, Text } from '@chakra-ui/react'
import { FiChevronRight, FiSettings, FiTool, FiTruck, FiUsers } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { Cartao } from '../../../components/Cartao'

const LinkPasso = chakra(RouterLink)

const passos = [
  {
    icone: FiTruck,
    titulo: 'Cadastre seus veículos',
    descricao: 'Monte sua frota com placas, modelos e documentos.',
    caminho: '/veiculos',
  },
  {
    icone: FiUsers,
    titulo: 'Adicione motoristas',
    descricao: 'Registre condutores e seus vínculos com a frota.',
    caminho: '/motoristas',
  },
  {
    icone: FiTool,
    titulo: 'Registre abastecimentos e manutenções',
    descricao: 'Acompanhe custos e a saúde de cada veículo.',
    caminho: '/abastecimentos',
  },
  {
    icone: FiSettings,
    titulo: 'Configure filiais e usuários',
    descricao: 'Organize sua operação e as permissões da equipe.',
    caminho: '/configuracoes',
  },
]

export function PrimeirosPassos() {
  return (
    <Cartao>
      <Stack gap="5">
        <HStack justify="space-between" align="start">
          <Stack gap="0.5">
            <Text fontWeight="semibold" fontSize="lg" color="gray.900">
              Primeiros passos
            </Text>
            <Text fontSize="sm" color="gray.500">
              Complete a configuração para aproveitar todo o NovaWave Fleet.
            </Text>
          </Stack>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" flexShrink="0">
            0 de {passos.length}
          </Text>
        </HStack>

        <Progress.Root value={0} size="sm" colorPalette="brand" rounded="full">
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <Stack gap="1">
          {passos.map((passo) => (
            <LinkPasso
              key={passo.caminho}
              to={passo.caminho}
              display="flex"
              alignItems="center"
              gap="4"
              p="3"
              rounded="lg"
              _hover={{ bg: 'gray.50' }}
            >
              <Circle size="10" bg="brand.subtle" color="brand.solid" flexShrink="0">
                <Icon as={passo.icone} boxSize="5" />
              </Circle>
              <Box flex="1" minW="0">
                <Text fontWeight="medium" color="gray.900">
                  {passo.titulo}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {passo.descricao}
                </Text>
              </Box>
              <Icon as={FiChevronRight} color="gray.400" flexShrink="0" />
            </LinkPasso>
          ))}
        </Stack>
      </Stack>
    </Cartao>
  )
}
