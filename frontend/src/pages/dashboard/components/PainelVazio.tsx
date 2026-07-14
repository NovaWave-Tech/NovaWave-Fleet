import type { IconType } from 'react-icons'
import { Cartao } from '../../../components/Cartao'
import { EstadoVazio } from '../../../components/EstadoVazio'

interface PainelVazioProps {
  titulo: string
  icone: IconType
  mensagem: string
  alturaMin?: string
}

export function PainelVazio({ titulo, icone, mensagem, alturaMin = '170px' }: PainelVazioProps) {
  return (
    <Cartao titulo={titulo} h="full">
      <EstadoVazio icone={icone} titulo="Nenhum registro" descricao={mensagem} alturaMin={alturaMin} />
    </Cartao>
  )
}
