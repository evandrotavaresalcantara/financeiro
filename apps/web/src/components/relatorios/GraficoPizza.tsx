import { fn } from 'utils'
import { IconChartDonut, IconEyeOff } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory'
import cores from '../../data/constants/cores'
import NaoEncontrado from '../template/shared/NaoEncontrado'
import useCentralDeAcesso from '../../data/hooks/useCentralDeAcesso'

export interface GraficoPizzaProps {
    className?: string
    tamanho: number
    tamanhoLinha?: number
    dados: any[]
}

export default function GraficoPizza(props: GraficoPizzaProps) {
    const { usuarioConfig } = useCentralDeAcesso()
    const [texto, setTexto] = useState('')
    const [valor, setValor] = useState<number | null>(0)
    const [cor, setCor] = useState<string>('')
    const [percentual, setPercentual] = useState<number>(100)

    const raioInterno = props.tamanho / 2 - (props.tamanhoLinha ?? 20)

    useEffect(() => exibirTotal(), [props.dados])

    function valorTotal() {
        return props.dados.reduce((t, v) => t + v.y, 0)
    }

    function exibirTotal() {
        const esc = usuarioConfig?.esconderSumarios
        setValor(esc ? null : valorTotal())
        setTexto(esc ? '' : 'Total')
        setCor('transparent')
        setPercentual(100)
    }

    function estaZerado() {
        return !props.dados || !props.dados.length || props.dados.every((d) => d.y === 0)
    }

    return (
        <div
            style={{ width: props.tamanho, height: props.tamanho }}
            className={`
                flex justify-center items-center w-full
                relative ${props.className ?? ''}
            `}
        >
            {estaZerado() ? (
                <NaoEncontrado
                    icone={<IconChartDonut size={120} />}
                    descricao="Sem dados para exibir"
                />
            ) : (
                <>
                    <div
                        className={`
                        flex flex-col items-center justify-center text-center
                        absolute rounded-full border-2
                        w-[${props.tamanho}] h-[${props.tamanho}]
                    `}
                        style={{
                            borderColor: cor,
                            width: raioInterno * 1.85,
                            height: raioInterno * 1.85,
                        }}
                    >
                        <div className="flex items-baseline text-lg font-black gap-1">
                            {valor ? (
                                fn.moeda.num(valor).valor
                            ) : (
                                <IconEyeOff size={40} stroke={1} className="text-zinc-600" />
                            )}
                        </div>
                        <div className="flex flex-col text-sm text-zinc-400">
                            <span>{texto}</span>
                            {percentual !== 100 && <span>{percentual}%</span>}
                        </div>
                    </div>
                    <VictoryPie
                        width={props.tamanho}
                        height={props.tamanho}
                        colorScale={cores}
                        data={props.dados && props.dados.length ? props.dados : [{ y: 0 }]}
                        labels={() => ''}
                        radius={props.tamanho / 2}
                        innerRadius={raioInterno}
                        padAngle={0}
                        cornerRadius={0}
                        style={{ labels: { fill: 'white', fontSize: 20, fontWeight: 'bold' } }}
                        events={[
                            {
                                target: 'data',
                                eventHandlers: {
                                    onMouseMove: () => {
                                        return [
                                            {
                                                target: 'data',
                                                mutation: ({ datum, style }) => {
                                                    setTexto(datum.x)
                                                    setValor(datum.y)
                                                    setCor(style.fill)
                                                    setPercentual(
                                                        Math.round((datum.y / valorTotal()) * 100)
                                                    )
                                                },
                                            },
                                        ]
                                    },
                                    onMouseLeave: () => {
                                        return [
                                            {
                                                target: 'data',
                                                callback: exibirTotal,
                                            },
                                        ]
                                    },
                                },
                            },
                        ]}
                    />
                </>
            )}
        </div>
    )
}
