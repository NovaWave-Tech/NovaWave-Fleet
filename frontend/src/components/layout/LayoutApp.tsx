import { Box, Drawer, Flex, Portal } from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PaletaComandos } from '../PaletaComandos'
import { Sidebar } from './Sidebar'
import type { ResumoFrota } from './StatusFrotaSidebar'
import { Topbar } from './Topbar'

// Sem dados/endpoints ainda — a frota reflete zero.
const frota: ResumoFrota = { ativos: 0, manutencao: 0, parados: 0 }

export function LayoutApp() {
  const [recolhida, setRecolhida] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const [buscaAberta, setBuscaAberta] = useState(false)

  return (
    <Flex direction="column" h="100dvh" bg="fundo">
      <Topbar
        aoAbrirMenu={() => setMenuAberto(true)}
        aoAbrirBusca={() => setBuscaAberta(true)}
        frota={frota}
      />

      <Flex flex="1" overflow="hidden">
        <Box display={{ base: 'none', lg: 'block' }} flexShrink="0" h="full">
          <Sidebar recolhida={recolhida} aoAlternar={() => setRecolhida((v) => !v)} frota={frota} />
        </Box>

        <Drawer.Root open={menuAberto} onOpenChange={(e) => setMenuAberto(e.open)} placement="start">
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content w="auto" maxW="264px" bg="brand.900">
                <Sidebar
                  mostrarBotaoRecolher={false}
                  aoNavegar={() => setMenuAberto(false)}
                  frota={frota}
                />
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>

        <Box as="main" flex="1" minW="0" overflowY="auto" p={{ base: '4', md: '6' }}>
          <Outlet />
        </Box>
      </Flex>

      <PaletaComandos aberta={buscaAberta} definirAberta={setBuscaAberta} />
    </Flex>
  )
}
