import { Box, chakra, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MarcaNovaWave } from '../MarcaNovaWave'
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
      h="100dvh"
      w={recolhida ? '72px' : '260px'}
      bg="brand.950"
      transition="width 0.2s ease"
    >
      <Flex
        align="center"
        justify={recolhida ? 'center' : 'flex-start'}
        h="16"
        px={recolhida ? '0' : '5'}
        borderBottomWidth="1px"
        borderColor="whiteAlpha.100"
        flexShrink="0"
      >
        <MarcaNovaWave variante="claro" somenteIcone={recolhida} tamanho={recolhida ? 32 : 36} />
      </Flex>

      <Stack as="nav" gap={recolhida ? '2' : '5'} px="3" py="5" flex="1" overflowY="auto">
        {secoesMenu.map((secao, indice) => {
          const itens = itensMenu.filter((item) => item.secao === secao)
          if (itens.length === 0) return null

          return (
            <Stack key={secao} gap="1">
              {recolhida ? (
                indice > 0 && <Box h="1px" bg="whiteAlpha.100" mx="2" mb="1" />
              ) : (
                <Text
                  px="3"
                  pb="1"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="whiteAlpha.500"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
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
                    rounded="lg"
                    fontSize="sm"
                    fontWeight="medium"
                    color={ativo ? 'white' : 'whiteAlpha.700'}
                    bg={ativo ? 'whiteAlpha.200' : 'transparent'}
                    _hover={{ bg: ativo ? 'whiteAlpha.200' : 'whiteAlpha.100', color: 'white' }}
                    transition="background 0.15s ease, color 0.15s ease"
                  >
                    {ativo && (
                      <Box
                        position="absolute"
                        left="0"
                        top="50%"
                        transform="translateY(-50%)"
                        w="3px"
                        h="5"
                        rounded="full"
                        bg="brand.400"
                      />
                    )}
                    <Icon as={item.icone} boxSize="5" flexShrink="0" />
                    {!recolhida && <Text as="span">{item.rotulo}</Text>}
                  </LinkNav>
                )
              })}
            </Stack>
          )
        })}
      </Stack>

      {mostrarBotaoRecolher && (
        <Box borderTopWidth="1px" borderColor="whiteAlpha.100" p="3">
          <HStack
            as="button"
            w="full"
            gap="3"
            px="3"
            py="2.5"
            rounded="lg"
            color="whiteAlpha.600"
            justify={recolhida ? 'center' : 'flex-start'}
            _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
            transition="background 0.15s ease, color 0.15s ease"
            onClick={aoAlternar}
          >
            <Icon as={recolhida ? FiChevronRight : FiChevronLeft} boxSize="5" />
            {!recolhida && (
              <Text as="span" fontSize="sm" fontWeight="medium">
                Recolher
              </Text>
            )}
          </HStack>
        </Box>
      )}
    </Flex>
  )
}
