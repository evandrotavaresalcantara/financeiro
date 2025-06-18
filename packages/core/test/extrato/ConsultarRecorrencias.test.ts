import ConsultarRecorrencias from '../../src/extrato/service/ConsultarRecorrencias'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'

test('Deve consultar as recorrencias corretamente', () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultarConta = new ConsultarRecorrencias(new ColecaoExtratoMemoria()).executar(usuario)
    return consultarConta.then((resultado) => {
        expect(resultado.deuCerto).toBeTruthy()
    })
})

test('Deve gerar um erro ao consultar as recorrencias', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const consultarConta = new ConsultarRecorrencias(new ColecaoExtratoMemoria()).executar(usuario)

    return consultarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
