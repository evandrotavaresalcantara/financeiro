import { IconCreditCard } from "@tabler/icons-react"
import { ColorPicker, DEFAULT_THEME, Popover } from "@mantine/core"
import IconeArea from "../shared/IconeArea"

export interface CampoCorInlineProps {
    valor: string
    icone: any
    valorMudou?: (valor: string) => void
    mobile?: boolean
    className?: string
}

export default function CampoCorInline(props: CampoCorInlineProps) {
    return (
        <div className={`
            flex flex-col relative
            ${props.className ?? ''}
        `}>
            <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <div>
                        <IconeArea
                            tamanho={props.mobile ? 8 : 12}
                            tamanhoIcone={props.mobile ? 20 : 30}
                            cor={props.valor}
                            className={props.mobile ? 'mr-2' : 'mr-4'}
                        >
                            {props.icone}
                        </IconeArea>
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <ColorPicker
                        format="hex"

                        swatches={[
                            ...DEFAULT_THEME.colors.yellow.slice(2, 7),
                            ...DEFAULT_THEME.colors.orange.slice(5, 10),
                            ...DEFAULT_THEME.colors.green.slice(4, 9),
                            ...DEFAULT_THEME.colors.lime.slice(4, 9),
                            ...DEFAULT_THEME.colors.cyan.slice(4, 9),
                            ...DEFAULT_THEME.colors.blue.slice(4, 9),
                            ...DEFAULT_THEME.colors.grape.slice(4, 9),
                            ...DEFAULT_THEME.colors.red.slice(4, 9),
                        ]}
                        value={props.valor ? props.valor : '#7e22ce'}
                        onChange={props.valorMudou}
                    />
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}