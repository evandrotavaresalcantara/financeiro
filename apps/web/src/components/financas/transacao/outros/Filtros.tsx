import { Badge } from '@mantine/core'
import { FiltroExtratoDTO } from 'adapters'
import GrupoFiltro from '../../../../data/model/GrupoFiltro'
import useExtrato from '../../../../data/hooks/useExtrato'

export default function Filtros() {
    const { filtrosAgrupados, alternarFiltro, filtroEstaSelecionado } = useExtrato()

    function renderizarGrupo(grupo: GrupoFiltro) {
        return (
            <div
                className={`
                    flex flex-col flex-1 flex-wrap gap-2 relative
                    border border-zinc-600 rounded-md p-5 min-w-[100%] sm:min-w-[40%] md:min-w-[30%]
                `}
                key={grupo.nome}
            >
                <h3
                    className={`
                        flex items-center gap-2
                        text-sm font-bold text-zinc-500 absolute -top-2.5 left-3
                        bg-black px-3
                    `}
                >
                    {grupo.icone} {grupo.nome}
                </h3>
                <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                    {grupo.filtros.map((filtro) => {
                        return (
                            <FiltroItem
                                key={filtro.id}
                                filtro={filtro}
                                selecionado={filtroEstaSelecionado(filtro)}
                                onClick={() => alternarFiltro(filtro)}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
            {filtrosAgrupados?.map((grupo) => {
                return renderizarGrupo(grupo)
            })}
        </div>
    )
}

interface FiltroItemProps {
    filtro: FiltroExtratoDTO
    selecionado: boolean
    onClick?: (e: any) => void
}

function FiltroItem(props: FiltroItemProps) {
    return (
        <Badge
            color={props.selecionado ? 'green' : '#555'}
            onClick={props.onClick}
            className="text-white cursor-pointer select-none"
        >
            {props.filtro.nome}
        </Badge>
    )
}
