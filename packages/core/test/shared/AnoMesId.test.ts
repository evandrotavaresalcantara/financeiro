import AnoMesId from '../../src/shared/types/AnoMesId'

test('Deve gerar AnoMesId por data', () => {
    const d1 = new Date('2023/03/31')
    const d2 = new Date('2023/04/01')
    const d3 = new Date('2026/01/15')
    
    expect(AnoMesId.novo(d1).instancia.valor).toEqual('2023-03')
    expect(AnoMesId.novo(d2).instancia.valor).toEqual('2023-04')
    expect(AnoMesId.novo(d3).instancia.valor).toEqual('2026-01')
})

test('Deve gerar AnoMesId por string', () => {
    expect(AnoMesId.novo('2023-03-31').instancia.valor).toEqual('2023-03')
})