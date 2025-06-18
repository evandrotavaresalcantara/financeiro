import { SegmentedControl } from "@mantine/core"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

export interface SimOuNaoProps {
    valor: boolean
    valorMudou?: (valor: boolean) => void
}

export default function SimOuNao(props: SimOuNaoProps) {
    return (
        <SegmentedControl
            size="lg"
            value={props.valor ? 's' : 'n'}
            onChange={valor => props.valorMudou?.(valor === 's')}
            data={[
                {
                    value: 's',
                    label: (
                        <div className="flex items-center gap-3">
                            <span><IconEye /></span>
                            <span>Sim</span>
                        </div>
                    ),
                },
                {
                    value: 'n',
                    label: (
                        <div className="flex items-center gap-3">
                            <span><IconEyeOff /></span>
                            <span>Não</span>
                        </div>
                    ),
                },
            ]}
        />
    )
}