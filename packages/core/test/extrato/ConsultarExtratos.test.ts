import ConsultarExtratos from '../../src/extrato/service/ConsultarExtratos'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'

test('Deve consultar os extratos corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const consultarConta = new ConsultarExtratos(new ColecaoExtratoMemoria()).executar(
        [new Date()],
        usuario
    )
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar os extratos', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const consultarConta = new ConsultarExtratos(new ColecaoExtratoMemoria()).executar(
        [new Date()],
        usuario
    )

    return consultarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
