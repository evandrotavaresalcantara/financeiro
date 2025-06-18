import ConsultarExtrato from '../../src/extrato/service/ConsultarExtrato'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'

test('Deve consultar o extrato corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const consultarConta = new ConsultarExtrato(new ColecaoExtratoMemoria()).executar(
        new Date(),
        usuario
    )
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar o extrato', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const consultarConta = await new ConsultarExtrato(new ColecaoExtratoMemoria()).executar(
        new Date(),
        usuario
    )

    expect(consultarConta.comoFalha).toBeTruthy()
})

test('Deve gerar um erro com data inválida', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultarConta = await new ConsultarExtrato(new ColecaoExtratoMemoria()).executar(
        'invalido' as any,
        usuario
    )

    expect(consultarConta.deuErrado).toBe(true)
})

test('Deve gerar um erro ao consultar por id', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultarConta = await new ConsultarExtrato(new ColecaoExtratoMemoria(true)).executar(
        new Date(),
        usuario
    )

    expect(consultarConta.deuErrado).toBe(true)
})
