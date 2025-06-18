'use client'
import useMensagens from '@/data/hooks/useMensagens'
import MensagemItem from './MensagemItem'

export default function MostrarMensagens() {
    const { mensagens, excluirMensagem } = useMensagens()

    function renderizarMensagens() {
        if (!mensagens) return null
        return mensagens.map((msg) => {
            return msg.titulo || msg.detalhe ? (
                <MensagemItem
                    key={msg.id}
                    msg={msg}
                    mensagemFechada={(msg) => excluirMensagem(msg)}
                    podeFechar
                />
            ) : null
        })
    }

    return (
        <div className={`fixed flex flex-col justify-end right-2 top-20 m-3 z-50`}>
            {renderizarMensagens()}
        </div>
    )
}
