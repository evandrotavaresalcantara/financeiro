import CartaoBuilder from '../data/CartaoBuilder'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'
import SalvarCartao from '../../src/cartao/service/SalvarCartao'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve salvar o cartão corretamente', () => {
    const cartao = CartaoBuilder.criar().agora()
    const usuario = UsuarioBuilder.criar().agora()
    const salvarCartao = new SalvarCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)
    expect(salvarCartao).toBeTruthy()
})

test('Deve gerar um erro ao salvar o cartão', () => {
    const cartao = CartaoBuilder.criar().semId().semBandeira().semDescricao().agora()
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()

    const salvarCartao = new SalvarCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)

    return salvarCartao.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
