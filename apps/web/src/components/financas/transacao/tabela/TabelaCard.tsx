import { fn } from 'utils'
import { TipoOperacao } from 'core'
import { TransacaoDTO } from 'adapters'
import BotaoConsolidar from './BotaoConsolidar'
import MarcacoesTransacao from './MarcacoesTransacao'
import Moeda from './Moeda'
import useCategorias from '../../../../data/hooks/useCategorias'

export interface TabelaCardProps {
    transacao: TransacaoDTO
    indice: number
    esconderValor?: boolean
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function TabelaCard(props: TabelaCardProps) {
    const { nomeCategoria } = useCategorias()
    const { transacao, transacaoMudou } = props
    const valor = transacao.valor ?? 0
    const nome = nomeCategoria(transacao.categoriaId)

    return (
        <div
            className={`
                flex p-4 gap-3 rounded-md
                ${props.indice % 2 === 0 ? 'bg-black' : 'bg-zinc-900'}
                ${!transacao.consolidada && !transacao.virtual && 'text-yellow-400'}
                ${transacao.virtual && 'text-blue-400'}
            `}
        >
            <div className="flex items-center">
                <BotaoConsolidar transacao={transacao} transacaoMudou={transacaoMudou} />
            </div>
            <div
                className="flex flex-col w-full cursor-pointer"
                onClick={() => props.transacaoSelecionada?.(transacao)}
            >
                <div
                    className={`
                        flex justify-between items-center
                        text-base sm:text-xl font-black
                    `}
                >
                    <div className="flex items-center gap-2">
                        <span>{transacao.nome}</span>
                        <MarcacoesTransacao transacao={transacao} />
                    </div>
                    <Moeda esconderValor={props.esconderValor}>
                        {transacao.operacao === TipoOperacao.RECEITA ? valor : -valor}
                    </Moeda>
                </div>
                <div
                    className={`
                        flex justify-between items-center
                        text-zinc-600 text-sm sm:text-base
                    `}
                >
                    <div className="flex justify-center items-center">
                        {nome ? nome : 'Sem Categoria'}
                    </div>
                    <div>{fn.dtfmt.data(transacao.data).curta.valor}</div>
                </div>
            </div>
        </div>
    )
}
