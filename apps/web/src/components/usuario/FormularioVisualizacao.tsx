import { TipoVisualizacao } from 'core'
import React, { useState } from 'react'
import MiniFormulario from '../template/formulario/MiniFormulario'
import visualizacoes from '../../data/constants/visualizacoes'
import { Button } from '@mantine/core'

interface FormularioVisualizacaoProps {
    valor: TipoVisualizacao
    xs: boolean
    valorMudou: (valor: TipoVisualizacao) => void
}

export default function FormularioVisualizacao(props: FormularioVisualizacaoProps) {
    const [tipo, setTipo] = useState<TipoVisualizacao>(props.valor)

    function renderizarBotao() {
        return (
            <Button
                className="bg-blue-500"
                onClick={() => props.valorMudou?.(tipo)}
                disabled={props.valor === tipo}
            >
                Salvar
            </Button>
        )
    }

    return (
        <MiniFormulario
            titulo="Visualização das Transações"
            subtitulo="Selecione o tipo de visualização padrão usado na tabela de transações"
            botoes={renderizarBotao()}
            textoCentralizado={props.xs}
        >
            <div
                className={`
                flex items-center gap-4 flex-wrap
                ${props.xs && 'justify-center'}
            `}
            >
                {visualizacoes.map((v) => (
                    <div
                        key={v.texto}
                        className="flex items-center flex-col gap-1 w-24 cursor-pointer"
                        onClick={() => setTipo(v.tipo)}
                    >
                        <div
                            className={`
                            flex justify-center items-center
                            w-16 h-16 rounded-full 
                            ${tipo === v.tipo ? 'bg-blue-500' : 'bg-zinc-600'}
                        `}
                        >
                            {React.cloneElement(v.icone, {
                                size: 40,
                            })}
                        </div>
                        <div className="text-zinc-500 text-sm">{v.texto}</div>
                    </div>
                ))}
            </div>
        </MiniFormulario>
    )
}
