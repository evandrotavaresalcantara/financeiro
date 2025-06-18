import Titulo from "../base/Titulo"

interface LogoProps {
    mini?: boolean
    className?: string
}

export default function Logo(props: LogoProps) {
    const oval = { borderRadius: '50%' }
    return (
        <div className={`flex gap-3 items-center ${props.className ?? ''}`}>
            <div style={oval} className={`
                flex justify-around items-center
                bg-rose-300 h-8 w-12 px-2.5
            `}>
                <div style={oval} className="bg-yellow-900 h-4 w-[9px]" />
                <div style={oval} className="bg-yellow-900 h-4 w-[9px]" />
            </div>
            {!props.mini && <Titulo titulo={['Pou', 'Pig']} />}
        </div>
    )
}