import {
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FiBell, FiChevronDown, FiLogOut, FiMenu } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { obterUsuario } from '../../service/http'
import { sair, type Usuario } from '../../service/auth'
import { itensMenu } from './itensMenu'

function iniciais(nome: string): string {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? '')
    .join('')
}

interface TopbarProps {
  aoAbrirMenu: () => void
}

export function Topbar({ aoAbrirMenu }: TopbarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const usuario = obterUsuario<Usuario>()

  const titulo =
    itensMenu.find((item) => pathname.startsWith(item.caminho))?.rotulo ?? 'NovaWave Fleet'

  const aoSair = async () => {
    await sair()
    navigate('/login', { replace: true })
  }

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      h="16"
      px={{ base: '4', md: '6' }}
      bg="white"
      borderBottomWidth="1px"
      borderColor="borda"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <HStack gap="3">
        <IconButton
          aria-label="Abrir menu"
          variant="ghost"
          display={{ base: 'inline-flex', lg: 'none' }}
          onClick={aoAbrirMenu}
        >
          <FiMenu />
        </IconButton>
        <Heading size="md" color="gray.900">
          {titulo}
        </Heading>
      </HStack>

      <HStack gap={{ base: '1', md: '3' }}>
        <IconButton aria-label="Notificações" variant="ghost" rounded="full" color="gray.500">
          <FiBell />
        </IconButton>

        <Menu.Root onSelect={(d) => d.value === 'sair' && aoSair()}>
          <Menu.Trigger asChild>
            <HStack as="button" gap="3" px="2" py="1.5" rounded="lg" _hover={{ bg: 'gray.100' }}>
              <Circle size="9" bg="brand.solid" color="white" fontWeight="semibold" fontSize="sm">
                {usuario ? iniciais(usuario.nome) : '?'}
              </Circle>
              <Stack gap="0" textAlign="left" display={{ base: 'none', md: 'flex' }}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.900" lineHeight="1.2">
                  {usuario?.nome ?? 'Usuário'}
                </Text>
                <Text fontSize="xs" color="gray.500" lineHeight="1.2">
                  {usuario?.cargo ?? '—'}
                </Text>
              </Stack>
              <Icon as={FiChevronDown} color="gray.400" display={{ base: 'none', md: 'block' }} />
            </HStack>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="56">
                <Stack gap="0" px="3" py="2">
                  <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                    {usuario?.nome ?? 'Usuário'}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {usuario?.email ?? ''}
                  </Text>
                </Stack>
                <Menu.Separator />
                <Menu.Item value="sair" color="perigo">
                  <Icon as={FiLogOut} /> Sair da conta
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
    </Flex>
  )
}
