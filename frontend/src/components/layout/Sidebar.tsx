import { Box, chakra, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { itemPainel, itensMenu, secoesMenu, type ItemMenu } from './itensMenu'
import { StatusFrotaSidebar, type ResumoFrota } from './StatusFrotaSidebar'

const LinkNav = chakra(RouterLink)

interface SidebarProps {
  recolhida?: boolean
  aoAlternar?: () => void
  aoNavegar?: () => void
  mostrarBotaoRecolher?: boolean
  frota: ResumoFrota
}

export function Sidebar({
  recolhida = false,
  aoAlternar,
  aoNavegar,
  mostrarBotaoRecolher = true,
  frota,
}: SidebarProps) {
  const { pathname } = useLocation()

  const item = (dado: ItemMenu) => {
    const ativo = pathname === dado.caminho || pathname.startsWith(`${dado.caminho}/`)
    return (
      <LinkNav
        key={dado.caminho}
        to={dado.caminho}
        onClick={aoNavegar}
        title={recolhida ? dado.rotulo : undefined}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent={recolhida ? 'center' : 'flex-start'}
        gap="3"
        px="3"
        py="2.5"
        rounded="md"
        fontSize="sm"
        fontWeight={ativo ? '600' : '500'}
        color={ativo ? 'white' : 'whiteAlpha.700'}
        bg={ativo ? 'whiteAlpha.200' : 'transparent'}
        _hover={{ bg: ativo ? 'whiteAlpha.200' : 'whiteAlpha.100', color: 'white' }}
        transition="background 0.15s ease, color 0.15s ease"
      >
        {ativo && (
          <Box position="absolute" left="0" insetY="1.5" w="3px" rounded="full" bg="operacional" />
        )}
        <Icon as={dado.icone} boxSize="5" flexShrink="0" color={ativo ? 'operacional' : 'whiteAlpha.600'} />
        {!recolhida && <Text as="span">{dado.rotulo}</Text>}
      </LinkNav>
    )
  }

  return (
    <Flex
      direction="column"
      h="full"
      w={recolhida ? '76px' : '264px'}
      bg="brand.900"
      transition="width 0.2s ease"
    >
      <Stack as="nav" gap={recolhida ? '2' : '5'} px="3" py="4" flex="1" overflowY="auto">
        <Stack gap="1">{item(itemPainel)}</Stack>

        {secoesMenu.map((secao) => {
          const itens = itensMenu.filter((i) => i.secao === secao)
          return (
            <Stack key={secao} gap="1">
              {recolhida ? (
                <Box h="1px" bg="whiteAlpha.100" mx="2" mb="1" />
              ) : (
                <Text
                  px="3"
                  pb="1"
                  fontSize="2xs"
                  fontWeight="600"
                  color="whiteAlpha.400"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                >
                  {secao}
                </Text>
              )}
              {itens.map(item)}
            </Stack>
          )
        })}
      </Stack>

      {!recolhida && <StatusFrotaSidebar frota={frota} />}

      {mostrarBotaoRecolher && (
        <Box borderTopWidth="1px" borderColor="whiteAlpha.100" p="3">
          <HStack
            as="button"
            w="full"
            gap="3"
            px="3"
            py="2.5"
            rounded="md"
            color="whiteAlpha.600"
            justify={recolhida ? 'center' : 'flex-start'}
            _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
            transition="background 0.15s ease, color 0.15s ease"
            onClick={aoAlternar}
          >
            <Icon as={recolhida ? FiChevronRight : FiChevronLeft} boxSize="5" />
            {!recolhida && (
              <Text as="span" fontSize="sm" fontWeight="500">
                Recolher
              </Text>
            )}
          </HStack>
        </Box>
      )}
    </Flex>
  )
}
