import { IconChartPie, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
import { ExtratoDTO } from 'adapters'
import Estatistica from '../template/estatistica/Estatistica'
import useCentralDeAcesso from '../../data/hooks/useCentralDeAcesso'
import Linha from '../template/layout/Linha'

export interface SumarioAnualProps {
    extratos: ExtratoDTO[]
}

export default function SumarioAnual(props: SumarioAnualProps) {
    const { usuarioConfig } = useCentralDeAcesso()

    const totalReceitas = props.extratos.reduce((acc, e) => acc + (e.sumario?.receitas ?? 0), 0)
    const totalDespesas = props.extratos.reduce((acc, e) => acc + (e.sumario?.despesas ?? 0), 0)
    const total = totalReceitas - totalDespesas

    return (
        <Linha lg={3}>
            <Estatistica
                titulo="Receitas Anuais"
                texto={totalReceitas}
                icone={<IconTrendingUp size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-green-400"
                comoDinheiro
            />
            <Estatistica
                titulo="Despesas Anuais"
                texto={totalDespesas}
                icone={<IconTrendingDown size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-red-400"
                comoDinheiro
            />
            <Estatistica
                titulo="Consolidado Anual"
                texto={total}
                icone={<IconChartPie size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-cyan-500"
                comoDinheiro
            />
        </Linha>
    )
}
