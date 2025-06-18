import { fn } from 'utils'
import { GrupoTransacaoDTO } from 'adapters'
import { TipoOperacao } from 'core'
import AreaDados from '../relatorios/AreaDados'
import Carregando from '../template/shared/Carregando'
import GraficoPizza from '../relatorios/GraficoPizza'

interface ReceitasPorCategoriaProps {
    titulo: any
    data: Date
    grupos: GrupoTransacaoDTO[]
    operacao: TipoOperacao
    processando: boolean
}

export default function GraficoPorCategoria(props: ReceitasPorCategoriaProps) {
    return (
        <AreaDados titulo={props.titulo} subtitulo={fn.dtfmt.data(props.data).mmm.slash.yyyy.valor}>
            {props.processando ? (
                <div className="flex items-center h-[250px]">
                    <Carregando simples className="mb-7" />
                </div>
            ) : (
                <GraficoPizza
                    tamanho={250}
                    tamanhoLinha={35}
                    dados={props.grupos.map((grupo) => {
                        return {
                            x: grupo.nome ? grupo.nome : 'Sem Categoria',
                            y: Math.abs(
                                props.operacao === TipoOperacao.RECEITA
                                    ? grupo.sumario.receitas
                                    : grupo.sumario.despesas
                            ),
                        }
                    })}
                />
            )}
        </AreaDados>
    )
}
