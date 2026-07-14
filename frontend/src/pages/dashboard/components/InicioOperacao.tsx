import { Box, Button, Flex, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiPlus, FiTruck } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

export function InicioOperacao() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="borda" rounded="lg" p={{ base: '6', md: '8' }} boxShadow="cartao">
      <Flex direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }} justify="space-between" gap="6">
        <HStack gap="5" align="center">
          <Flex
            boxSize="16"
            rounded="xl"
            bg="brand.subtle"
            color="brand.solid"
            align="center"
            justify="center"
            flexShrink="0"
          >
            <Icon as={FiTruck} boxSize="8" />
          </Flex>
          <Stack gap="1.5" maxW="xl">
            <Heading size="md" fontWeight="600" color="tinta">
              Sua frota ainda está vazia
            </Heading>
            <Text color="tintaSuave">
              Cadastre veículos e motoristas para acompanhar custos, abastecimentos,
              manutenções e documentos em tempo real.
            </Text>
          </Stack>
        </HStack>

        <HStack gap="3" flexShrink="0">
          <Button asChild colorPalette="brand" size="lg">
            <RouterLink to="/veiculos">
              <FiPlus /> Cadastrar veículo
            </RouterLink>
          </Button>
          <Button asChild variant="outline" size="lg">
            <RouterLink to="/motoristas">
              <FiPlus /> Motorista
            </RouterLink>
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}
