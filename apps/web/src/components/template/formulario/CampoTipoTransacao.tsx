import { IconCircleNumber1, IconRepeat } from '@tabler/icons-react'
import { RegistroDTO } from 'adapters'
import { SegmentedControl, Center, Box } from '@mantine/core'

interface CampoTipoTransacaoProps {
    valor?: RegistroDTO
    valorMudou?: (valor: RegistroDTO) => void
    className?: string
}

export default function CampoTipoTransacao(props: CampoTipoTransacaoProps) {
    return (
        <SegmentedControl
            fullWidth
            value={props.valor?.tipo ?? 'avulsa'}
            onChange={(v) => {
                if (v === 'avulsa') {
                    props?.valorMudou?.({
                        ...props.valor,
                        tipo: 'avulsa',
                    } as RegistroDTO)
                } else if (v === 'recorrencia') {
                    props?.valorMudou?.({
                        ...props.valor,
                        recorrencia: props.valor?.recorrencia ?? { indefinida: true },
                        tipo: 'recorrencia',
                    } as RegistroDTO)
                }
            }}
            className={props.className ?? ''}
            data={[
                {
                    label: (
                        <Center>
                            <IconCircleNumber1 />
                            <Box ml={10}>Avulsa</Box>
                        </Center>
                    ),
                    value: 'avulsa',
                },
                {
                    label: (
                        <Center>
                            <IconRepeat />
                            <Box ml={10}>Recorrência</Box>
                        </Center>
                    ),
                    value: 'recorrencia',
                },
            ]}
        />
    )
}
