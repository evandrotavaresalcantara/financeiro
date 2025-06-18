import Dados from './Dados'

export default class DadosBooleano {
    static aleatorio(): boolean {
        return !!Dados.numero.entre(0, 1)
    }
}