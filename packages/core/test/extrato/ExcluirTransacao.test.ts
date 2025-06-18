import ExcluirTransacao from "../../src/extrato/service/ExcluirTransacao"
import UsuarioBuilder from "../data/UsuarioBuilder"
import ExtratoBuilder from "../data/extrato/ExtratoBuilder"
import TransacaoBuilder from "../data/extrato/TransacaoBuilder"
import ColecaoExtratoMemoria from "../mock/ColecaoExtratoMemoria"
import ColecaoPublicadorDeEventoMemoria from "../mock/ColecaoPublicadorDeEvento"

test('Deve excluir a transacao corretamente', () => {
    const usuario = UsuarioBuilder.criar().agora()
    const entrada = {
        extrato: ExtratoBuilder.criar().agora(),
        transacao: TransacaoBuilder.criar().agora()
    }
    const excluirRecorrencia = new ExcluirTransacao(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(
        entrada,
        usuario
    )
    expect(excluirRecorrencia).toBeTruthy()
})

test('Deve gerar um erro ao excluir a transacao', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const entrada = {
        extrato: ExtratoBuilder.criar().agora(),
        transacao: TransacaoBuilder.criar().agora()
    }
    const excluirRecorrencia = new ExcluirTransacao(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(
        entrada,
        usuario
    )

    return excluirRecorrencia.then(resultado => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})