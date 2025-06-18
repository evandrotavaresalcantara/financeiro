'use client'
import AreaDados from '@/components/relatorios/AreaDados'
import GraficoLinha from '@/components/relatorios/GraficoLinha'
import Pagina from '@/components/template/base/Pagina'
import TxtGradiente from '@/components/template/shared/TxtGradiente'
import useDimensoes from '@/data/hooks/useDimensoes'
import useReceitasDespesas from '@/data/hooks/useReceitasDespesas'

export default function ReceitasVsDespesas() {
    const { grupos } = useReceitasDespesas()
    const { xl2 } = useDimensoes()
    return (
        <Pagina titulo="Receitas vs Despesas">
            <AreaDados
                titulo={
                    <>
                        <TxtGradiente>Receitas</TxtGradiente>
                        <span> vs </span>
                        <TxtGradiente cores={['from-red-500', 'to-pink-500']}>
                            Despesas
                        </TxtGradiente>
                    </>
                }
                className="bg-black"
            >
                <GraficoLinha
                    grupos={grupos}
                    altura={xl2 ? 720 : 500}
                    cores={['#4ADE80', '#EF4444', '#FDE047']}
                />
            </AreaDados>
        </Pagina>
    )
}
