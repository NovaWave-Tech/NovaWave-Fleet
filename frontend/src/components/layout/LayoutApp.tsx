import { Box, Drawer, Flex, Portal } from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function LayoutApp() {
  const [recolhida, setRecolhida] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <Flex minH="100dvh" bg="fundo">
      <Box display={{ base: 'none', lg: 'block' }} position="sticky" top="0" h="100dvh" flexShrink="0">
        <Sidebar recolhida={recolhida} aoAlternar={() => setRecolhida((v) => !v)} />
      </Box>

      <Drawer.Root
        open={menuAberto}
        onOpenChange={(e) => setMenuAberto(e.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content w="auto" maxW="256px">
              <Sidebar
                mostrarBotaoRecolher={false}
                aoNavegar={() => setMenuAberto(false)}
              />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Flex direction="column" flex="1" minW="0">
        <Topbar aoAbrirMenu={() => setMenuAberto(true)} />
        <Box as="main" flex="1" p={{ base: '4', md: '6' }}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
