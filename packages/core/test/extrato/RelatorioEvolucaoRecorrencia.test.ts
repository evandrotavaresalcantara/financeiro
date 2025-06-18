import RelatorioEvolucaoRecorrencia, {
    In,
} from '../../src/extrato/service/RelatorioEvolucaoRecorrencia'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'

test('Deve gerar um relatorio da evolucao da recorrencia corretamente', () => {
    const entrada: In = {
        extratos: [ExtratoBuilder.criar().agora()],
        recorrenciaId: '123',
    }
    const relatorio = new RelatorioEvolucaoRecorrencia().executar(entrada)
    expect(relatorio).toBeTruthy()
})
