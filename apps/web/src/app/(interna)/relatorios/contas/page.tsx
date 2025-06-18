'use client'
import AreaDados from '@/components/relatorios/AreaDados'
import GraficoLinha from '@/components/relatorios/GraficoLinha'
import Pagina from '@/components/template/base/Pagina'
import TxtGradiente from '@/components/template/shared/TxtGradiente'
import useDimensoes from '@/data/hooks/useDimensoes'
import useSaldosNasContas from '@/data/hooks/useSaldosNasContas'

export default function Contas() {
    const { grupos } = useSaldosNasContas()
    const { xl2 } = useDimensoes()
    return (
        <Pagina titulo="Saldo nas Contas">
            <AreaDados
                titulo={
                    <>
                        <span>Saldo nas </span>
                        <TxtGradiente>Contas</TxtGradiente>
                    </>
                }
                className="bg-black"
            >
                <GraficoLinha grupos={grupos} altura={xl2 ? 720 : 500} />
            </AreaDados>
        </Pagina>
    )
}
