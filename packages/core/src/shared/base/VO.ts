import { fn } from 'utils'
import Props from './Props'

export interface VOConfig extends Props {
    cls?: string
    atr?: string
}

export default abstract class VO<T, Cfg extends VOConfig> {
    constructor(readonly valor: T, readonly cfg?: Cfg) {}

    igual(outro: VO<T, Cfg>): boolean {
        return fn.obj.iguais(this.valor, outro.valor)
    }

    diferente(outro: VO<T, Cfg>): boolean {
        return !this.igual(outro)
    }
}
