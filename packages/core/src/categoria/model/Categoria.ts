import { fn, IdUnico } from 'utils'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Id from '../../shared/types/Id'
import Nome from '../../shared/types/Nome'
import Resultado from '../../shared/base/Resultado'

export interface CategoriaProps extends EntidadeProps {
    nome?: string
    idPai?: string | null
    pai?: CategoriaProps | null
    subcategorias?: CategoriaProps[]
}

export default class Categoria extends Entidade<Categoria, CategoriaProps> {
    private constructor(
        readonly id: Id,
        readonly nome: Nome,
        readonly idPai: Id | null,
        readonly pai: Categoria | null,
        readonly subcategorias: Categoria[],
        readonly props: CategoriaProps
    ) {
        super(id)
    }

    static novas(props: CategoriaProps[]): Resultado<Categoria[]> {
        return Resultado.combinar(props.map(Categoria.nova))
    }

    static nova(props: CategoriaProps): Resultado<Categoria> {
        const cls = Categoria.constructor.name

        const id = Id.novo(props.id ?? IdUnico.gerar())
        const nome = Nome.novo(props.nome!, { cls, atr: 'nome', min: 2 })
        const idPai = props.idPai ? Id.novo(props.idPai, { cls, atr: 'idPai' }) : Resultado.nulo()
        const pai = props.pai ? Categoria.nova(props.pai) : Resultado.nulo()

        const subcategorias = props.subcategorias
            ? Resultado.combinar(props.subcategorias.map(Categoria.nova))
            : Resultado.ok<Categoria[]>([])

        const criarAtributos = Resultado.combinar<any>([id, nome, idPai, pai, subcategorias])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        return Resultado.ok(
            new Categoria(
                id.instancia,
                nome.instancia,
                idPai.instancia,
                pai.instancia,
                subcategorias.instancia as Categoria[],
                fn.obj.manterAtribs({ ...props, id: id.instancia.valor }, [
                    'id',
                    'nome',
                    'idPai',
                    'pai',
                    'subcategorias',
                ])
            )
        )
    }
}
