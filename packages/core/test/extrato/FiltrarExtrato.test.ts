import FiltrarExtrato, { In } from '../../src/extrato/service/FiltrarExtrato'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'

test('Deve filtrar o extrato corretamente', () => {
    const entrada: In = {
        extrato: ExtratoBuilder.criar().agora(),
        filtros: [
            {
                id: '123',
                nome: 'teste',
                grupo: 'teste',
                prioridade: 100,
                params: 1,
            },
        ],
    }
    const filtrarExtrato = new FiltrarExtrato().executar(entrada)
    expect(filtrarExtrato).toBeTruthy()
})

test('Deve gerar um erro ao filtrar o extrato', async () => {
    const entrada: In = {
        extrato: ExtratoBuilder.criar().agora(),
        filtros: [
            {
                id: '123',
                nome: 'teste',
                grupo: 'teste',
                prioridade: 100,
                params: 1,
            },
        ],
    }
    const filtrarExtrato = new FiltrarExtrato().executar(entrada)

    return filtrarExtrato.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
