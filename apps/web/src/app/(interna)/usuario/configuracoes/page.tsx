'use client'
import { TipoVisualizacao } from 'core'
import { useEffect, useState } from 'react'
import { UsuarioDTO } from 'adapters'
import FormularioEsconderSumarios from '@/components/usuario/FormularioEsconderSumarios'
import FormularioEsconderValores from '@/components/usuario/FormularioEsconderValores'
import FormularioMenuMini from '@/components/usuario/FormularioMenuMini'
import FormularioVisualizacao from '@/components/usuario/FormularioVisualizacao'
import Pagina from '@/components/template/base/Pagina'
import useCentralDeAcesso from '@/data/hooks/useCentralDeAcesso'
import useDimensoes from '@/data/hooks/useDimensoes'

export default function Configuracoes() {
    const { xs } = useDimensoes()
    const { usuario, usuarioConfig, atualizarUsuario, atualizarUsuarioConfig } =
        useCentralDeAcesso()
    const [novoUsuario, setNovoUsuario] = useState<UsuarioDTO | null>(null)

    useEffect(() => {
        setNovoUsuario(usuario)
    }, [usuario])

    function salvarUsuario(atualizado: UsuarioDTO) {
        atualizarUsuario(atualizado)
    }

    function alterarConfig(atrib: string) {
        return (valor: any) => {
            if (!novoUsuario) return
            const atualizado = {
                ...novoUsuario,
                config: { ...(usuarioConfig ?? {}), [atrib]: valor },
            }

            setNovoUsuario(atualizado)
            salvarUsuario(atualizado)
            atualizarUsuarioConfig(atualizado.config)
        }
    }

    return (
        <Pagina titulo="Configurações">
            <div className="flex flex-col gap-6">
                <FormularioVisualizacao
                    xs={xs}
                    valor={usuarioConfig?.visualizacao ?? TipoVisualizacao.LISTA}
                    valorMudou={alterarConfig('visualizacao')}
                />
                <FormularioEsconderSumarios
                    xs={xs}
                    valor={usuarioConfig?.esconderSumarios ?? false}
                    valorMudou={alterarConfig('esconderSumarios')}
                />
                <FormularioEsconderValores
                    xs={xs}
                    valor={usuarioConfig?.esconderValores ?? false}
                    valorMudou={alterarConfig('esconderValores')}
                />
                <FormularioMenuMini
                    xs={xs}
                    valor={usuarioConfig?.menuMini ?? false}
                    valorMudou={alterarConfig('menuMini')}
                />
            </div>
        </Pagina>
    )
}
