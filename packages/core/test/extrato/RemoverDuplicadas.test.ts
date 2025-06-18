import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import RemoverDuplicadas from '../../src/extrato/filter/RemoverDuplicadas'

test('Deve remover transações duplicadas com a mesma recorrência', () => {
    const transacao1 = TransacaoBuilder.criar()
        .comRecorrenciaId('123')
        .comValor(500)
        .emMemoria()
        .agora()
    const transacao2 = TransacaoBuilder.criar()
        .comRecorrenciaId('123')
        .comValor(500)
        .agora()
    const transacoes = [transacao1, transacao2, transacao1, transacao1, transacao2]
    const novasTransacoes = RemoverDuplicadas.aplicar()(transacoes)
    expect(novasTransacoes).toHaveLength(1)
    expect(novasTransacoes[0]!.valor).toBe(500)
    expect(novasTransacoes[0]!.emMemoria).toBe(false)

})
