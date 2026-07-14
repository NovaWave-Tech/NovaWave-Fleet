import {
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
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

      <InputGroup
        flex="1"
        maxW="440px"
        display={{ base: 'none', md: 'flex' }}
        startElement={<Icon as={FiSearch} color="gray.400" />}
      >
        <Input
          placeholder="Buscar veículos, placas, motoristas..."
          bg="fundo"
          borderColor="borda"
          fontSize="sm"
          _placeholder={{ color: 'gray.400' }}
        />
      </InputGroup>

      <HStack gap={{ base: '1.5', md: '3' }} ml="auto" flexShrink="0">
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
