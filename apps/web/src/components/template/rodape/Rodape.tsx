import { IconHeart } from "@tabler/icons-react"
import packageJson from "../../../../package.json"

export default function Rodape() {
    return (
        <div className={`
            flex justify-end items-center gap-1.5
            border-t border-[#222] text-zinc-500
            px-7 min-h-[50px] text-xs sm:text-sm
        `}>
            <span>® {new Date().getFullYear()} COD<span className="text-red-500">3</span>R Ensino - Feito com</span>
            <span className="text-red-500">
                <IconHeart fill="#ef4444" size={15} />
            </span>
            <span>
                - v{packageJson.version}
            </span>
        </div>
    )
}