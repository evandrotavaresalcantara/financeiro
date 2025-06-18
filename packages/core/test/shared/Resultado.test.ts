import Resultado from '../../src/shared/base/Resultado'

test('Deve criar um resultado com sucesso', () => {
    const resultado = Resultado.ok(1)

    expect(resultado.deuCerto).toBe(true)
    expect(resultado.deuErrado).toBe(false)
    expect(resultado.instancia).toEqual(1)
    expect(resultado.erros).toBeUndefined()
})

test('Deve criar um resultado com erro', () => {
    const resultado = Resultado.falha('erro')

    expect(resultado.deuCerto).toBe(false)
    expect(resultado.deuErrado).toBe(true)
    expect(resultado.instancia).toBeUndefined()
    expect(resultado.erros).toEqual([{ tipo: 'erro' }])
})

test('Deve combinar resultados de sucesso', () => {
    const resultados = Resultado.combinar<any>([
        Resultado.ok(1),
        Resultado.ok('x'),
        Resultado.ok(3),
    ])

    expect(resultados.deuCerto).toBeTruthy()
    expect(resultados.deuErrado).toBeFalsy()
    expect(resultados.instancia).toEqual([1, 'x', 3])
    expect(resultados.erros).toBeUndefined()
})

test('Deve combinar resultados de falha com causas', () => {
    const resultados = Resultado.combinar([
        Resultado.ok(1),
        Resultado.falha({ tipo: 'x', valor: 2 }),
        Resultado.ok(3),
        Resultado.falha({ tipo: 'y', valor: 4 }),
    ])

    const err = JSON.stringify(resultados.erros)

    expect(resultados.deuCerto).toBeFalsy()
    expect(resultados.deuErrado).toBeTruthy()
    expect(err).toEqual(
        JSON.stringify([
            { tipo: 'x', valor: 2 },
            { tipo: 'y', valor: 4 },
        ])
    )
})

test('Deve combinar resultados de falha sem causas', () => {
    const resultados = Resultado.combinar([
        Resultado.ok(1),
        Resultado.falha('x'),
        Resultado.ok(3),
        Resultado.falha('y'),
    ])

    const err = JSON.stringify(resultados.erros)

    expect(resultados.deuCerto).toBeFalsy()
    expect(resultados.deuErrado).toBeTruthy()
    expect(err).toEqual(JSON.stringify([{ tipo: 'x' }, { tipo: 'y' }]))
})

test('Deve tentar executar uma função com erro', async () => {
    const resultado = await Resultado.tentar(() => {
        throw new Error('x')
    })

    expect(resultado.deuCerto).toBeFalsy()
    expect(resultado.deuErrado).toBeTruthy()
    expect(resultado.erros).toEqual([{ tipo: 'x' }])
})

test('Deve lançar error se deu errado', () => {
    const resultado = Resultado.falha('x')
    try {
        resultado.lancarErrorSeDeuErrado()
    } catch (e: any) {
        expect(e).toEqual([{ tipo: 'x' }])
    }
})

test('Deve retornar erro se valor for undefined', () => {
    const resultado = new Resultado(undefined)
    expect(resultado.erros).toEqual([{ tipo: 'RESULTADO_UNDEFINED' }])
})
