import { Burger } from "@mantine/core"
import useDimensoes from "../../../data/hooks/useDimensoes"
import useMenu from "../../../data/hooks/useMenu"
import MenuData from "./MenuData"
import MenuUsuario from "./MenuUsuario"

interface CabecalhoProps {
    titulo?: string
}

export default function Cabecalho(props: CabecalhoProps) {
    const { xs } = useDimensoes()
    const { drawer, mini, aberto, alternarMenu } = useMenu()
    return (
        <div className={`
            relative flex justify-between items-center
            min-h-[74px] bg-black px-7 w-full
        `}>
            <div className="flex items-center gap-2 sm:gap-4">
                <Burger
                    size={xs ? "sm" : "md"}
                    color="gray"
                    opened={drawer ? aberto : !mini}
                    onClick={alternarMenu}
                />
                <MenuData titulo={props.titulo} />
            </div>
            <MenuUsuario />
        </div>
    )
}