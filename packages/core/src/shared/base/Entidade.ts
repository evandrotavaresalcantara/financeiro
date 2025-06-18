import Id from '../types/Id'
import Props from './Props'

export interface EntidadeProps extends Props {
    id?: string
}

export default abstract class Entidade<Tipo, Props extends EntidadeProps> {
    constructor(readonly id: Id) {}

    igual(entidade: Entidade<Tipo, Props>): boolean {
        return this.id.igual(entidade.id)
    }

    diferente(entidade: Entidade<Tipo, Props>): boolean {
        return this.id.diferente(entidade.id)
    }
}
