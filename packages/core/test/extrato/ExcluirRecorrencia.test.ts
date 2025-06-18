import ExcluirRecorrencia from '../../src/extrato/service/ExcluirRecorrencia'
import RecorrenciaBuilder from '../data/RecorrenciaBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'
import ColecaoPublicadorDeEventoMemoria from '../mock/ColecaoPublicadorDeEvento'





test('Deve excluir a recorrencia corretamente', () => {
    const usuario = UsuarioBuilder.criar().agora()
    const excluirRecorrencia = new ExcluirRecorrencia(
        ColecaoExtratoMemoria.comDados(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar('123', usuario)
    expect(excluirRecorrencia).toBeTruthy()
})

test('Deve gerar um erro ao excluir a recorrencia', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const excluirRecorrencia = await new ExcluirRecorrencia(
        ColecaoExtratoMemoria.comDados(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar('123', usuario)

    expect(excluirRecorrencia.comoFalha).toBeTruthy()
})
