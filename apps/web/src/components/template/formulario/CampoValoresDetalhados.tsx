import { Badge } from '@mantine/core'
import { IconSquareMinus, IconSquarePlus, IconX } from '@tabler/icons-react'
import { ValorDetalhadoDTO } from 'adapters'
import { TipoOperacao } from 'core'
import { fn, IdUnico } from 'utils'
import { useEffect, useState } from 'react'
import CampoMoeda from './CampoMoeda'
import CampoTexto from './CampoTexto'
import Linha from '../layout/Linha'

export interface CampoValoresDetalhadosProps {
    rotulo?: string
    valor?: ValorDetalhadoDTO[]
    valorMudou?: (valor: ValorDetalhadoDTO[]) => void
}

export default function CampoValoresDetalhados(props: CampoValoresDetalhadosProps) {
    const [fechado, setFechado] = useState(!props.valor?.length)
    const [valores, setValores] = useState<ValorDetalhadoDTO[]>(props.valor ?? [])

    useEffect(() => {
        salvarEstado(props.valor ?? [], true)
    }, [])

    function qtdeValores(itens?: ValorDetalhadoDTO[]) {
        return (itens ?? valores).filter((v) => !vazio(v)).length ?? 0
    }

    function vazio(v: ValorDetalhadoDTO) {
        return v.descricao.trim() === '' && v.valor === 0
    }

    function total() {
        return valores.reduce((total, v) => {
            const valor = v.operacao === TipoOperacao.RECEITA ? v.valor : -v.valor
            return total + valor
        }, 0)
    }

    function alterarValorDetalhado(valor: ValorDetalhadoDTO) {
        const novosValores = valores.map((v) => {
            return v.id === valor.id ? valor : v
        })
        salvarEstado(novosValores)
    }

    function excluirValorDetalhado(valor: ValorDetalhadoDTO) {
        const novosValores = valores.filter((v) => v.id !== valor.id)
        salvarEstado(novosValores)
    }

    function salvarEstado(valores: ValorDetalhadoDTO[], interno: boolean = false) {
        const apenasValidos = valores.filter((v) => !vazio(v))
        const novo: ValorDetalhadoDTO = {
            id: IdUnico.gerar(),
            descricao: '',
            valor: 0,
            operacao: TipoOperacao.DESPESA,
        }
        setValores([...apenasValidos, novo])
        qtdeValores() > 0 && qtdeValores(apenasValidos) === 0 && setFechado(true)
        !interno && props.valorMudou?.(apenasValidos)
    }

    function renderizarValorDetalhado(detalhado: ValorDetalhadoDTO, indice: number) {
        return (
            <div key={`valor-detalhado-${detalhado.id}`} className="flex items-center gap-2">
                <Linha md={2}>
                    <CampoTexto
                        tamanho="sm"
                        valor={detalhado.descricao}
                        valorMudou={(descricao) => {
                            alterarValorDetalhado({ ...detalhado, descricao })
                        }}
                    />
                    <CampoMoeda
                        tamanho="sm"
                        valor={detalhado.valor}
                        operacao={detalhado.operacao}
                        valorMudou={(valor) => {
                            alterarValorDetalhado({ ...detalhado, valor })
                        }}
                        operacaoMudou={(operacao) => {
                            alterarValorDetalhado({ ...detalhado, operacao })
                        }}
                    />
                </Linha>
                {qtdeValores() >= 1 && (
                    <div className="min-w-[15px] min-h-[15px]">
                        {!vazio(detalhado) && (
                            <IconX
                                size={15}
                                className={`bg-red-500 rounded-full cursor-pointer p-0.5`}
                                onClick={() => excluirValorDetalhado(detalhado)}
                            />
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            <div
                className={`
                    flex justify-between items-center
                    ${fechado && 'text-zinc-600 text-sm'}
                `}
            >
                <div className="flex items-center gap-2">
                    {fechado ? (
                        <IconSquarePlus
                            strokeWidth={1}
                            size={20}
                            className="text-zinc-500 cursor-pointer"
                            onClick={() => setFechado(false)}
                        />
                    ) : (
                        <IconSquareMinus
                            strokeWidth={1}
                            size={20}
                            className="text-zinc-500 cursor-pointer"
                            onClick={() => setFechado(true)}
                        />
                    )}
                    <span>{props.rotulo ?? 'Valores Detalhados'}</span>
                    {qtdeValores() > 0 && (
                        <Badge size="xs" className="text-white bg-red-500">
                            {qtdeValores()}
                        </Badge>
                    )}
                </div>
                {qtdeValores() > 0 && (
                    <div
                        className={`
                            text-sm font-bold
                            ${
                                total() < 0
                                    ? 'text-red-500'
                                    : total() > 0
                                      ? 'text-green-500'
                                      : 'text-zinc-500'
                            }
                        `}
                    >
                        {fn.moeda.num(total()).valor}
                    </div>
                )}
            </div>
            {!fechado && (
                <div
                    className={`
                        flex flex-col items-center rounded-md gap-2
                        border border-dashed border-zinc-600
                        mt-2 p-3
                    `}
                >
                    {valores.map(renderizarValorDetalhado)}
                </div>
            )}
        </div>
    )
}
