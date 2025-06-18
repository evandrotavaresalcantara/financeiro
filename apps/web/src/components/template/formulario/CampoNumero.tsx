import { TextInput } from '@mantine/core'
import { IconNumbers } from '@tabler/icons-react'

interface CampoNumeroProps {
    rotulo?: string
    placeholder?: string
    icone?: any
    valor?: number
    valorMudou?: (valor: number) => void
    className?: string
}

export default function CampoNumero(props: CampoNumeroProps) {
    return (
        <TextInput
            label={props.rotulo}
            size="md"
            type="number"
            placeholder={props.placeholder ?? ''}
            leftSection={props.icone ? props.icone : <IconNumbers />}
            value={props.valor}
            onChange={e => props.valorMudou?.(+e.target.value)}
            className={props.className ?? ''}
        />
    )
}