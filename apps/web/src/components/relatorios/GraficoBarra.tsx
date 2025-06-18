import { IconChartBar } from "@tabler/icons-react"
import Barra from "./Barra"
import Linha from "../template/layout/Linha"
import NaoEncontrado from "../template/shared/NaoEncontrado"
import useDimensoes from "../../data/hooks/useDimensoes"

export interface GraficoBarraItem {
    texto: string
    valorA: number
    valorB: number
}

export interface GraficoBarraProps {
    itens: GraficoBarraItem[]
}

export default function GraficoBarra(props: GraficoBarraProps) {
    const { lgOuMaior } = useDimensoes()

    function rederizarMeses(vertical: boolean) {
        const className = vertical ? 'h-40 lg:h-52' : ''
        return props.itens.map(item => {
            return (
                <Barra
                    key={item.texto}
                    texto={item.texto}
                    valorA={item.valorA}
                    valorB={item.valorB}
                    className={className}
                    vertical={vertical}
                />
            )
        })
    }

    return props.itens && props.itens.length > 0 ? (
        <Linha cols={1} lg={12} className="w-full">
            {rederizarMeses(lgOuMaior)}
        </Linha>
    ) : (
        <NaoEncontrado
            icone={<IconChartBar size={120} />}
            descricao="Sem dados para exibir"
        />
    )
}