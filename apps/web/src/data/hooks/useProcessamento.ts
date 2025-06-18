import { useRef, useState } from 'react'

export default function useProcessamento() {
    const processandoRef = useRef<boolean>(false)
    const [processando, setProcessando] = useState<boolean>(false)

    return {
        processando,
        processandoRef,
        processar: async (fn: () => Promise<void>) => {
            try {
                setProcessando(true)
                await fn()
            } finally {
                setProcessando(false)
            }
        },
        iniciar: () => {
            processandoRef.current = true
            setProcessando(true)
        },
        finalizar: () => {
            processandoRef.current = false
            setProcessando(false)
        }
    }
}