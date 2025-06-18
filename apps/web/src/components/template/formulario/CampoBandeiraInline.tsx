import { IconCheck } from '@tabler/icons-react'
import { Popover } from '@mantine/core'
import { TipoBandeira } from 'core'
import amex from '../../../../public/imgs/cards/amex.png'
import card from '../../../../public/imgs/cards/card.png'
import elo from '../../../../public/imgs/cards/elo.png'
import hiper from '../../../../public/imgs/cards/hiper.png'
import Image from 'next/image'
import Linha from '../layout/Linha'
import master from '../../../../public/imgs/cards/master.png'
import visa from '../../../../public/imgs/cards/visa.png'

export interface CampoBandeiraInlineProps {
    valor: string
    valorMudou?: (valor: string) => void
    mobile?: boolean
    className?: string
}

export default function CampoBandeiraInline(props: CampoBandeiraInlineProps) {
    function imagemSelecionada() {
        if (props.valor === TipoBandeira.MASTERCARD) return master
        else if (props.valor === TipoBandeira.VISA) return visa
        else if (props.valor === TipoBandeira.HIPERCARD) return hiper
        else if (props.valor === TipoBandeira.ELO) return elo
        else if (props.valor === TipoBandeira.AMEX) return amex
        else return card
    }

    function renderizarLogoCartao(
        imagem: any,
        tipo: string | null = null,
        selecionada: boolean = false
    ) {
        return (
            <div
                className={`
                    relative cursor-pointer
                    flex justify-center items-center 
                `}
                onClick={tipo ? () => props.valorMudou?.(tipo) : undefined}
            >
                <Image
                    src={imagem}
                    width={props.mobile ? 40 : 60}
                    alt={`Logo cartão ${tipo ?? ''}`}
                    className={`select-none`}
                />
                {selecionada && (
                    <div
                        className={`
                            flex justify-center items-center
                            absolute w-full h-full rounded-fulll
                            bg-black bg-opacity-60
                            border border-green-400
                        `}
                    >
                        <IconCheck strokeWidth={3} size={20} className="absolute text-green-400" />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div
            className={`
                flex flex-col relative
                ${props.className ?? ''}
            `}
        >
            <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <div>{renderizarLogoCartao(imagemSelecionada())}</div>
                </Popover.Target>
                <Popover.Dropdown>
                    <Linha cols={2}>
                        {renderizarLogoCartao(
                            master,
                            TipoBandeira.MASTERCARD,
                            master === imagemSelecionada()
                        )}
                        {renderizarLogoCartao(
                            visa,
                            TipoBandeira.VISA,
                            visa === imagemSelecionada()
                        )}
                        {renderizarLogoCartao(
                            hiper,
                            TipoBandeira.HIPERCARD,
                            hiper === imagemSelecionada()
                        )}
                        {renderizarLogoCartao(elo, TipoBandeira.ELO, elo === imagemSelecionada())}
                        {renderizarLogoCartao(
                            amex,
                            TipoBandeira.AMEX,
                            amex === imagemSelecionada()
                        )}
                        {renderizarLogoCartao(
                            card,
                            TipoBandeira.OUTRA,
                            card === imagemSelecionada()
                        )}
                    </Linha>
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}
