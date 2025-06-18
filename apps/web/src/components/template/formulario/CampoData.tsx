import { DatePickerInput } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import 'dayjs/locale/pt-br'

interface CampoDataProps {
    rotulo?: string
    valor?: Date | null
    valorMudou?: (valor: Date | null) => void
    className?: string
}

export default function CampoData(props: CampoDataProps) {
    return (
        <DatePickerInput
            size="md"
            locale="pt-BR"
            label={props.rotulo}
            value={props.valor}
            leftSection={<IconCalendar />}
            valueFormat='DD/MM/YYYY'
            onChange={(date: Date | null) => {
                props.valorMudou?.(date)
            }}
            className={props.className ?? ''}
        />
    )
}