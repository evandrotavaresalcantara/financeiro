'use client'
import { MultiSelect } from '@mantine/core'
import AreaDados from '@/components/relatorios/AreaDados'
import GraficoLinha from '@/components/relatorios/GraficoLinha'
import Pagina from '@/components/template/base/Pagina'
import TxtGradiente from '@/components/template/shared/TxtGradiente'
import useDimensoes from '@/data/hooks/useDimensoes'
import useEvolucaoRecorrencia from '@/data/hooks/useEvolucaoRecorrencia'

export default function Recorrencias() {
    const { recorrencias, idsSelecionados, grupos, selecionarRecorrencias } = useEvolucaoRecorrencia()
    const { xl2 } = useDimensoes()

    return (
        <Pagina titulo="Evolução Recorrências">
            <AreaDados
                titulo={
                    <>
                        <span>Evolução das </span>
                        <TxtGradiente>Recorrências</TxtGradiente>
                    </>
                }
                className="bg-black"
            >
                <MultiSelect
                    placeholder="Selecione as Recorrências"
                    value={idsSelecionados}
                    onChange={selecionarRecorrencias}
                    data={recorrencias.map((r) => ({ value: r.id!, label: r.transacao!.nome! }))}
                    width={500}
                />

                <GraficoLinha grupos={grupos} altura={xl2 ? 720 : 500} />
            </AreaDados>
        </Pagina>
    )
}
