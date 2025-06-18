import React from "react"

export interface IconeAreaProps {
    cor?: string
    tamanho?: number
    tamanhoIcone?: number
    children: any
    className?: string
}

export default function IconeArea(props: IconeAreaProps) {

    function isCorClara(color?: string) {
        if (!color) return false
        const hex = color.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
        return brightness > 155
    }


    return (
        <div
            style={{
                backgroundColor: props.cor ? props.cor : '#7e22ce',
                minWidth: 32,
                minHeight: 32,
            }}
            className={`
                flex justify-center items-center rounded-full
                ${props.tamanho ? `w-${props.tamanho} h-${props.tamanho}` : 'w-12 h-12'}
                ${props.className ?? ''}
            `}
        >
            {React.cloneElement(props.children, {
                size: props.tamanhoIcone ?? 20,
                strokeWidth: props.children?.props?.strokeWidth ?? 1,
                className: `
                    ${isCorClara(props.cor) ? 'text-black' : 'text-white'}
                `
            })}
        </div>
    )
}