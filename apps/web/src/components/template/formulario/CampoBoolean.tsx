import { Switch } from '@mantine/core'

interface CampoBooleanProps {
    rotulo?: string
    valor?: boolean
    valorMudou?: (valor: boolean) => void
    className?: string
}

export default function CampoBoolean(props: CampoBooleanProps) {
    return (
        <Switch
            label={props.rotulo}
            size="md"
            checked={props.valor}
            onChange={e => props.valorMudou?.(e.target.checked)}
            className={props.className ?? ''}
        />
    )
}