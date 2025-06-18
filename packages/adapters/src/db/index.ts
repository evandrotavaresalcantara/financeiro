import { ProvedorDados } from '..'
import ColecaoCartao from './ColecaoCartao'
import ColecaoCategoria from './ColecaoCategoria'
import ColecaoConta from './ColecaoConta'
import ColecaoEvento from './ColecaoEvento'
import ColecaoExtrato from './ColecaoExtrato'
import ColecaoUsuario from './ColecaoUsuario'

export class Repositorios {
    constructor(readonly dados: ProvedorDados) {}

    get cartao() {
        return new ColecaoCartao(this.dados)
    }

    get categoria() {
        return new ColecaoCategoria(this.dados)
    }

    get conta() {
        return new ColecaoConta(this.dados)
    }

    get evento() {
        return new ColecaoEvento(this.dados)
    }

    get extrato() {
        return new ColecaoExtrato(this.dados)
    }

    get usuario() {
        return new ColecaoUsuario(this.dados)
    }
}
