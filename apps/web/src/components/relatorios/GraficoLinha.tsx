import { fn } from 'utils'
import { useState } from 'react'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryVoronoiContainer } from 'victory'
import cores from '../../data/constants/cores'
import useDimensoesElemento from '../../data/hooks/useDimensoesElemento'

interface GraficoLinhaProps {
    altura?: number
    className?: string
    cores?: string[]
    grupos: {
        titulo: string
        dados: { x: string; y: number }[]
    }[]
}

export default function GraficoLinha(props: GraficoLinhaProps) {
    const { grupos } = props
    const { elementoRef, largura } = useDimensoesElemento()
    const [exclusoes, setExclusoes] = useState<string[]>([])

    const maior = grupos
        .flatMap((d) => d.dados.map((d) => d.y))
        .reduce((m, y) => (m > y ? m : y), Number.MIN_VALUE)
    const menor = grupos
        .flatMap((d) => d.dados.map((d) => d.y))
        .reduce((m, y) => (m < y ? m : y), Number.MAX_VALUE)

    function alterarExclusao(valor: string) {
        if (exclusoes.includes(valor)) {
            setExclusoes(exclusoes.filter((e) => e !== valor))
        } else {
            setExclusoes([...exclusoes, valor])
        }
    }

    function renderizarLabels() {
        return (
            <div className="flex gap-10">
                {grupos.map((grupo, i) => {
                    const excluido = exclusoes.includes(grupo.titulo)
                    return (
                        <div
                            key={`${grupo.titulo}-${i}`}
                            className={`flex gap-2 cursor-pointer`}
                            onClick={() => alterarExclusao(grupo.titulo)}
                        >
                            <span
                                style={{
                                    backgroundColor: excluido
                                        ? '#666'
                                        : props.cores?.[i] ?? cores[i],
                                }}
                                className={`h-6 w-6`}
                            />
                            <span
                                className={`
                                ${excluido ? 'text-zinc-500' : 'text-white'}
                            `}
                            >
                                {grupo.titulo}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }
    function renderizarGrafico(grupo: any, indice: number) {
        const titulo: string = grupo.dados
        const dados: any[] = grupo.dados

        return (
            <VictoryLine
                key={titulo}
                interpolation="monotoneX"
                containerComponent={<VictoryVoronoiContainer />}
                style={{
                    data: { stroke: props.cores?.[indice] ?? cores[indice], strokeWidth: 1 },
                    labels: {
                        fontSize: 17,
                        angle: -10,
                        fill: props.cores?.[indice] ?? cores[indice],
                    },
                }}
                labels={({ datum }: any) => {
                    return fn.moeda.num(datum.y).valor
                }}
                categories={{ x: dados.map((d) => d.x) }}
                data={dados}
            />
        )
    }

    return (
        <div
            ref={elementoRef}
            className={`
                flex flex-col justify-center items-center w-full
                relative ${props.className ?? ''}
            `}
        >
            {renderizarLabels()}
            <VictoryChart
                theme={{
                    axis: {
                        style: {
                            axis: { fill: 'white' },
                            grid: { fill: '#666' },
                            tickLabels: { fill: '#666' },
                        },
                    },
                }}
                maxDomain={{ y: maior + 1 }}
                minDomain={{ y: menor - 1 }}
                width={largura}
                height={props.altura ?? 500}
            >
                <VictoryAxis
                    label="Tempo"
                    style={{
                        axisLabel: { fill: 'white' },
                        axis: { stroke: '#999' },
                        tickLabels: { fill: '#999' },
                        grid: { stroke: '#555', strokeDasharray: '7' },
                    }}
                />
                <VictoryAxis
                    label="Valor (R$)"
                    dependentAxis
                    style={{
                        axisLabel: { fill: 'white' },
                        axis: { stroke: '#999' },
                        tickLabels: { fill: '#999' },
                        grid: { stroke: '#555', strokeDasharray: '7' },
                    }}
                />
                {grupos.map((grupo, i) => {
                    const excluido = exclusoes.includes(grupo.titulo)
                    return excluido ? null : renderizarGrafico(grupo, i)
                })}
            </VictoryChart>
        </div>
    )
}
