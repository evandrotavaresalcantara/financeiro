import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

interface BotaoAdicionarProps {
    menor?: boolean
    onClick?: (e: any) => void
}

export default function BotaoAdicionar(props: BotaoAdicionarProps) {
    return (
        <Button color="blue" px={props.menor ? 4 : 12} onClick={props.onClick}>
            <IconPlus size={props.menor ? 20 : 24} />
            {!props.menor && <span className="ml-2">Nova Transação</span>}
        </Button>
    )
}
