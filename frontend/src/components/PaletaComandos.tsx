import { Dialog, HStack, Icon, Input, Kbd, Portal, Stack, Text } from '@chakra-ui/react'
import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { todosItens } from './layout/itensMenu'

interface PaletaComandosProps {
  aberta: boolean
  definirAberta: (aberta: boolean) => void
}

export function PaletaComandos({ aberta, definirAberta }: PaletaComandosProps) {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  useEffect(() => {
    const aoTeclar = (evento: KeyboardEvent) => {
      if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 'k') {
        evento.preventDefault()
        definirAberta(true)
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [definirAberta])

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return q ? todosItens.filter((i) => i.rotulo.toLowerCase().includes(q)) : todosItens
  }, [busca])

  const irPara = (caminho: string) => {
    definirAberta(false)
    setBusca('')
    navigate(caminho)
  }

  const aoSubmeter = (evento: FormEvent) => {
    evento.preventDefault()
    if (filtrados[0]) irPara(filtrados[0].caminho)
  }

  return (
    <Dialog.Root
      open={aberta}
      onOpenChange={(e) => definirAberta(e.open)}
      placement="top"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mt="24" overflow="hidden">
            <form onSubmit={aoSubmeter}>
              <HStack px="4" h="12" borderBottomWidth="1px" borderColor="borda" gap="3">
                <Icon as={FiSearch} color="gray.400" />
                <Input
                  autoFocus
                  variant="flushed"
                  border="none"
                  placeholder="Buscar módulos e ações..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  _focusVisible={{ boxShadow: 'none' }}
                />
                <Kbd fontSize="2xs">Esc</Kbd>
              </HStack>
            </form>

            <Stack gap="0.5" maxH="360px" overflowY="auto" p="2">
              {filtrados.length === 0 ? (
                <Text px="3" py="8" textAlign="center" color="tintaSuave" fontSize="sm">
                  Nada encontrado.
                </Text>
              ) : (
                filtrados.map((item) => (
                  <HStack
                    key={item.caminho}
                    as="button"
                    onClick={() => irPara(item.caminho)}
                    w="full"
                    gap="3"
                    px="3"
                    py="2.5"
                    rounded="md"
                    _hover={{ bg: 'fundo' }}
                  >
                    <Icon as={item.icone} color="tintaSuave" boxSize="4" />
                    <Text fontSize="sm" color="tinta" flex="1" textAlign="left">
                      {item.rotulo}
                    </Text>
                    <Text fontSize="2xs" color="gray.400" textTransform="uppercase" letterSpacing="0.05em">
                      {item.secao}
                    </Text>
                  </HStack>
                ))
              )}
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
