import { CategoriaProps, IdUnico } from '../../src'
import Categoria from '../../src/categoria/model/Categoria'
import Resultado from '../../src/shared/base/Resultado'

export default class CategoriaBuilder {
    private props: Partial<CategoriaProps> = {
        id: IdUnico.gerar(),
        nome: 'casa',
        idPai: null,
        pai: null,
        subcategorias: [],
    }

    static criar(): CategoriaBuilder {
        return new CategoriaBuilder()
    }

    comId(id: string): CategoriaBuilder {
        this.props.id = id
        return this
    }

    semId(): CategoriaBuilder {
        this.props.id = undefined
        return this
    }

    comNome(nome: string): CategoriaBuilder {
        this.props.nome = nome
        return this
    }

    comIdPai(idPai: string): CategoriaBuilder {
        this.props.idPai = idPai
        return this
    }

    comPai(pai: CategoriaProps): CategoriaBuilder {
        this.props.pai = pai
        return this
    }

    comSubcategorias(subcategorias: CategoriaProps[]): CategoriaBuilder {
        subcategorias.forEach((categoria) => {
            this.props.subcategorias?.push(categoria)
        })
        return this
    }

    semSubcategorias(): CategoriaBuilder {
        this.props.subcategorias = undefined
        return this
    }

    semNome(): CategoriaBuilder {
        this.props.nome = ''
        return this
    }

    semIdPai(): CategoriaBuilder {
        this.props.idPai = null
        return this
    }

    semPai(): CategoriaBuilder {
        this.props.pai = null
        return this
    }

    semCor(): CategoriaBuilder {
        this.props.cor = undefined
        return this
    }

    obter(): Resultado<Categoria> {
        return Categoria.nova(this.props as CategoriaProps)
    }

    agora(): Categoria {
        return this.obter().instancia
    }

    toProps(): CategoriaProps {
        return this.props as CategoriaProps
    }
}
