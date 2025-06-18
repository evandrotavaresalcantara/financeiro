import Cor from "../../src/shared/types/Cor"

test('Deve criar cor', () => {
    const criarCor = Cor.nova('#000000')
    expect(criarCor.deuCerto).toBe(true)
})

test('Deve gerar erro com cor inválida', () => {
    const criarCor = Cor.nova('#00')
    expect(criarCor.deuErrado).toBe(true)
})