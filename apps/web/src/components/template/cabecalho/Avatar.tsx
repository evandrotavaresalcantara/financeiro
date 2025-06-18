import { UsuarioDTO } from 'adapters'
import { fn } from 'utils'
import Image from 'next/image'

interface AvatarProps {
    usuario: UsuarioDTO
    onClick?: () => void
    children?: React.ReactNode
    tamanhoFonte?: number
}

export default function Avatar(props: AvatarProps) {
    const { children, usuario, onClick, tamanhoFonte } = props

    return (
        <div
            onClick={onClick}
            className={`
            flex justify-center items-center rounded-full cursor-pointer
            relative h-10 w-10 sm:h-12 sm:w-12
        `}
        >
            {usuario && usuario.imagemUrl ? (
                <Image
                    src={usuario.imagemUrl}
                    className="rounded-full"
                    width={48}
                    height={48}
                    alt="Usuario"
                />
            ) : (
                <div
                    className={`
                        flex justify-center items-center text-white
                        bg-gradient-to-r from-blue-500 to-green-500
                        rounded-full font-bold w-full h-full 
                        ${!tamanhoFonte && 'text-xl'}
                    `}
                    style={{ fontSize: tamanhoFonte }}
                >
                    {children ? children : fn.str.iniciais(usuario.nome)}
                </div>
            )}
        </div>
    )
}
