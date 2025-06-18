import { LoadingOverlay } from '@mantine/core'
import React from 'react'
import useProcessamento from '../../../data/hooks/useProcessamento'

interface ComLoaderProps {
    tamanho?: number
    children: any
}

export default function ComLoader(props: ComLoaderProps) {
    const { processando, iniciar, finalizar } = useProcessamento()
    return (
        <div className="relative">
            <LoadingOverlay
                visible={processando ?? false}
                overlayProps={{ opacity: 0 }}
                loaderProps={{ size: props.tamanho ?? 30 }}
                className="absolute"
            />
            <div className={processando ? 'invisible' : ''}>
                {React.Children.map(props.children, (el) => {
                    const props = Object.keys(el.props).reduce((novasProps, prop) => {
                        const evento = prop.startsWith('on') && typeof el.props[prop] === 'function'
                        if (evento) {
                            novasProps[prop] = async function (...e: any[]) {
                                try {
                                    iniciar()
                                    await el.props[prop](...e)
                                } finally {
                                    finalizar()
                                }
                            }
                        } else {
                            novasProps[prop] = el.props[prop]
                        }
                        return novasProps
                    }, {} as any)
                    return React.cloneElement(el, props)
                })}
            </div>
        </div>
    )
}
