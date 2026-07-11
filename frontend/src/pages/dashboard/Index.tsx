import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MarcaNovaWave } from '../../components/MarcaNovaWave'
import { sair } from '../../service/auth'

export default function Dashboard() {
  const navigate = useNavigate()

  const aoSair = async () => {
    await sair()
    navigate('/login', { replace: true })
  }

  return (
    <Box minH="100dvh" bg="fundo" p={{ base: '6', md: '10' }}>
      <Stack gap="8" maxW="2xl">
        <MarcaNovaWave />
        <Stack gap="2">
          <Heading size="xl">Dashboard</Heading>
          <Text color="gray.600">
            Bem-vindo ao NovaWave Fleet. Esta tela ainda será construída.
          </Text>
        </Stack>
        <Button colorPalette="brand" variant="outline" w="fit-content" onClick={aoSair}>
          Sair
        </Button>
      </Stack>
    </Box>
  )
}
