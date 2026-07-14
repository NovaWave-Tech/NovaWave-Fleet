import {
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  Kbd,
  Menu,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FiBell, FiBriefcase, FiChevronDown, FiLogOut, FiMenu, FiSearch, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { sair, type Usuario } from '../../service/auth'
import { obterUsuario } from '../../service/http'
import { MarcaNovaWave } from '../MarcaNovaWave'
import { RelogioOperacional } from './RelogioOperacional'
import { ResumoOperacional } from './ResumoOperacional'
import type { ResumoFrota } from './StatusFrotaSidebar'

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
  aoAbrirBusca: () => void
  frota: ResumoFrota
}

export function Topbar({ aoAbrirMenu, aoAbrirBusca, frota }: TopbarProps) {
  const navigate = useNavigate()
  const usuario = obterUsuario<Usuario>()

  const aoSair = async () => {
    await sair()
    navigate('/login', { replace: true })
  }

  return (
    <Flex
      as="header"
      align="center"
      gap={{ base: '3', md: '4' }}
      h="16"
      px={{ base: '3', md: '5' }}
      bg="white"
      borderBottomWidth="1px"
      borderColor="borda"
      flexShrink="0"
    >
      <HStack gap="3" flexShrink="0">
        <IconButton
          aria-label="Abrir menu"
          variant="ghost"
          color="tintaSuave"
          display={{ base: 'inline-flex', lg: 'none' }}
          onClick={aoAbrirMenu}
        >
          <FiMenu />
        </IconButton>
        <MarcaNovaWave tamanho={32} />
      </HStack>

      <Box display={{ base: 'none', xl: 'block' }}>
        <ResumoOperacional frota={frota} />
      </Box>

      <HStack gap={{ base: '1.5', md: '3' }} ml="auto" flexShrink="0">
        <HStack
          as="button"
          onClick={aoAbrirBusca}
          display={{ base: 'none', md: 'flex' }}
          gap="2.5"
          w="240px"
          px="3"
          h="9"
          rounded="md"
          bg="fundo"
          borderWidth="1px"
          borderColor="borda"
          color="gray.400"
          _hover={{ borderColor: 'brand.200' }}
        >
          <Icon as={FiSearch} boxSize="4" />
          <Text fontSize="sm" flex="1" textAlign="left">
            Buscar...
          </Text>
          <Kbd fontSize="2xs">Ctrl K</Kbd>
        </HStack>

        <IconButton
          aria-label="Buscar"
          variant="ghost"
          color="tintaSuave"
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={aoAbrirBusca}
        >
          <FiSearch />
        </IconButton>

        <HStack
          as="button"
          display={{ base: 'none', lg: 'flex' }}
          gap="2.5"
          px="3"
          py="1.5"
          rounded="md"
          borderWidth="1px"
          borderColor="borda"
          _hover={{ bg: 'fundo' }}
        >
          <Icon as={FiBriefcase} color="tintaSuave" boxSize="4" />
          <Stack gap="0" textAlign="left" lineHeight="1.15">
            <Text fontSize="2xs" color="tintaSuave">
              Empresa · Filial
            </Text>
            <Text fontSize="sm" fontWeight="500" color="tinta">
              Matriz
            </Text>
          </Stack>
          <Icon as={FiChevronDown} color="gray.400" boxSize="4" />
        </HStack>

        <Box display={{ base: 'none', lg: 'block' }}>
          <RelogioOperacional />
        </Box>

        <Box position="relative">
          <IconButton aria-label="Notificações" variant="ghost" rounded="md" color="tintaSuave">
            <FiBell />
          </IconButton>
          <Circle
            size="1.5"
            bg="perigo"
            position="absolute"
            top="2"
            right="2"
            borderWidth="2px"
            borderColor="white"
          />
        </Box>

        <Menu.Root onSelect={(d) => d.value === 'sair' && aoSair()}>
          <Menu.Trigger asChild>
            <HStack as="button" gap="2.5" px="1.5" py="1.5" rounded="md" _hover={{ bg: 'fundo' }}>
              <Circle size="9" bg="brand.solid" color="white" fontWeight="600" fontSize="sm">
                {usuario ? iniciais(usuario.nome) : '?'}
              </Circle>
              <Stack gap="0" textAlign="left" display={{ base: 'none', md: 'flex' }} lineHeight="1.2">
                <Text fontSize="sm" fontWeight="600" color="tinta">
                  {usuario?.nome ?? 'Usuário'}
                </Text>
                <Text fontSize="xs" color="tintaSuave">
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
                  <Text fontSize="sm" fontWeight="600" color="tinta">
                    {usuario?.nome ?? 'Usuário'}
                  </Text>
                  <Text fontSize="xs" color="tintaSuave">
                    {usuario?.email ?? ''}
                  </Text>
                </Stack>
                <Menu.Separator />
                <Menu.Item value="perfil">
                  <Icon as={FiUser} /> Meu perfil
                </Menu.Item>
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
