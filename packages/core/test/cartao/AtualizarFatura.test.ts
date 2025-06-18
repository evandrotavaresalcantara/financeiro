import AtualizarFaturas from '../../src/cartao/service/AtualizarFaturas'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import { TipoOperacao } from '../../src'
import CartaoBuilder from '../data/CartaoBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'

const data = new Date('2025/1/2')
const usuario = UsuarioBuilder.criar().agora()

const cartao = CartaoBuilder.criar()
    .comDescricao('NuBank')
    .comFaturas([
        {
            data: new Date('2024/1/1'),
            valor: 300,
            valorPlanejado: 3000,
        },
        {
            data,
            valor: 4000,
            valorPlanejado: 3000,
        },
    ])
    .agora()

const extrato = ExtratoBuilder.criar()
    .comData(data)
    .comTransacoes([
        TransacaoBuilder.criar()
            .comCartaoId(cartao.id.valor)
            .comData(data)
            .comValor(1000)
            .toProps(),
        TransacaoBuilder.criar()
            .comCartaoId(cartao.id.valor)
            .comData(data)
            .comValor(300)
            .toProps(),
        TransacaoBuilder.criar()
            .comCartaoId(cartao.id.valor)
            .comData(data)
            .comValor(100)
            .comOperacao(TipoOperacao.RECEITA)
            .toProps(),
    ])
    .agora()

test('Deve atualizar a fatura do cartão corretamente', async () => {
    const repo = new ColecaoCartaoMemoria()
    await repo.salvar(usuario, cartao)

    await new AtualizarFaturas(repo).executar([extrato], usuario)

    const cartaoAtualizado = (await repo.consultar(usuario)).instancia[0]!
    expect(cartaoAtualizado.fatura(data).valor).toBe(-1200)
})

test('Deve retornar erro na consulta', async () => {
    const repo = new ColecaoCartaoMemoria(true)
    const resultado = await new AtualizarFaturas(repo).executar([extrato], usuario)
    expect(resultado.deuErrado).toBe(true)
})

test('Deve retornar erro passar usuario nulo', async () => {
    const repo = new ColecaoCartaoMemoria(true)
    const resultado = await new AtualizarFaturas(repo).executar([extrato], null as any)
    expect(resultado.deuErrado).toBe(true)
})

test('Deve retornar erro passar extratos nulo', async () => {
    const repo = new ColecaoCartaoMemoria(true)
    const resultado = await new AtualizarFaturas(repo).executar(null as any, usuario)
    expect(resultado.deuErrado).toBe(true)
})
