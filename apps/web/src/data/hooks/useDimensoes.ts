import { useState, useEffect } from 'react'

function getTamanhoDaJanela() {
    if (typeof window !== "undefined") {
        const { innerWidth: largura, innerHeight: altura } = window
        return {
            largura,
            altura
        }
    } else {
        return {
            largura: -1,
            altura: -1,
        }
    }
}

export default function useDimensoes() {
    const [tamanhoDaJanela, setTamanhoDaJanela] = useState(getTamanhoDaJanela())

    useEffect(() => {
        function tamanhoMudou() {
            setTamanhoDaJanela(getTamanhoDaJanela())
        }

        window.addEventListener('resize', tamanhoMudou)
        return () => window.removeEventListener('resize', tamanhoMudou)
    }, [])

    function entre(min: number, max: number) {
        return tamanhoDaJanela.largura >= min && tamanhoDaJanela.largura < max
    }

    const dimensoes = {
        ...tamanhoDaJanela,
        xs: entre(0, 640),
        sm: entre(640, 768),
        md: entre(768, 1024),
        lg: entre(1024, 1280),
        xl: entre(1280, 1536),
        xl2: entre(1536, Number.MAX_VALUE),
    }

    return {
        ...dimensoes,
        smOuMenor: dimensoes.xs || dimensoes.sm,
        mdOuMenor: dimensoes.xs || dimensoes.sm || dimensoes.md,
        lgOuMenor: dimensoes.xs || dimensoes.sm || dimensoes.md || dimensoes.lg,
        xlOuMenor: dimensoes.xs || dimensoes.sm || dimensoes.md || dimensoes.lg || dimensoes.xl,
        smOuMaior: dimensoes.sm || dimensoes.md || dimensoes.lg || dimensoes.xl || dimensoes.xl2,
        mdOuMaior: dimensoes.md || dimensoes.lg || dimensoes.xl || dimensoes.xl2,
        lgOuMaior: dimensoes.lg || dimensoes.xl || dimensoes.xl2,
        xlOuMaior: dimensoes.xl || dimensoes.xl2,
    }
}