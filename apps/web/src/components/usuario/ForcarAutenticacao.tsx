import { useRouter } from 'next/navigation'
import useCentralDeAcesso from '../../data/hooks/useCentralDeAcesso'
import useCarregando from '../../data/hooks/useCarregando'
import Carregando from '../template/shared/Carregando'

export default function ForcarAutenticacao(props: any) {
    const router = useRouter()
    const { executando } = useCarregando()
    const { pronto, usuario } = useCentralDeAcesso()

    if (!pronto || executando) {
        return <Carregando telaCheia />
    } else if(usuario?.email) {
        return props.children
    } else {
        router.push('/entrar')
        return <Carregando telaCheia />
    }
}