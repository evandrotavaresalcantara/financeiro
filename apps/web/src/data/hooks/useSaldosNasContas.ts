import { fn } from 'utils'
import { useCallback, useEffect, useState } from 'react'
import useContas from './useContas'
import useDataRef from './useDataRef'

export default function useSaldosNasContas() {
    const [grupos, setGrupos] = useState<any>([])
    const { contas } = useContas()
    const { dataRef } = useDataRef()

    useEffect(() => {
        if (!contas?.length) return
        gerarGrupos()
    }, [JSON.stringify(contas), dataRef])

    const gerarGrupos = useCallback(() => {
        const datas = fn.dt.mesesEntre(dataRef, fn.dt.subtrairMeses(dataRef, 11))
        const grupos = contas
            .map((conta) => {
                const dados = datas.map((data) => {
                    const saldo = conta.saldos?.find((s) => fn.dt.mesmoMes(s.data, data))
                    return {
                        x: fn.dtfmt.data(data).mmm.slash.yyyy.valor,
                        y: (saldo?.acumulado ?? 0) + (saldo?.creditos ?? 0) - (saldo?.debitos ?? 0),
                    }
                })
                if (!deveMostrarConta(dados)) return null
                return { titulo: conta.descricao, dados: dados ?? [] }
            })
            .filter((g) => g)
        setGrupos([...grupos, calcularTotal(grupos)])
    }, [contas])

    function deveMostrarConta(dados: any[]) {
        return dados?.some((dado: any) => dado.y != 0) ?? false
    }

    function calcularTotal(grupos: any) {
        return grupos.reduce(
            (total: any, grupo: any) => {
                return {
                    titulo: total.titulo,
                    dados: grupo.dados.map((dado: any, i: number) => {
                        return {
                            x: dado.x,
                            y: (total.dados[i]?.y ?? 0) + dado.y,
                        }
                    }),
                }
            },
            { titulo: 'Total', dados: [] }
        )
    }

    return { grupos }
}
