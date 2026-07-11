import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Cartao } from '../../../components/Cartao'
import { formatarMoeda } from '../../../utils/formato'
import { custoMensal, custoTotalMes, variacaoCusto } from './dados'

export function CustoMensal() {
  const positivo = variacaoCusto >= 0

  return (
    <Cartao titulo="Custo da frota (mês)" h="full">
      <Stack gap="5">
        <HStack align="baseline" gap="3">
          <Text fontSize="3xl" fontWeight="bold" color="gray.900">
            {formatarMoeda(custoTotalMes)}
          </Text>
          <HStack
            gap="1"
            color={positivo ? 'sucesso' : 'perigo'}
            fontSize="sm"
            fontWeight="semibold"
          >
            <Icon as={positivo ? FiTrendingUp : FiTrendingDown} />
            <Text>
              {positivo ? '+' : ''}
              {variacaoCusto}%
            </Text>
          </HStack>
        </HStack>

        <Box h="220px">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={custoMensal} margin={{ top: 5, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCusto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef2f6" />
              <XAxis
                dataKey="dia"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(valor) => [formatarMoeda(Number(valor)), 'Custo']}
                labelFormatter={(dia) => `Dia ${dia}`}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#2563eb"
                strokeWidth={2}
                fill="url(#gradCusto)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Cartao>
  )
}
