import { ExtratoDTO, SumarioDTO, TransacaoDTO, GrupoTransacaoDTO } from 'adapters'
import { fn } from 'utils'
import { TipoOperacao } from 'core'
import CalendarioDia from './CalendarioDia'
import Linha from '../../../template/layout/Linha'
import TxtGradiente from '../../../template/shared/TxtGradiente'
import useDimensoes from '../../../../data/hooks/useDimensoes'

interface CalendarioTransacaoProps {
    extrato: ExtratoDTO
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function CalendarioTransacao(props: CalendarioTransacaoProps) {
    const { extrato } = props
    const { lgOuMaior } = useDimensoes()

    const ano = extrato.data.getFullYear()
    const mes = extrato.data.getMonth()

    function renderizarCabecalho(diaDaSemana: string) {
        const hoje = fn.dtfmt.hoje().wdd.valor
        return (
            <div
                key={diaDaSemana}
                className={`
                    hidden lg:flex justify-center flex-1
                    bg-zinc-900 text-zinc-400 p-2
                    rounded-md w-full font-bold text-sm
                `}
            >
                {hoje === diaDaSemana ? <TxtGradiente>{diaDaSemana}</TxtGradiente> : diaDaSemana}
            </div>
        )
    }

    function renderizarDias() {
        const inicio = lgOuMaior ? fn.dt.primeiroDiaDoMes(extrato.data).getDay() - 1 : 0
        const fim = fn.dt.ultimoDiaDoMes(extrato.data).getDate()

        const dias = Array(fim + inicio)
            .fill(0)
            .map((_, i) => {
                const dt = new Date(ano, mes, 1)
                dt.setDate(i - inicio + 1)
                return dt
            })

        const maisDias = Array(7 - (dias.length % 7))
            .fill(0)
            .map((_, i) => {
                return new Date(ano, mes + 1, i + 1)
            })

        return [...dias, ...(lgOuMaior ? maisDias : [])].map((dia) => {
            return (
                <CalendarioDia
                    key={dia.getTime()}
                    grupo={grupoDoDia(dia)}
                    data={dia}
                    transacaoMudou={props.transacaoMudou}
                    transacaoSelecionada={props.transacaoSelecionada}
                />
            )
        })
    }

    function grupoDoDia(dia: Date) {
        const trs = extrato.transacoes.filter((t: TransacaoDTO) => {
            return fn.dt.mesmoDia(t.data, dia)
        })
        const somar = (acc: number, t: TransacaoDTO) => acc + t.valor
        const receitas = (t: TransacaoDTO) => t.operacao === TipoOperacao.RECEITA
        const despesas = (t: TransacaoDTO) => t.operacao === TipoOperacao.DESPESA
        return {
            nome: fn.dtfmt.data(dia).wdd.valor,
            sumario: {
                data: dia,
                receitas: trs.filter(receitas).reduce(somar, 0),
                despesas: trs.filter(despesas).reduce(somar, 0),
            } as SumarioDTO,
            transacoes: trs,
        } as GrupoTransacaoDTO
    }

    return (
        <Linha cols={2} md={3} lg={7} className="gap-1">
            {fn.dtfmt.diasDaSemana().map((dia) => {
                return renderizarCabecalho(dia)
            })}
            {renderizarDias()}
        </Linha>
    )
}
