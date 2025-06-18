import { Textarea, TextInput } from '@mantine/core'
import { IconLicense, IconWriting } from '@tabler/icons-react'
import React from 'react'

interface CampoTextoProps {
    rotulo?: string
    placeholder?: string
    icone?: any
    valor?: string
    area?: boolean
    tamanho?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    valorMudou?: (valor: string) => void
    finalizou?: () => void
    className?: string
}

export default function CampoTexto(props: CampoTextoProps) {
    const iconeSelecionado = props.area ? <IconLicense /> : <IconWriting />
    const icone = React.cloneElement(props.icone ? props.icone : iconeSelecionado,  {
        size: {
            "xs": 18,
            "sm": 20,
            "md": 22,
            "lg": 26,
            "xl": 30
        }[props.tamanho ?? 'md']
    })
    return props.area ? (
        <Textarea
            label={props.rotulo}
            size={props.tamanho ?? 'md'}
            placeholder={props.placeholder ?? ''}
            leftSection={icone}
            value={props.valor ?? ''}
            onChange={e => props.valorMudou?.(e.target.value)}
            className={props.className ?? ''}
        />
    ) : (
        <TextInput
            label={props.rotulo}
            size={props.tamanho ?? 'md'}
            placeholder={props.placeholder ?? ''}
            leftSection={icone}
            value={props.valor}
            onChange={e => props.valorMudou?.(e.target.value)}
            className={props.className ?? ''}
            onKeyDown={e => e.code.toLowerCase() === 'enter' && props.finalizou?.()}
        />
    )
}