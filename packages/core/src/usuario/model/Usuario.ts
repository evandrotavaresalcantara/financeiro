import { fn, IdUnico } from 'utils'
import Email from '../../shared/types/Email'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Id from '../../shared/types/Id'
import Nome from '../../shared/types/Nome'
import Resultado from '../../shared/base/Resultado'
import Url from '../../shared/types/Url'
import UsuarioConfig, { UsuarioConfigProps } from './UsuarioConfig'

export interface UsuarioProps extends EntidadeProps {
    nome?: string
    email: string
    provider?: string
    imagemUrl?: string | null
    config: UsuarioConfigProps
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
    constructor(
        readonly id: Id,
        readonly nome: Nome,
        readonly email: Email,
        readonly provider: string | null,
        readonly imagemUrl: Url | null,
        readonly config: UsuarioConfig,
        readonly props: UsuarioProps
    ) {
        super(id)
    }

    static novos(props: UsuarioProps[]): Resultado<Usuario[]> {
        return Resultado.combinar(props.map(Usuario.novo))
    }

    static novo(props: UsuarioProps): Resultado<Usuario> {
        const id = Id.novo(props.id ?? IdUnico.gerar())
        const nome = Nome.novo(props.nome ?? props.email?.split('@')[0])
        const email = Email.novo(props.email)
        const imagemUrl = props.imagemUrl ? Url.nova(props.imagemUrl) : Resultado.nulo()
        const config = UsuarioConfig.novo(props.config ?? {})

        const criarAtributos = Resultado.combinar<any>([id, nome, email, imagemUrl, config])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        return Resultado.ok(
            new Usuario(
                id.instancia,
                nome.instancia,
                email.instancia,
                props.provider ?? null,
                imagemUrl.instancia,
                config.instancia,
                fn.obj.manterAtribs({ ...props, config: config.instancia.props }, [
                    'id',
                    'nome',
                    'email',
                    'provider',
                    'imagemUrl',
                    'config',
                ])
            )
        )
    }
}
