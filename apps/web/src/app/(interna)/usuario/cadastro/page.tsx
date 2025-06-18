'use client'
import { Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import { UsuarioDTO } from 'adapters'
import CampoTexto from '@/components/template/formulario/CampoTexto'
import MiniFormulario from '@/components/template/formulario/MiniFormulario'
import Pagina from '@/components/template/base/Pagina'
import useCentralDeAcesso from '@/data/hooks/useCentralDeAcesso'

export default function CadastroUsuario() {
    const { usuario, atualizarUsuario } = useCentralDeAcesso()
    const [novoUsuario, setNovoUsuario] = useState<UsuarioDTO | null>(null)

    useEffect(() => {
        setNovoUsuario(usuario)
    }, [usuario])

    function salvarUsuario() {
        if (!novoUsuario) return
        atualizarUsuario(novoUsuario)
    }

    function alterarUsuario(atrib: string) {
        return (valor: any) => {
            if (!novoUsuario) return
            setNovoUsuario({ ...novoUsuario, [atrib]: valor })
        }
    }

    function renderizarBotao() {
        return (
            <Button className="bg-blue-600" onClick={salvarUsuario}>
                Salvar
            </Button>
        )
    }

    return (
        <Pagina titulo="Dados Cadastrais">
            <MiniFormulario
                titulo="Seu Nome"
                subtitulo="Já pensou em mudar de nome? Essa é a hora... :)"
                botoes={renderizarBotao()}
            >
                <CampoTexto valor={novoUsuario?.nome ?? ''} valorMudou={alterarUsuario('nome')} />
            </MiniFormulario>
        </Pagina>
    )
}
