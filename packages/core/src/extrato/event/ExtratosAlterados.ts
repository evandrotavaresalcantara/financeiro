import { EventoProps } from '../../evento'
import { ExtratoProps } from '..'
import { IdUnico } from '../../shared'
import Email from '../../shared/types/Email'
import Evento from '../../evento/model/Evento'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default class ExtratosAlterados extends Evento {
    private constructor(id: Id, data: Date, usuarioEmail: Email, corpo: ExtratoProps[]) {
        super(id, data, usuarioEmail, 'extrato-alterado', corpo)
    }

    static novo(evento: EventoProps): Resultado<ExtratosAlterados> {
        const id = Id.novo(evento.id ?? IdUnico.gerar())
        const email = Email.novo(evento.usuarioEmail)

        const criarAtributos = Resultado.combinar([id, email])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        return Resultado.ok(
            new ExtratosAlterados(
                id.instancia,
                evento.data ? new Date(evento.data) : new Date(),
                email.instancia,
                evento.corpo
            )
        )
    }
}
