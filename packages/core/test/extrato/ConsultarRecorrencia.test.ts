import ConsultarRecorrencia from '../../src/extrato/service/ConsultarRecorrencia'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'

test('Deve consultar as recorrencias corretamente', () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultarConta = new ConsultarRecorrencia(new ColecaoExtratoMemoria()).executar(
        '123',
        usuario
    )
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar as recorrencias', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const consultarConta = new ConsultarRecorrencia(new ColecaoExtratoMemoria()).executar(
        '321',
        usuario
    )

    return consultarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
