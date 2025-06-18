import AtualizarSaldos from '../../src/conta/service/AtualizarSaldos'
import ColecaoContaMemoria from '../mock/ColecaoContaMemoria'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ContaBuilder from '../data/ContaBuilder'
import { AnoMesId, TipoOperacao } from '../../src'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

const data1 = new Date('2024/1/2')
const data2 = new Date('2024/2/2')
const usuario = UsuarioBuilder.criar().agora()
const conta = ContaBuilder.criar()
    .comDescricao('NuBank')
    .comSaldos([
        {
            id: AnoMesId.novo(data1).instancia.valor,
            data: data1,
            creditos: 500,
            debitos: 300,
            acumulado: 0,
        },
        {
            id: AnoMesId.novo(data2).instancia.valor,
            data: data2,
            creditos: 500,
            debitos: 300,
            acumulado: 200,
        },
    ])
    .agora()

const extrato = ExtratoBuilder.criar()
    .comData(data2)
    .comTransacoes([
        TransacaoBuilder.criar().comContaId(conta.id.valor).comData(data2).comValor(1000).toProps(),
        TransacaoBuilder.criar().comContaId(conta.id.valor).comData(data2).comValor(300).toProps(),
        TransacaoBuilder.criar()
            .comContaId(conta.id.valor)
            .comData(data2)
            .comValor(2000)
            .comOperacao(TipoOperacao.RECEITA)
            .toProps(),
    ])
    .agora()

test('Deve atualizar os saldos da conta corretamente', async () => {
    const repo = new ColecaoContaMemoria()
    await repo.salvar(usuario, conta)

    await new AtualizarSaldos(repo).executar([extrato], usuario)

    const contaAtualizada = (await repo.consultar(usuario)).instancia[0]!
    expect(contaAtualizada.saldo(data2).acumulado).toBe(200)
    expect(contaAtualizada.saldo(data2).creditos).toBe(2000)
    expect(contaAtualizada.saldo(data2).debitos).toBe(1300)
})

test('Deve retornar erro na consulta', async () => {
    const repo = new ColecaoContaMemoria(true)
    const resultado = await new AtualizarSaldos(repo).executar([extrato], usuario)
    expect(resultado.deuErrado).toBe(true)
})
