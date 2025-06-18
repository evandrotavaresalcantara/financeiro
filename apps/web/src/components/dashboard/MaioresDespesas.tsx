import { IconTable } from '@tabler/icons-react'
import { TipoOperacao } from 'core'
import { fn } from 'utils'
import { TransacaoDTO } from 'adapters'
import AreaDados from '../relatorios/AreaDados'
import Carregando from '../template/shared/Carregando'
import Moeda from '../financas/transacao/tabela/Moeda'
import NaoEncontrado from '../template/shared/NaoEncontrado'
import TxtGradiente from '../template/shared/TxtGradiente'
import useCentralDeAcesso from '../../data/hooks/useCentralDeAcesso'
import useExtrato from '../../data/hooks/useExtrato'

export default function MaioresDespesas() {
    const { processando, extratos } = useExtrato()
    const { usuarioConfig } = useCentralDeAcesso()
    const datas = extratos.map((extrato) => extrato.data)
    const min = fn.dt.min(...datas)!
    const max = fn.dt.max(...datas)!

    const despesas = extratos.reduce((despesas, extrato) => {
        const despesasAtuais = extrato.transacoes.filter(
            (transacao: TransacaoDTO) => transacao.operacao === TipoOperacao.DESPESA
        )
        return [...despesas, ...despesasAtuais]
    }, [] as TransacaoDTO[])

    const topDespesas = despesas
        .sort((a: TransacaoDTO, b: TransacaoDTO) => b.valor - a.valor)
        .slice(0, 5)

    const titulo = (
        <>
            Maiores <TxtGradiente cores={['from-red-500', 'to-pink-500']}>Despesas</TxtGradiente>
        </>
    )
    const subtitulo =
        min && max
            ? `Entre ${fn.dtfmt.data(min).mmmm.slash.yyyy.valor} e ${
                  fn.dtfmt.data(max).mmmm.slash.yyyy.valor
              }`
            : ''

    return (
        <AreaDados titulo={titulo} subtitulo={subtitulo}>
            {processando ? (
                <div className="flex items-center h-[250px]">
                    <Carregando simples className="mb-7" />
                </div>
            ) : topDespesas.length > 0 ? (
                <div
                    className={`
                    border  border-zinc-800
                    mx-5 my-3 w-full text-lg rounded-lg overflow-hidden
                `}
                >
                    {topDespesas.map((despesa: TransacaoDTO, i: number) => (
                        <div
                            key={despesa.id}
                            className={`
                            flex pr-4 py-2 border-zinc-800
                            ${i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-950'}
                            ${i === topDespesas.length - 1 ? '' : 'border-b'}
                        `}
                        >
                            <div className="w-28 text-center text-zinc-500">
                                {despesa?.data && fn.dtfmt.data(despesa.data).mmm.slash.yyyy.valor}
                            </div>
                            <div className="flex-1 font-black">{despesa.nome}</div>
                            <Moeda esconderValor={usuarioConfig?.esconderSumarios}>
                                {-despesa.valor}
                            </Moeda>
                        </div>
                    ))}
                </div>
            ) : (
                <NaoEncontrado icone={<IconTable size={120} />} descricao="Sem dados para exibir" />
            )}
        </AreaDados>
    )
}
