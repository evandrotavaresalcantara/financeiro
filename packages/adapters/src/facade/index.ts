import { ProvedorAutenticacao } from 'core'
import { ProvedorDados } from '..'
import AutenticacaoFacade from './AutenticacaoFacade'
import CartaoFacade from './CartaoFacade'
import CategoriaFacade from './CategoriaFacade'
import ColecaoCartao from '../db/ColecaoCartao'
import ColecaoCategoria from '../db/ColecaoCategoria'
import ColecaoConta from '../db/ColecaoConta'
import ColecaoEvento from '../db/ColecaoEvento'
import ColecaoExtrato from '../db/ColecaoExtrato'
import ColecaoUsuario from '../db/ColecaoUsuario'
import ContaFacade from './ContaFacade'
import ExtratoFacade from './ExtratoFacade'
import UsuarioFacade from './UsuarioFacade'

class CoreFacade {
    constructor(
        private readonly _dados: ProvedorDados,
        private readonly _autenticacao?: ProvedorAutenticacao
    ) {}

    get autenticacao() {
        return new AutenticacaoFacade(this._autenticacao!, new ColecaoUsuario(this._dados))
    }

    get cartao() {
        return new CartaoFacade(new ColecaoCartao(this._dados))
    }

    get categoria() {
        return new CategoriaFacade(new ColecaoCategoria(this._dados))
    }

    get conta() {
        return new ContaFacade(new ColecaoConta(this._dados))
    }

    get extrato() {
        return new ExtratoFacade(new ColecaoExtrato(this._dados), new ColecaoEvento(this._dados))
    }

    get usuario() {
        return new UsuarioFacade(new ColecaoUsuario(this._dados))
    }
}

export { CoreFacade }
