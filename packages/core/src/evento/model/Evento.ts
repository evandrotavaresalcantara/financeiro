import Email from '../../shared/types/Email'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Id from '../../shared/types/Id'

export interface EventoProps extends EntidadeProps {
    data?: Date
    usuarioEmail?: string
    tipo?: string
    corpo?: any
}

export default abstract class Evento extends Entidade<Evento, EventoProps> {
    readonly props: EventoProps

    constructor(
        readonly id: Id,
        readonly data: Date,
        readonly usuarioEmail: Email,
        readonly tipo: string,
        readonly corpo: any
    ) {
        super(id)
        this.props = {
            id: id.valor,
            data,
            usuarioEmail: usuarioEmail.valor,
            tipo,
            corpo,
        }
    }
}
