import { ExtratoDTO } from 'adapters'
import { IconPigMoney, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
import Estatisticas from '../../../template/estatistica/Estatisticas'

export interface SumarioMensalProps {
    extrato: ExtratoDTO | null
}

export default function SumarioMensal(props: SumarioMensalProps) {
    const { extrato } = props

    const receitas = extrato?.sumario!.receitas ?? 0
    const despesas = extrato?.sumario!.despesas ?? 0
    const total = receitas - despesas

    return extrato ? (
        <Estatisticas
            itens={[
                {
                    titulo: 'Total de Receitas',
                    texto: receitas,
                    icone: <IconTrendingUp />,
                    iconeClass: 'text-green-500',
                    textoClass: 'text-green-300',
                    comoDinheiro: true,
                },
                {
                    titulo: 'Total de Despesas',
                    texto: -despesas,
                    icone: <IconTrendingDown />,
                    iconeClass: 'text-red-500',
                    textoClass: 'text-red-300',
                    comoDinheiro: true,
                },
                {
                    titulo: 'Saldo do Mês',
                    texto: total,
                    icone: <IconPigMoney />,
                    iconeClass: 'text-yellow-500',
                    textoClass: total < 0 ? 'text-red-300' : total > 0 ? 'text-green-300' : '',
                    comoDinheiro: true,
                },
            ]}
        />
    ) : null
}
