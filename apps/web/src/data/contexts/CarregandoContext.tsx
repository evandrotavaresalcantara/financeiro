'use client'
import { createContext, useState } from "react"

export interface CarregandoContextProps {
    executando: boolean
    iniciarExecucao: () => void
    pararExecucao: () => void
}

const CarregandoContext = createContext<CarregandoContextProps>({
    executando: false,
    iniciarExecucao: () => { },
    pararExecucao: () => { },
})

export function CarregandoProvider(props: any) {
    const [executando, setExecutando] = useState(false)

    return (
        <CarregandoContext.Provider value={{
            executando,
            iniciarExecucao: () => {
                setExecutando(true)
            },
            pararExecucao: () => {
                setExecutando(false)
            },
        }}>
            {props.children}
        </CarregandoContext.Provider>
    )
}

export default CarregandoContext