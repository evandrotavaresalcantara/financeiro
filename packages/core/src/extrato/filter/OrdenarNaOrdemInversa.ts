import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'OrdenarNaOrdemInversa',
    aplicar: () => (transacoes) => transacoes.reverse(),
} as FiltroTransacao
