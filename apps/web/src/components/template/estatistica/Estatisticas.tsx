import React from "react"
import useCentralDeAcesso from "../../../data/hooks/useCentralDeAcesso"
import useDimensoes from "../../../data/hooks/useDimensoes"
import Estatistica from "./Estatistica"
import Linha from "../layout/Linha"

export interface EstatisticasProps {
    itens?: any[]
}

export default function Estatisticas(props: EstatisticasProps) {
    const { usuarioConfig } = useCentralDeAcesso()
    const { mdOuMenor } = useDimensoes()

    function renderizarEstatistica(item: any) {
        return (
            <Estatistica
                key={item.titulo}
                titulo={item.titulo}
                texto={item.texto}
                esconder={usuarioConfig?.esconderSumarios ?? true}
                icone={React.cloneElement(item.icone, { size: mdOuMenor ? 40 : 60 })}
                iconeClass={item.iconeClass}
                textoClass={item.textoClass}
                comoDinheiro={item.comoDinheiro ?? false}
            />
        )
    }

    const colunas = props.itens?.length ?? 3

    return (
        <Linha lg={colunas}>
            {props.itens?.map(item => {
                return renderizarEstatistica(item)
            })}
        </Linha>
    )
}
