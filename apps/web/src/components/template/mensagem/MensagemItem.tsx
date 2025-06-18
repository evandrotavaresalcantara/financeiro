import { IconCheck, IconExclamationMark } from "@tabler/icons-react"
import { Notification } from '@mantine/core'
import Mensagem, { TipoMensagem } from '../../../data/model/Mensagem'

interface MensagemItem {
    msg: Mensagem
    podeFechar?: boolean
    mensagemFechada?: (msg: Mensagem) => void
}

export default function MensagemItem(props: MensagemItem) {
    const [sucesso, advertancia, erro] = [
        props.msg.tipo === TipoMensagem.SUCESSO,
        props.msg.tipo === TipoMensagem.ADVERTENCIA,
        props.msg.tipo === TipoMensagem.ERRO,
    ]

    return (
        <div className="absolute top-4 right-4 w-72 md:w-96">
            <Notification
                title={props.msg.titulo}
                icon={sucesso ? <IconCheck strokeWidth={2} /> : <IconExclamationMark strokeWidth={2} />}
                color={sucesso ? 'green' : advertancia ? 'yellow' : 'red'}
            >{props.msg.detalhe}</Notification>
        </div>
    )
}