import { fn } from 'utils'
import { useCallback, useEffect, useState } from 'react'
import useExtrato from './useExtrato'

export default function useReceitasDespesas() {
    const [grupos, setGrupos] = useState<any>([])
    const { extratos } = useExtrato()
    const extratosStr = JSON.stringify(extratos)

    useEffect(() => {
        if (!extratos?.length) return
        gerarGrupos()
    }, [extratosStr])

    const gerarGrupos = useCallback(() => {
        const sumarios = extratos.map((extrato) => extrato.sumario)
        const grupos = [
            {
                titulo: 'Receitas',
                dados: sumarios
                    .filter((s) => s)
                    .map((s) => ({
                        x: fn.dtfmt.data(s!.data).mmm.slash.yyyy.valor,
                        y: s!.receitas ?? 0,
                    })),
            },
            {
                titulo: 'Despesas',
                dados: sumarios
                    .filter((s) => s)
                    .map((s) => ({
                        x: fn.dtfmt.data(s!.data).mmm.slash.yyyy.valor,
                        y: s!.despesas ?? 0,
                    })),
            },
            {
                titulo: 'Total',
                dados: sumarios
                    .filter((s) => s)
                    .map((s) => ({ x: fn.dtfmt.data(s!.data).mmm.slash.yyyy.valor, y: s!.total ?? 0 })),
            },
        ]

        setGrupos(grupos)
    }, [extratosStr])

    return { grupos }
}
