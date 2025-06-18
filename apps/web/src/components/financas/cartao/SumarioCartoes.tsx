import { fn } from 'utils'
import { IconClipboardList, IconCreditCard, IconPercentage } from '@tabler/icons-react'
import Estatistica from '../../template/estatistica/Estatistica'
import Linha from '../../template/layout/Linha'
import useCartoes from '../../../data/hooks/useCartoes'
import useCentralDeAcesso from '../../../data/hooks/useCentralDeAcesso'
import useDataRef from '../../../data/hooks/useDataRef'
import useExtrato from '../../../data/hooks/useExtrato'

export default function SumarioCartoes() {
    const { dataRef } = useDataRef()
    const { extrato } = useExtrato()
    const { cartoes, obterFaturas } = useCartoes()
    const { usuarioConfig } = useCentralDeAcesso()

    const totalGasto = obterFaturas(dataRef).reduce((acc, fatura) => acc + fatura.valor!, 0) ?? 0
    const totalPlanejado =
        obterFaturas(dataRef).reduce((acc, fatura) => acc + fatura.valorPlanejado!, 0) ?? 0

    return extrato && cartoes ? (
        <Linha lg={3}>
            <Estatistica
                titulo={`Gastos em ${fn.dtfmt.data(extrato.data).mmm.slash.yyyy.valor}`}
                texto={totalGasto}
                icone={<IconCreditCard size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-red-400"
                comoDinheiro
            />
            <Estatistica
                titulo="Gastos Planejados"
                texto={totalPlanejado}
                icone={<IconClipboardList size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-yellow-500"
                comoDinheiro
            />
            <Estatistica
                titulo="Percentual Utilizando"
                texto={`${fn.num.percentual(totalGasto, totalPlanejado)}%`}
                icone={<IconPercentage size={60} />}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                iconeClass="text-green-400"
            />
        </Linha>
    ) : null
}
