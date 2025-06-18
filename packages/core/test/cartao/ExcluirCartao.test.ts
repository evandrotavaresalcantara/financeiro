import CartaoBuilder from '../data/CartaoBuilder'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'
import ExcluirCartao from '../../src/cartao/service/ExcluirCartao'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve excluir o cartão corretamente', () => {
    const cartao = CartaoBuilder.criar().agora()
    const usuario = UsuarioBuilder.criar().agora()
    const excluirCartao = new ExcluirCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)
    expect(excluirCartao).toBeTruthy()
})

test('Deve gerar um erro ao excluir o cartão', () => {
    const cartao = CartaoBuilder.criar().semId().semBandeira().semDescricao().agora()
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()

    const excluirCartao = new ExcluirCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)

    return excluirCartao.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
