import ColecaoContaMemoria from '../mock/ColecaoContaMemoria'
import ConsultarContas from '../../src/conta/service/ConsultarContas'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve consultar a conta corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()

    const consultarConta = new ConsultarContas(new ColecaoContaMemoria()).executar(usuario)
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar a conta', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const consultarConta = await new ConsultarContas(new ColecaoContaMemoria()).executar(usuario)
    expect(consultarConta.deuErrado).toBe(true)
})

test('Deve retornar erro na consulta', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const repo = new ColecaoContaMemoria(true)
    const resultado = await new ConsultarContas(repo).executar(usuario)
    expect(resultado.deuErrado).toBe(true)
})