import { Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { FiTool } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { itensMenu } from '../components/layout/itensMenu'

export default function EmConstrucao() {
  const { pathname } = useLocation()
  const modulo = itensMenu.find((item) => pathname.startsWith(item.caminho))?.rotulo ?? 'Módulo'

  return (
    <Flex minH="60vh" align="center" justify="center">
      <Stack align="center" gap="3" color="gray.500">
        <Icon as={FiTool} boxSize="10" color="brand.solid" />
        <Text fontSize="xl" fontWeight="semibold" color="gray.900">
          {modulo}
        </Text>
        <Text fontSize="sm">Módulo em construção.</Text>
      </Stack>
    </Flex>
  )
}
