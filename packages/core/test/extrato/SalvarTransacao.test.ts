import ConsultarExtrato from '../../src/extrato/service/ConsultarExtrato'
import SalvarRecorrencia from '../../src/extrato/service/SalvarRecorrencia'
import SalvarTransacao from '../../src/extrato/service/SalvarTransacao'
import RecorrenciaBuilder from '../data/RecorrenciaBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'
import ColecaoPublicadorDeEventoMemoria from '../mock/ColecaoPublicadorDeEvento'

test('Deve salvar a transacao corretamente', () => {
    const usuario = UsuarioBuilder.criar().agora()
    const entrada = {
        extrato: ExtratoBuilder.criar().agora(),
        transacao: TransacaoBuilder.criar().agora(),
    }
    const salvarTransacao = new SalvarTransacao(
        new ColecaoExtratoMemoria(),
        new ConsultarExtrato(new ColecaoExtratoMemoria()),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(entrada, usuario)

    return salvarTransacao.then((resultado) => {
        expect(resultado.deuCerto).toBeTruthy()
    })
})

test('Deve gerar um erro ao salvar a transacao', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().agora()
    const recorrencia = RecorrenciaBuilder.criar().agora()
    const salvarRecorrencia = new SalvarRecorrencia(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(recorrencia, usuario)

    return salvarRecorrencia.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
