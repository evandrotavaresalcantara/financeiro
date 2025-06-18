import { Button, TextInput } from '@mantine/core'
import { IconArrowUp, IconArrowDown, IconCurrencyReal } from '@tabler/icons-react'
import { TipoOperacao } from 'core'
import { fn } from 'utils'
import React from 'react'

interface CampoMoedaProps {
    rotulo?: string
    valor: number
    operacao: TipoOperacao
    tamanho?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    valorMudou: (valor: number) => void
    operacaoMudou: (operacao: TipoOperacao) => void
    somenteLeitura?: boolean
    className?: string
}

export default function CampoMoeda(props: CampoMoedaProps) {
    const despesa = props.operacao === TipoOperacao.DESPESA

    function valor() {
        return fn.moeda.num(props.valor ?? 0).valor
    }

    function valorMudou(e: any) {
        const valor = fn.moeda.desformatar(e.target.value)
        const valorAbsoluto = Math.abs(valor)
        props.valorMudou?.(valorAbsoluto)
    }

    const tamanhoIcone = {
        xs: 18,
        sm: 20,
        md: 22,
        lg: 26,
        xl: 30,
    }[props.tamanho ?? 'md']

    const icone = React.cloneElement(<IconCurrencyReal />, { size: tamanhoIcone })

    return (
        <div className="flex items-end gap-2">
            <TextInput
                label={props.rotulo}
                size={props.tamanho ?? 'md'}
                type="tel"
                leftSection={icone}
                readOnly={props.somenteLeitura ?? false}
                value={valor()}
                onChange={valorMudou}
                className={`
                    ${despesa ? 'red' : 'green'}
                    ${props.className ?? ''}
                `}
                rightSection={
                    despesa ? (
                        <Button
                            color="red"
                            px={2}
                            className="bg-red-600 h-6"
                            onClick={() => props.operacaoMudou(TipoOperacao.RECEITA)}
                        >
                            <IconArrowDown size={tamanhoIcone - 2} />
                        </Button>
                    ) : (
                        <Button
                            color="green"
                            px={2}
                            className="bg-green-600 h-6"
                            onClick={() => props.operacaoMudou(TipoOperacao.DESPESA)}
                        >
                            <IconArrowUp size={tamanhoIcone - 2} />
                        </Button>
                    )
                }
            />
        </div>
    )
}
