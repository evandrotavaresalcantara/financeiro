'use client'
import { TipoOperacao } from 'core'
import GraficoPorCategoria from '@/components/dashboard/GraficoPorCategoria'
import GraficoReceitasVsDespesas from '@/components/dashboard/GraficoReceitasVsDespesas'
import Linha from '@/components/template/layout/Linha'
import MaioresDespesas from '@/components/dashboard/MaioresDespesas'
import MaioresReceitas from '@/components/dashboard/MaioresReceitas'
import Pagina from '@/components/template/base/Pagina'
import SumarioAnual from '@/components/dashboard/SumarioAnual'
import TxtGradiente from '@/components/template/shared/TxtGradiente'
import useExtrato from '@/data/hooks/useExtrato'

export default function Dashboard() {
    const { extrato, extratos, extratoSubcategoria, processando } = useExtrato()

    return extrato ? (
        <Pagina titulo="Dashboard">
            <Linha>
                <SumarioAnual extratos={extratos} />
                <GraficoReceitasVsDespesas
                    processando={processando}
                    titulo={
                        <>
                            <TxtGradiente cores={['from-green-500', 'to-blue-500']}>
                                Receitas
                            </TxtGradiente>{' '}
                            vs{' '}
                            <TxtGradiente cores={['from-red-500', 'to-pink-500']}>
                                Despesas
                            </TxtGradiente>
                        </>
                    }
                    extratos={extratos}
                />
                <Linha md={2}>
                    <GraficoPorCategoria
                        processando={processando}
                        titulo={
                            <div>
                                <TxtGradiente cores={['from-green-500', 'to-blue-500']}>
                                    Receitas
                                </TxtGradiente>{' '}
                                por Categoria
                            </div>
                        }
                        data={extrato.data ?? new Date()}
                        grupos={extratoSubcategoria?.grupos ?? []}
                        operacao={TipoOperacao.RECEITA}
                    />
                    <GraficoPorCategoria
                        processando={processando}
                        titulo={
                            <div>
                                <TxtGradiente cores={['from-red-500', 'to-pink-500']}>
                                    Despesas
                                </TxtGradiente>{' '}
                                por Categoria
                            </div>
                        }
                        data={extrato.data ?? new Date()}
                        grupos={extratoSubcategoria?.grupos ?? []}
                        operacao={TipoOperacao.DESPESA}
                    />
                </Linha>
                <Linha md={2}>
                    <MaioresReceitas />
                    <MaioresDespesas />
                </Linha>
            </Linha>
        </Pagina>
    ) : null
}
