import { Select } from '@mantine/core'
import { IconCreditCard } from '@tabler/icons-react'
import useCartoes from '../../../data/hooks/useCartoes'

interface CampoCartaoProps {
    rotulo?: string
    valor?: string | null
    valorMudou?: (valor: string) => void
    className?: string
}

export default function CampoCartao(props: CampoCartaoProps) {
    const { cartoes } = useCartoes()

    function listaCartoes() {
        const itens = cartoes.map(c => ({ value: c.id!, label: c.descricao! }) ?? null) ?? []
        return [{ value: '', label: 'Nenhum' }, ...itens]
    }
    
    return (
        <Select
            label={props.rotulo}
            size="md"
            leftSection={<IconCreditCard />}
            value={props.valor}
            data={listaCartoes()}
            onChange={v => props.valorMudou?.(v!)}
            className={props.className ?? ''}
        ></Select>
    )
}