import { fn } from 'utils'
import { TipoOperacao } from 'core'
import { TransacaoDTO } from 'adapters'
import BotaoConsolidar from './BotaoConsolidar'
import Linha from '../../../template/layout/Linha'
import MarcacoesTransacao from './MarcacoesTransacao'
import Moeda from './Moeda'
import TabelaColuna from './TabelaColuna'
import useCategorias from '../../../../data/hooks/useCategorias'
import useDimensoes from '../../../../data/hooks/useDimensoes'

export interface TabelaLinhaProps {
    transacao: TransacaoDTO
    indice: number
    esconderValor?: boolean
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function TabelaLinha(props: TabelaLinhaProps) {
    const { nomeCategoria } = useCategorias()
    const { mdOuMenor, smOuMenor } = useDimensoes()
    const { transacao, indice, transacaoSelecionada, transacaoMudou } = props

    const valor = transacao.valor ?? 0
    const nome = nomeCategoria(transacao.categoriaId)

    return (
        <Linha
            cols={2}
            md={3}
            lg={4}
            className={`
                text-xs sm:text-sm md:text-base lg:text-xl rounded-md py-2 px-5
                ${indice % 2 === 0 ? 'bg-black' : 'bg-zinc-900'}
                ${!transacao.consolidada && !transacao.virtual && 'text-yellow-400'}
                ${transacao.virtual && 'text-blue-400'}
            `}
        >
            <TabelaColuna onClick={() => transacaoSelecionada?.(transacao)}>
                <BotaoConsolidar transacao={transacao} transacaoMudou={transacaoMudou} />
                <div className="flex items-center gap-2">
                    <span>{transacao.nome}</span>
                    <div className="hidden sm:flex items-center gap-2">
                        <MarcacoesTransacao transacao={transacao} />
                    </div>
                </div>
            </TabelaColuna>
            <TabelaColuna
                esconder={mdOuMenor}
                alinharNoCentro
                onClick={() => transacaoSelecionada?.(transacao)}
            >
                {fn.dtfmt.data(transacao.data)?.curta.valor}
            </TabelaColuna>
            <TabelaColuna
                esconder={smOuMenor}
                alinharNoCentro
                onClick={() => transacaoSelecionada?.(transacao)}
            >
                <div className="flex justify-center items-center">{nome !== '' ? nome : '-'}</div>
            </TabelaColuna>
            <TabelaColuna alinharADireita onClick={() => transacaoSelecionada?.(transacao)}>
                <Moeda esconderValor={props.esconderValor}>
                    {transacao.operacao === TipoOperacao.RECEITA ? valor : -valor}
                </Moeda>
            </TabelaColuna>
        </Linha>
    )
}
