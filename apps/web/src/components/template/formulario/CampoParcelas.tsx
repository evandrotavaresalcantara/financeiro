import { NumberInput } from '@mantine/core'
import { useEffect, useState } from 'react'

interface CampoParcelasProps {
    rotulo?: string
    primeira?: number | null
    ultima?: number | null
    primeiraMudou?: (primeira: number) => void
    ultimaMudou?: (ultima: number) => void
    className?: string
}

export default function CampoParcelas(props: CampoParcelasProps) {
    const [primeira, setPrimeira] = useState<number>(1)
    const [ultima, setUltima] = useState<number>(1)

    useEffect(() => {
        alterarPrimeiraParcela(props.primeira)
        alterarUltimaParcela(props.ultima)
    }, [props.primeira, props.ultima])

    function alterarPrimeiraParcela(valor?: number | string | null) {
        setPrimeira(valor ? +valor : 1)
        props.primeiraMudou?.(valor ? +valor : 1)
    }

    function alterarUltimaParcela(valor?: number | string | null) {
        setUltima(valor ? +valor : 1)
        props.ultimaMudou?.(valor ? +valor : 1)
    }

    return (
        <div className="flex items-end">
            <NumberInput
                min={1}
                max={ultima}
                label={props.rotulo}
                size="md"
                value={primeira}
                onChange={alterarPrimeiraParcela}
                className={props.className ?? ''}
            />
            <div className="flex justify-center mb-2.5 min-w-[35px]">de</div>
            <NumberInput
                min={primeira}
                size="md"
                value={ultima}
                onChange={alterarUltimaParcela}
                className={props.className ?? ''}
            />
        </div>
    )
}
