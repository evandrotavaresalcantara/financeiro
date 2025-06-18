import Descricao from '../../src/shared/types/Descricao'

test('Deve criar descrição', () => {
    const criarDesc = Descricao.nova('Texto')
    expect(criarDesc.instancia.valor).toBe('Texto')
})

test('Deve criar descrição com tamanho min e max', () => {
    const criarDesc = Descricao.nova('Texto', { min: 3, max: 10 })
    expect(criarDesc.instancia.valor).toBe('Texto')
})

test('Deve falhar descrição com tamanho min e max', () => {
    const criarDesc = Descricao.nova('Te', { min: 3, max: 10 })
    expect(criarDesc.deuErrado).toBe(true)
})
