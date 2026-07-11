import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Cartao } from '../../../components/Cartao'
import { formatarMoeda } from '../../../utils/formato'
import { custosCategoria } from './dados'

const total = custosCategoria.reduce((soma, c) => soma + c.valor, 0)

export function CustosPorCategoria() {
  return (
    <Cartao titulo="Custos por categoria" h="full">
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap="6">
        <Box position="relative" w="180px" h="180px" flexShrink="0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={custosCategoria}
                dataKey="valor"
                nameKey="categoria"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                stroke="none"
              >
                {custosCategoria.map((c) => (
                  <Cell key={c.categoria} fill={c.cor} />
                ))}
              </Pie>
              <Tooltip formatter={(valor, nome) => [formatarMoeda(Number(valor)), nome]} />
            </PieChart>
          </ResponsiveContainer>
          <Flex
            position="absolute"
            inset="0"
            direction="column"
            align="center"
            justify="center"
            pointerEvents="none"
          >
            <Text fontSize="xs" color="gray.500">
              Total
            </Text>
            <Text fontSize="md" fontWeight="bold" color="gray.900">
              {formatarMoeda(total)}
            </Text>
          </Flex>
        </Box>

        <Stack gap="3" flex="1" w="full">
          {custosCategoria.map((c) => {
            const pct = Math.round((c.valor / total) * 100)
            return (
              <HStack key={c.categoria} justify="space-between">
                <HStack gap="2.5">
                  <Box w="3" h="3" rounded="full" bg={c.cor} />
                  <Text fontSize="sm" color="gray.700">
                    {c.categoria}
                  </Text>
                </HStack>
                <HStack gap="3">
                  <Text fontSize="sm" fontWeight="medium" color="gray.900">
                    {formatarMoeda(c.valor)}
                  </Text>
                  <Text fontSize="xs" color="gray.400" w="9" textAlign="right">
                    {pct}%
                  </Text>
                </HStack>
              </HStack>
            )
          })}
        </Stack>
      </Flex>
    </Cartao>
  )
}
