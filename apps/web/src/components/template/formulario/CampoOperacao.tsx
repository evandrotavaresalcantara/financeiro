import { Radio } from '@mantine/core'
import { TipoOperacao } from 'core'

interface CampoOperacaoProps {
    valor?: TipoOperacao
    valorMudou?: (valor: TipoOperacao) => void
    className?: string
}

export default function CampoOperacao(props: CampoOperacaoProps) {
    return (
        <Radio.Group
            size="md"
            value={props.valor}
            onChange={(v) => props.valorMudou?.(v as TipoOperacao)}
            className={props.className}
        >
            <Radio value={TipoOperacao.DESPESA} label="Despesa" />
            <Radio value={TipoOperacao.RECEITA} label="Receita" />
        </Radio.Group>
    )
}
