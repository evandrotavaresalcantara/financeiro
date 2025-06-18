import { IdUnico, TipoVisualizacao, UsuarioConfigProps, UsuarioProps } from '../../src'
import Resultado from '../../src/shared/base/Resultado'
import Usuario from '../../src/usuario/model/Usuario'

export default class UsuarioBuilder {
    private props: Partial<UsuarioProps> = {
        id: IdUnico.gerar(),
        nome: 'Fulano',
        email: 'fulano@gmail.com',
        provider: 'password',
        imagemUrl: null,
        config: {
            esconderSumarios: false,
            esconderValores: false,
            menuMini: false,
            visualizacao: TipoVisualizacao.CARD,
            exibirFiltros: false,
            filtros: [],
        },
    }

    static criar(): UsuarioBuilder {
        return new UsuarioBuilder()
    }

    comId(id: string): UsuarioBuilder {
        this.props.id = id
        return this
    }

    semId(): UsuarioBuilder {
        this.props.id = undefined
        return this
    }

    comNome(nome: string): UsuarioBuilder {
        this.props.nome = nome
        return this
    }

    semNome(): UsuarioBuilder {
        this.props.nome = undefined
        return this
    }

    comEmail(email: string): UsuarioBuilder {
        this.props.email = email
        return this
    }

    semEmail(): UsuarioBuilder {
        this.props.email = undefined
        return this
    }

    comProvider(provider: string): UsuarioBuilder {
        this.props.provider = provider
        return this
    }

    semProvider(): UsuarioBuilder {
        this.props.provider = undefined
        return this
    }

    comImagemUrl(imagemUrl: string): UsuarioBuilder {
        this.props.imagemUrl = imagemUrl
        return this
    }

    semImagemUrl(): UsuarioBuilder {
        this.props.imagemUrl = undefined
        return this
    }

    comConfig(config: UsuarioConfigProps): UsuarioBuilder {
        this.props.config = config
        return this
    }

    semConfig(): UsuarioBuilder {
        this.props.config = undefined
        return this
    }

    obter(): Resultado<Usuario> {
        return Usuario.novo(this.props as UsuarioProps)
    }

    agora(): Usuario {
        return this.obter().instancia
    }

    toProps(): UsuarioProps {
        return this.props as UsuarioProps
    }
}
