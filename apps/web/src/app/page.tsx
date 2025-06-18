'use client'
import { useRouter } from 'next/navigation'
import Carregando from '../components/template/shared/Carregando'
import useCentralDeAcesso from '../data/hooks/useCentralDeAcesso'

export default function Home() {
    const { pronto, usuario } = useCentralDeAcesso()
    const router = useRouter()

    if (!pronto) return <Carregando telaCheia />

    router.push(usuario ? '/dashboard' : '/entrar')
    return <Carregando telaCheia />
}
