import { IconFolder } from '@tabler/icons-react'
import { TransacaoDTO, GrupoTransacaoDTO } from 'adapters'
import { fn } from 'utils'
import React from 'react'
import TabelaCard from './TabelaCard'
import TabelaLinha from './TabelaLinha'
import useCentralDeAcesso from '../../../../data/hooks/useCentralDeAcesso'
import Linha from '../../../template/layout/Linha'

export interface TabelaGrupoProps {
    grupo: GrupoTransacaoDTO
    comoCard?: boolean
    semCabecalho?: boolean
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function TabelaGrupo(props: TabelaGrupoProps) {
    const { usuarioConfig } = useCentralDeAcesso()

    const { grupo } = props
    const id = grupo.nome ?? ''
    const total = fn.moeda.num(grupo.sumario.receitas - grupo.sumario.despesas).valor

    function renderizarTransacoes() {
        return grupo.transacoes.map((t, i) => {
            const p = {
                key: t.id,
                indice: i,
                transacao: t,
                esconderValor: usuarioConfig?.esconderValores,
                transacaoSelecionada: props.transacaoSelecionada,
                transacaoMudou: props.transacaoMudou,
            }
            return props.comoCard ? <TabelaCard {...p} /> : <TabelaLinha {...p} />
        })
    }

    return (
        <React.Fragment key={id}>
            {!props.semCabecalho && (
                <div
                    key={id}
                    className={`
                        flex justify-between items-center
                        px-2 py-1 my-4 cursor-pointer border-b border-dashed border-zinc-700
                        text-[#646464] text-sm md:text-base lg:text-lg
                    `}
                >
                    <div className="flex items-center">
                        <span className="w-[30px]">
                            <IconFolder />
                        </span>
                        <span className={id ? '' : 'text-zinc-700'}>{id ? id : '<sem grupo>'}</span>
                    </div>
                    <span>{total}</span>
                </div>
            )}
            <Linha
                sm={1}
                xl={props.comoCard ? 2 : 1}
                xl2={props.comoCard ? 3 : 1}
                className={`
                    ${props.semCabecalho ? '' : 'px-0 md:px-[37px]'}
                    ${props.comoCard ? 'gap-[12px]' : 'gap-[4px]'}
                `}
            >
                {renderizarTransacoes()}
            </Linha>
        </React.Fragment>
    )
}
