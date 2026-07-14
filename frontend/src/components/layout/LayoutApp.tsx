import { Box, Drawer, Flex, Portal } from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function LayoutApp() {
  const [recolhida, setRecolhida] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <Flex direction="column" h="100dvh" bg="fundo">
      <Topbar aoAbrirMenu={() => setMenuAberto(true)} />

      <Flex flex="1" overflow="hidden">
        <Box display={{ base: 'none', lg: 'block' }} flexShrink="0" h="full">
          <Sidebar recolhida={recolhida} aoAlternar={() => setRecolhida((v) => !v)} />
        </Box>

        <Drawer.Root open={menuAberto} onOpenChange={(e) => setMenuAberto(e.open)} placement="start">
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content w="auto" maxW="240px" bg="white">
                <Sidebar mostrarBotaoRecolher={false} aoNavegar={() => setMenuAberto(false)} />
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>

        <Box as="main" flex="1" minW="0" overflowY="auto" p={{ base: '4', md: '6' }}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
