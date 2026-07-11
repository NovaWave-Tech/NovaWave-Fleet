import { Box, chakra, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MarcaNovaWave } from '../MarcaNovaWave'
import { itensMenu } from './itensMenu'

const LinkNav = chakra(RouterLink)

interface SidebarProps {
  recolhida?: boolean
  aoAlternar?: () => void
  aoNavegar?: () => void
  mostrarBotaoRecolher?: boolean
}

export function Sidebar({
  recolhida = false,
  aoAlternar,
  aoNavegar,
  mostrarBotaoRecolher = true,
}: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <Flex
      direction="column"
      h="100dvh"
      w={recolhida ? '76px' : '256px'}
      bg="white"
      borderRightWidth="1px"
      borderColor="borda"
      transition="width 0.2s ease"
    >
      <Flex align="center" justify={recolhida ? 'center' : 'flex-start'} h="16" px={recolhida ? '0' : '5'}>
        <MarcaNovaWave somenteIcone={recolhida} tamanho={recolhida ? 34 : 36} />
      </Flex>

      <Stack as="nav" gap="1" px="3" py="4" flex="1" overflowY="auto">
        {itensMenu.map((item) => {
          const ativo = pathname === item.caminho || pathname.startsWith(`${item.caminho}/`)
          return (
            <LinkNav
              key={item.caminho}
              to={item.caminho}
              onClick={aoNavegar}
              title={recolhida ? item.rotulo : undefined}
              display="flex"
              alignItems="center"
              justifyContent={recolhida ? 'center' : 'flex-start'}
              gap="3"
              px="3"
              py="2.5"
              rounded="lg"
              fontSize="sm"
              fontWeight="medium"
              color={ativo ? 'brand.fg' : 'gray.600'}
              bg={ativo ? 'brand.subtle' : 'transparent'}
              _hover={{ bg: ativo ? 'brand.subtle' : 'gray.100', color: ativo ? 'brand.fg' : 'gray.900' }}
            >
              <Icon as={item.icone} boxSize="5" flexShrink="0" />
              {!recolhida && <Text as="span">{item.rotulo}</Text>}
            </LinkNav>
          )
        })}
      </Stack>

      {mostrarBotaoRecolher && (
        <Box borderTopWidth="1px" borderColor="borda" p="3">
          <HStack
            as="button"
            w="full"
            gap="3"
            px="3"
            py="2.5"
            rounded="lg"
            color="gray.500"
            justify={recolhida ? 'center' : 'flex-start'}
            _hover={{ bg: 'gray.100', color: 'gray.900' }}
            onClick={aoAlternar}
          >
            <Icon as={recolhida ? FiChevronRight : FiChevronLeft} boxSize="5" />
            {!recolhida && <Text as="span" fontSize="sm" fontWeight="medium">Recolher</Text>}
          </HStack>
        </Box>
      )}
    </Flex>
  )
}
