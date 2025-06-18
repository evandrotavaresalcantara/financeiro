import AgruparPorCartao from '../../src/extrato/filter/AgruparPorCartao'
import AgruparPorConta from '../../src/extrato/filter/AgruparPorConta'
import AgruparPorData from '../../src/extrato/filter/AgruparPorData'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve agrupar por data', () => {
    const data1 = new Date('2025/1/1')
    const data2 = new Date('2025/1/3')
    const transacoes = [
        TransacaoBuilder.criar().comData(data1).agora(),
        TransacaoBuilder.criar().comData(data1).agora(),
        TransacaoBuilder.criar().comData(data2).agora(),
        TransacaoBuilder.criar().comData(data2).agora(),
    ]
    const agrupadas = AgruparPorData.aplicar()(transacoes)    
    const mesmoGrupo1 = agrupadas[0]!.agruparPor === agrupadas[1]!.agruparPor
    const mesmoGrupo2 = agrupadas[2]!.agruparPor === agrupadas[3]!.agruparPor
    expect(mesmoGrupo1).toBe(true)
    expect(mesmoGrupo2).toBe(true)
})
