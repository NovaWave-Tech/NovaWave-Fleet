import { Box, chakra, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { itensMenu, secoesMenu } from './itensMenu'

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
      h="full"
      w={recolhida ? '72px' : '240px'}
      bg="white"
      borderRightWidth="1px"
      borderColor="borda"
      transition="width 0.2s ease"
    >
      <Stack as="nav" gap={recolhida ? '2' : '5'} px="3" py="4" flex="1" overflowY="auto">
        {secoesMenu.map((secao, indice) => {
          const itens = itensMenu.filter((item) => item.secao === secao)
          if (itens.length === 0) return null

          return (
            <Stack key={secao} gap="1">
              {recolhida
                ? indice > 0 && <Box h="1px" bg="borda" mx="2" mb="1" />
                : (
                    <Text
                      px="3"
                      pb="1"
                      fontSize="2xs"
                      fontWeight="600"
                      color="gray.400"
                      textTransform="uppercase"
                      letterSpacing="0.07em"
                    >
                      {secao}
                    </Text>
                  )}

              {itens.map((item) => {
                const ativo =
                  pathname === item.caminho || pathname.startsWith(`${item.caminho}/`)
                return (
                  <LinkNav
                    key={item.caminho}
                    to={item.caminho}
                    onClick={aoNavegar}
                    title={recolhida ? item.rotulo : undefined}
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
                    color={ativo ? 'brand.solid' : 'tintaSuave'}
                    bg={ativo ? 'brand.subtle' : 'transparent'}
                    _hover={{ bg: ativo ? 'brand.subtle' : 'fundo', color: ativo ? 'brand.solid' : 'tinta' }}
                    transition="background 0.15s ease, color 0.15s ease"
                  >
                    {ativo && (
                      <Box
                        position="absolute"
                        left="0"
                        insetY="1.5"
                        w="3px"
                        rounded="full"
                        bg="operacional"
                      />
                    )}
                    <Icon
                      as={item.icone}
                      boxSize="5"
                      flexShrink="0"
                      color={ativo ? 'operacional' : 'gray.500'}
                    />
                    {!recolhida && <Text as="span">{item.rotulo}</Text>}
                  </LinkNav>
                )
              })}
            </Stack>
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
            rounded="md"
            color="tintaSuave"
            justify={recolhida ? 'center' : 'flex-start'}
            _hover={{ bg: 'fundo', color: 'tinta' }}
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
