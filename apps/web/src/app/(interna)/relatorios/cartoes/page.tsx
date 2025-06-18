'use client'
import AreaDados from '@/components/relatorios/AreaDados'
import GraficoLinha from '@/components/relatorios/GraficoLinha'
import Pagina from '@/components/template/base/Pagina'
import TxtGradiente from '@/components/template/shared/TxtGradiente'
import useDimensoes from '@/data/hooks/useDimensoes'
import useGastosNosCartoes from '@/data/hooks/useGastosNosCartoes'

export default function Cartoes() {
    const { grupos } = useGastosNosCartoes()
    const { xl2 } = useDimensoes()
    return (
        <Pagina titulo="Gastos nos Cartões">
            <AreaDados
                titulo={
                    <>
                        <span>Gastos nos </span>
                        <TxtGradiente>Cartões</TxtGradiente>
                    </>
                }
                className="bg-black"
            >
                <GraficoLinha grupos={grupos} altura={xl2 ? 720 : 500} />
            </AreaDados>
        </Pagina>
    )
}
