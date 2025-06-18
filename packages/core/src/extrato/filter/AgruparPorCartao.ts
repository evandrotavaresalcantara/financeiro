import { Cartao } from '../../cartao'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorCartao',
    aplicar: (cartoes: Cartao[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (cartao: Cartao) => cartao.id.valor === transacao.cartaoId
            const cartao = cartoes.find(porId)
            const agruparPor = cartao?.descricao.valor ?? transacao.cartaoId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
