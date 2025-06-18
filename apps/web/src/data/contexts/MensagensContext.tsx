'use client'
import { createContext, useEffect, useRef, useState } from 'react'
import { Tradutor, IdUnico } from 'utils'
import Mensagem, { TipoMensagem } from '../model/Mensagem'

export interface MensagensContextProps {
    mensagens: Mensagem[]
    tratarErro: (e: any) => void
    adicionarMensagem: (mensagem: Mensagem | Mensagem[], tipo?: TipoMensagem) => void
    adicionarSucesso: (mensagem: Mensagem | Mensagem[]) => void
    adicionarErro: (mensagem: Mensagem | Mensagem[]) => void
    adicionarErroInesperado: () => void
    excluirMensagem: (mensagem: Mensagem) => void
    limparMensagens: () => void
}

const MensagensContext = createContext<MensagensContextProps>({
    mensagens: [],
    tratarErro: () => {},
    adicionarMensagem: () => {},
    adicionarSucesso: () => {},
    adicionarErro: () => {},
    adicionarErroInesperado: () => {},
    excluirMensagem: () => {},
    limparMensagens: () => {},
})

export function MensagensProvider(props: any) {
    const oficial = useRef<Mensagem[]>([])
    const mensagensRef = useRef<any>()

    const [mensagens, setMensagens] = useState<Mensagem[]>([])

    useEffect(() => {
        oficial.current = []
    }, [])

    useEffect(() => {
        mensagensRef.current = [mensagens, setMensagens]
    }, [mensagens])

    function tratarErro(e: any) {
        Tradutor.traduzirErros(e).map((e) => {
            adicionarErro({
                detalhe: e,
                duracao: 5000,
            })
        })
    }

    function adicionarMensagem(mensagem: Mensagem | Mensagem[], tipo: TipoMensagem | null = null) {
        let novasMsgs = Array.isArray(mensagem) ? mensagem : [mensagem]
        novasMsgs = novasMsgs.map((msg) => {
            const novaMsg = {
                ...msg,
                duracao: msg.duracao ?? 0,
                tipo: tipo ?? msg.tipo,
                id: msg.id ?? IdUnico.gerar(),
            }

            if (novaMsg?.duracao > 0) {
                setTimeout(() => {
                    excluirMensagem(novaMsg)
                }, novaMsg.duracao)
            }

            return novaMsg
        })

        oficial.current = [...oficial.current, ...novasMsgs]
        setMensagens(oficial.current)
    }

    function excluirMensagem(mensagem: Mensagem) {
        const [_, setMensagens] = mensagensRef.current
        oficial.current = oficial.current.filter((m) => mensagem.id !== m.id)
        setMensagens(oficial.current)
    }

    function adicionarErro(m: Mensagem | Mensagem[]) {
        adicionarMensagem(m, TipoMensagem.ERRO)
    }

    return (
        <MensagensContext.Provider
            value={{
                mensagens,
                tratarErro,
                adicionarMensagem,
                adicionarSucesso: (m) => adicionarMensagem(m, TipoMensagem.SUCESSO),
                adicionarErro,
                adicionarErroInesperado: () =>
                    adicionarErro({ detalhe: 'Ocorreu erro inesperado!', duracao: 5000 }),
                excluirMensagem,
                limparMensagens: () => setMensagens([]),
            }}
        >
            {props.children}
        </MensagensContext.Provider>
    )
}

export default MensagensContext
