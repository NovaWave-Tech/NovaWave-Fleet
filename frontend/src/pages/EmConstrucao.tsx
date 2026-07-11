import { Flex } from '@chakra-ui/react'
import { FiTool } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { EstadoVazio } from '../components/EstadoVazio'
import { itensMenu } from '../components/layout/itensMenu'

export default function EmConstrucao() {
  const { pathname } = useLocation()
  const modulo = itensMenu.find((item) => pathname.startsWith(item.caminho))?.rotulo ?? 'Módulo'

  return (
    <Flex minH="60vh" align="center" justify="center">
      <EstadoVazio
        icone={FiTool}
        titulo={`${modulo} em construção`}
        descricao="Este módulo estará disponível em breve."
      />
    </Flex>
  )
}
