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
      rounded="xl"
      p="5"
      boxShadow="xs"
      {...rest}
    >
      {(titulo || acao) && (
        <HStack justify="space-between" mb="4">
          {titulo && (
            <Heading size="md" color="gray.900">
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
