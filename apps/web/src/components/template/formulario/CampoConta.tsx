import { Select } from '@mantine/core'
import { IconBuildingBank } from '@tabler/icons-react'
import useContas from '../../../data/hooks/useContas'

interface CampoContaProps {
    rotulo?: string
    valor?: string | null
    valorMudou?: (valor: string) => void
    className?: string
}

export default function CampoConta(props: CampoContaProps) {
    const { contas } = useContas()

    function listaContas() {
        const itens = contas?.map(c => ({ value: c.id!, label: c.descricao! }) ?? null) ?? []
        return [{ value: '', label: 'Nenhum' }, ...itens]
    }
    
    return (
        <Select
            label={props.rotulo}
            size="md"
            leftSection={<IconBuildingBank />}
            value={props.valor}
            data={listaContas()}
            onChange={v => props.valorMudou?.(v!)}
            className={props.className ?? ''}
        ></Select>
    )
}