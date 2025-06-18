import { RecorrenciaProps, TransacaoProps } from '../../src'
import { IdUnico } from 'utils'
import Resultado from '../../src/shared/base/Resultado'
import Recorrencia from '../../src/extrato/model/Recorrencia'
import TransacaoBuilder from './extrato/TransacaoBuilder'

export default class RecorrenciaBuilder {
    private props: Partial<RecorrenciaProps> = {
        id: IdUnico.gerar(),
        transacao: TransacaoBuilder.criar().toProps(),
        indefinida: true,
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

    comIndefinida(indefinida: boolean): RecorrenciaBuilder {
        this.props.indefinida = indefinida
        return this
    }

    semIndefinida(): RecorrenciaBuilder {
        this.props.indefinida = undefined
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
