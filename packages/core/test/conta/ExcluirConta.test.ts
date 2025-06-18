import ColecaoContaMemoria from '../mock/ColecaoContaMemoria'
import ContaBuilder from '../data/ContaBuilder'
import ExcluirConta from '../../src/conta/service/ExcluirConta'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve excluir a conta corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const conta = ContaBuilder.criar().agora()

    const excluirConta = new ExcluirConta(new ColecaoContaMemoria()).executar(conta, usuario)
    expect(excluirConta).toBeTruthy()
})

test('Deve gerar um erro ao excluir a conta', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const conta = ContaBuilder.criar().semId().semBanco().semCor().semDescricao().agora()

    const excluirConta = new ExcluirConta(new ColecaoContaMemoria()).executar(conta, usuario)

    return excluirConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
