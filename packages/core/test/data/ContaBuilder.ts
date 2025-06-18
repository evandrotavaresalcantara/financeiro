import { ContaProps, SaldoProps } from '../../src'
import { IdUnico } from 'utils'
import Resultado from '../../src/shared/base/Resultado'
import Conta from '../../src/conta/model/Conta'

export default class ContaBuilder {
    private props: Partial<ContaProps> = {
        id: IdUnico.gerar(),
        descricao: 'Conta Itaú',
        banco: 'Itaú',
        cor: '#000000',
        saldos: [],
    }

    static criar(): ContaBuilder {
        return new ContaBuilder()
    }

    comId(id: string): ContaBuilder {
        this.props.id = id
        return this
    }

    semId(): ContaBuilder {
        this.props.id = undefined
        return this
    }

    comDescricao(descricao: string): ContaBuilder {
        this.props.descricao = descricao
        return this
    }

    semDescricao(): ContaBuilder {
        this.props.descricao = undefined
        return this
    }

    comBanco(banco: string): ContaBuilder {
        this.props.banco = banco
        return this
    }

    semBanco(): ContaBuilder {
        this.props.banco = undefined
        return this
    }

    comCor(cor: string): ContaBuilder {
        this.props.cor = cor
        return this
    }

    semCor(): ContaBuilder {
        this.props.cor = undefined
        return this
    }

    comSaldos(saldos: SaldoProps[]): ContaBuilder {
        this.props.saldos = saldos
        return this
    }

    semSaldos(): ContaBuilder {
        this.props.saldos = undefined
        return this
    }

    obter(): Resultado<Conta> {
        return Conta.nova(this.props as ContaProps)
    }

    agora(): Conta {
        return this.obter().instancia
    }

    toProps(): ContaProps {
        return this.props as ContaProps
    }
}
