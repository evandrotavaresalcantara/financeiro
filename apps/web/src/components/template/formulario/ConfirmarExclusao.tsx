import { Button, Overlay, TextInput } from "@mantine/core"
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

export interface ConfirmarExclusaoProps {
    visivel: boolean
    texto: string
    executar: () => void
    cancelar: () => void
    className?: string
    overlayClassName?: string
}

export default function ConfirmarExclusao(props: ConfirmarExclusaoProps) {
    const [texto, setTexto] = useState('')

    function cancelar() {
        setTexto('')
        props.cancelar()
    }

    return props.visivel ? (
        <div className={`absolute top-0 left-0 h-full w-full ${props.className ?? ''}`}>
            <Overlay blur={4} color="black" className={`
                flex justify-center items-center ${props.overlayClassName ?? ''}
            `} />
            <div style={{ zIndex: 1000 }} className={`
                absolute w-full h-full text-white
                flex flex-col justify-center items-center
            `}>
                <div className="flex flex-col items-center text-center">
                    <span className="text-xl font-bold">
                        Você tem certeza <span className="underline">absoluta</span>?
                    </span>
                    <span className="text-sm mt-4">
                        Por favor digite <span className="underline font-bold lowercase">{props.texto}</span> para confirmar.
                    </span>
                    <div className="flex items-center mt-1 gap-2">
                        <TextInput
                            size="xs"
                            className="w-full"
                            value={texto}
                            onChange={e => setTexto(e.currentTarget.value)}
                        />
                        <Button color="red" size="xs" className="bg-red-500"
                            disabled={texto.toLowerCase() !== props.texto.toLowerCase()}
                            onClick={props.executar}>
                            <IconCheck size={20} />
                            <span className="hidden sm:inline ml-1">Sim</span>
                        </Button>
                        <Button color="gray" size="xs" className="bg-gray-500" onClick={cancelar}>
                            <IconArrowBack size={20} />
                            <span className="hidden sm:inline ml-1">Não</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}