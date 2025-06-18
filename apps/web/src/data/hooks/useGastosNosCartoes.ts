import { fn } from 'utils'
import { useCallback, useEffect, useState } from 'react'
import useCartoes from './useCartoes'
import useDataRef from './useDataRef'

export default function useGastosNosCartoes() {
    const [grupos, setGrupos] = useState<any>([])
    const { cartoes } = useCartoes()
    const { dataRef } = useDataRef()

    useEffect(() => {
        if (!cartoes?.length) return
        gerarGrupos()
    }, [JSON.stringify(cartoes), dataRef])

    const gerarGrupos = useCallback(() => {
        const datas = fn.dt.mesesEntre(dataRef, fn.dt.subtrairMeses(dataRef, 11))
        const grupos = cartoes
            .map((cartao) => {
                const dados = datas.map((data) => {
                    const fatura = cartao.faturas?.find((f) => fn.dt.mesmoMes(f.data!, data))
                    return {
                        x: fn.dtfmt.data(data).mmm.slash.yyyy.valor,
                        y: fatura?.valor ?? 0,
                    }
                })
                if (!deveMostrarCartao(dados)) return null
                return { titulo: cartao.descricao, dados: dados ?? [] }
            })
            .filter((g) => g)
        setGrupos([...grupos, calcularTotal(grupos)])
    }, [cartoes])

    function deveMostrarCartao(dados: any[]) {
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
