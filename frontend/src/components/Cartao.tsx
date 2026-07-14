import { Box, type BoxProps, Heading, HStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface CartaoProps extends BoxProps {
  titulo?: string
  acao?: ReactNode
}

export function Cartao({ titulo, acao, children, ...rest }: CartaoProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="borda"
      rounded="lg"
      p="5"
      boxShadow="cartao"
      {...rest}
    >
      {(titulo || acao) && (
        <HStack justify="space-between" mb="4" gap="3">
          {titulo && (
            <Heading size="sm" fontWeight="600" color="tinta">
              {titulo}
            </Heading>
          )}
          {acao}
        </HStack>
      )}
      {children}
    </Box>
  )
}
