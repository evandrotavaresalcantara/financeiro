import { fn } from 'utils'
import {
    IconCalendar,
    IconCalendarTime,
    IconTrendingDown,
    IconTrendingUp,
} from '@tabler/icons-react'
import Estatistica from '../../template/estatistica/Estatistica'
import Linha from '../../template/layout/Linha'
import useCentralDeAcesso from '../../../data/hooks/useCentralDeAcesso'
import useContas from '../../../data/hooks/useContas'
import useDataRef from '../../../data/hooks/useDataRef'
import useExtrato from '../../../data/hooks/useExtrato'

export default function SumarioContas() {
    const { dataRef } = useDataRef()
    const { extrato } = useExtrato()
    const { contas, obterSaldos } = useContas()
    const { usuarioConfig } = useCentralDeAcesso()

    const saldos = obterSaldos(dataRef) ?? []
    const saldoInicial = saldos.map((s) => s.acumulado).reduce((a, b) => a + b, 0)
    const saldoFinal = saldos
        .map((s) => s.acumulado + (s.creditos ?? 0) - (s.debitos ?? 0))
        .reduce((a, b) => a + b, 0)
    const diferenca = saldoFinal - saldoInicial

    if (!extrato || !contas) return null

    const primeiroDia = fn.dt.primeiroDiaDoMes(extrato!.data)
    const primeiroDiaFmt = fn.dtfmt.data(primeiroDia).dd.slash.mmm.valor
    const ultimoDia = fn.dt.ultimoDiaDoMes(extrato.data)
    const ultimoDiaFmt = fn.dtfmt.data(ultimoDia).dd.slash.mmm.valor

    return (
        <Linha lg={3}>
            <Estatistica
                titulo={`Saldos em ${primeiroDiaFmt}`}
                texto={saldoInicial}
                icone={<IconCalendar size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-green-400"
                comoDinheiro
            />
            <Estatistica
                titulo={`Saldos em ${ultimoDiaFmt}`}
                texto={saldoFinal}
                icone={<IconCalendarTime size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-blue-500"
                comoDinheiro
            />
            <Estatistica
                titulo={`Diferença dos Saldos em ${fn.dtfmt.data(extrato.data).mmm.slash.yyyy.valor}`}
                texto={diferenca}
                icone={
                    diferenca > 0 ? <IconTrendingUp size={60} /> : <IconTrendingDown size={60} />
                }
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass={diferenca > 0 ? 'text-green-400' : diferenca < 0 ? 'text-red-400' : ''}
                textoClass={diferenca > 0 ? 'text-green-400' : diferenca < 0 ? 'text-red-400' : ''}
                comoDinheiro
            />
        </Linha>
    )
}
