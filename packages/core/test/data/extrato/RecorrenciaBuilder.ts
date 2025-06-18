import { RecorrenciaProps, TipoOperacao, TransacaoProps } from '../../../src/extrato/index'
import Recorrencia from '../../../src/extrato/model/Recorrencia'
import Resultado from '../../../src/shared/base/Resultado'

export default class RecorrenciaBuilder {
    private props: Partial<RecorrenciaProps> = {
        id: '1',
        transacao: {
            id: '1',
            nome: 'Transação',
            valor: 100,
            data: new Date(),
            consolidada: false,
            operacao: TipoOperacao.DESPESA,
            observacoes: 'Observações',
        },
        dataFim: new Date(),
        indefinida: false,
        iniciarNaParcela: 1,
        qtdeDeParcelas: 10,
    }

    static criar(): RecorrenciaBuilder {
        return new RecorrenciaBuilder()
    }

    comId(id: string): RecorrenciaBuilder {
        this.props.id = id
        return this
    }

    semId(): RecorrenciaBuilder {
        this.props.id = undefined
        return this
    }

    comTransacao(transacao: TransacaoProps): RecorrenciaBuilder {
        this.props.transacao = transacao
        return this
    }

    semTransacao(): RecorrenciaBuilder {
        this.props.transacao = undefined
        return this
    }

    comDataFim(dataFim: Date): RecorrenciaBuilder {
        this.props.dataFim = dataFim
        return this
    }

    semDataFim(): RecorrenciaBuilder {
        this.props.dataFim = undefined
        return this
    }

    indefinida(indefinida: boolean): RecorrenciaBuilder {
        this.props.indefinida = indefinida
        return this
    }

    comIniciarNaParcela(iniciarNaParcela: number): RecorrenciaBuilder {
        this.props.iniciarNaParcela = iniciarNaParcela
        return this
    }

    semIniciarNaParcela(): RecorrenciaBuilder {
        this.props.iniciarNaParcela = undefined
        return this
    }

    comQtdeDeParcelas(qtdeDeParcelas: number): RecorrenciaBuilder {
        this.props.qtdeDeParcelas = qtdeDeParcelas
        return this
    }

    semQtdeDeParcelas(): RecorrenciaBuilder {
        this.props.qtdeDeParcelas = undefined
        return this
    }

    obter(): Resultado<Recorrencia> {
        return Recorrencia.nova(this.props as RecorrenciaProps)
    }

    agora(): Recorrencia {
        return this.obter().instancia
    }

    toProps(): RecorrenciaProps {
        return this.props as RecorrenciaProps
    }
}
