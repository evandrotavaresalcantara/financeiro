import { ExtratoDTO } from 'adapters'
import { fn } from 'utils'
import AreaDados from '../relatorios/AreaDados'
import Carregando from '../template/shared/Carregando'
import GraficoBarra, { GraficoBarraItem } from '../relatorios/GraficoBarra'
import useDimensoes from '../../data/hooks/useDimensoes'

interface GraficoReceitasVsDespesasProps {
    titulo: any
    extratos: ExtratoDTO[]
    processando: boolean
}

export default function GraficoReceitasVsDespesas(props: GraficoReceitasVsDespesasProps) {
    const { xs } = useDimensoes()
    return (
        <AreaDados titulo={props.titulo}>
            {props.extratos && props.extratos.length && !props.processando ? (
                <GraficoBarra
                    itens={
                        props.extratos.map((e) => {
                            const dt = fn.dtfmt.data(e.data).mmm.slash
                            return {
                                texto: xs ? dt.yy.valor : dt.yyyy.valor,
                                valorA: e.sumario?.receitas ?? 0,
                                valorB: e.sumario?.despesas ?? 0,
                            } as GraficoBarraItem
                        }) ?? []
                    }
                />
            ) : (
                <div className="flex items-center h-[205px]">
                    <Carregando className="mb-7" />
                </div>
            )}
        </AreaDados>
    )
}
