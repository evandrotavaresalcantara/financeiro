import { TransacaoProps } from 'core'
import ValorDetalhadoDTO from './ValorDetalhadoDTO'

export default interface TransacaoDTO extends TransacaoProps {
    valoresDetalhados?: ValorDetalhadoDTO[]
}
