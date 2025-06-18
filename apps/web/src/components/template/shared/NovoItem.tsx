import { IconPlus } from "@tabler/icons-react"
import { Loader } from "@mantine/core"
import useProcessamento from "../../../data/hooks/useProcessamento"

export interface NovoItemProps {
    texto: string
    adicionar: () => void
}

export default function NovoItem(props: NovoItemProps) {
    const { processando, processar } = useProcessamento()
    
    async function adicionar() {
        processar(async () => props.adicionar())
    }

    return (
        <div className={`
            flex flex-col justify-center items-center
            border border-dashed border-zinc-400 text-zinc-400
            p-7 rounded-xl cursor-pointer
        `} onClick={adicionar}>
            {processando ? (
                <Loader />
            ) : (
                <>
                    <span className={`
                        flex justify-center items-center 
                        border border-zinc-300
                        rounded-full w-10 h-10 mb-2
                    `}>
                        <IconPlus size={30} />
                    </span>
                    <span className="font-light">{props.texto}</span>
                </>                
            )}
        </div>
    )
}