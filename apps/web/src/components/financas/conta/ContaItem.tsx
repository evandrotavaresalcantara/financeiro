import { ContaDTO } from 'adapters'
import { fn } from 'utils'
import { IconBuildingBank, IconX } from '@tabler/icons-react'
import { Loader, Progress } from '@mantine/core'
import { useEffect, useState } from 'react'
import CampoCorInline from '../../template/formulario/CampoCorInline'
import CampoMoedaInline from '../../template/formulario/CampoMoedaInline'
import CampoTextoInline from '../../template/formulario/CampoTextoInline'
import Card from '../../template/shared/Card'
import ConfirmarExclusao from '../../template/formulario/ConfirmarExclusao'
import Moeda from '../transacao/tabela/Moeda'
import useContas from '../../../data/hooks/useContas'
import useDataRef from '../../../data/hooks/useDataRef'
import useDimensoes from '../../../data/hooks/useDimensoes'
import useFormulario from '../../../data/hooks/useFormulario'

export interface ContaItemProps {
    conta: ContaDTO
    salvar?: (conta: ContaDTO) => Promise<void>
    excluir?: (conta: ContaDTO) => Promise<void>
}

export default function ContaItem(props: ContaItemProps) {
    const [confirmarExclusao, setConfirmarExclusao] = useState<boolean>(false)
    const { dataRef } = useDataRef()
    const { obterSaldo, contaEmProcessamento } = useContas()
    const { xs } = useDimensoes()

    const { dados, alterarAtributo, alterarDados } = useFormulario<ContaDTO>(
        props.conta,
        { descricao: '', banco: '', cor: '', saldos: [] } as ContaDTO,
        (c) => props.salvar?.(c)
    )

    const saldo = obterSaldo(dados, dataRef)
    const valorAnterior = saldo.acumulado ?? 0
    const valorAtual = saldo.acumulado + (saldo.creditos ?? 0) - (saldo.debitos ?? 0)

    const min = fn.num.min(valorAnterior, valorAtual)
    const max = fn.num.max(valorAnterior, valorAtual)
    const diferencaPositiva = valorAnterior < valorAtual
    const diferencaPercentual = min > 0 ? fn.num.percentual(min, max) : 0

    useEffect(() => {
        alterarDados(props.conta)
    }, [props.conta])

    const primeiroDia = fn.dt.primeiroDiaDoMes(dataRef)
    const primeiroDiaFmt = fn.dtfmt.data(primeiroDia).dd.slash.mmm.valor
    const ultimoDia = fn.dt.ultimoDiaDoMes(dataRef)
    const ultimoDiaFmt = fn.dtfmt.data(ultimoDia).dd.slash.mmm.valor

    return (
        <Card className={`flex flex-col relative`} semPadding>
            <ConfirmarExclusao
                visivel={confirmarExclusao}
                texto={dados.descricao ?? 'excluir'}
                executar={() => props.excluir?.(dados)}
                cancelar={() => setConfirmarExclusao(false)}
                overlayClassName="rounded-lg"
            />
            <div className="absolute top-0 right-0">
                <button
                    className={`
                        p-1 bg-red-500 opacity-40 hover:opacity-100
                        rounded-bl-lg rounded-tr-lg
                    `}
                    onClick={() => setConfirmarExclusao(true)}
                >
                    <IconX size={15} />
                </button>
            </div>
            {contaEmProcessamento === dados.id && (
                <div className="absolute top-0 left-0 w-full h-full flex bg-black z-50 bg-opacity-70 rounded-lg">
                    <Loader className="m-auto" />
                </div>
            )}
            <div className="px-8 py-6">
                <div className="flex justify-between items-center cursor-pointer flex-wrap">
                    <div className="flex items-center">
                        <CampoCorInline
                            valor={dados.cor ?? ''}
                            icone={<IconBuildingBank size={15} />}
                            valorMudou={alterarAtributo('cor')}
                            mobile={xs}
                        />
                        <CampoTextoInline
                            valor={dados.descricao ?? ''}
                            valorMudou={alterarAtributo('descricao')}
                            min={3}
                            max={25}
                            className="text-sm sm:text-xl font-bold"
                        />
                    </div>
                </div>
                <div className="flex flex-col text-lg mt-7 text-zinc-300">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-400">
                                Créditos em {fn.dtfmt.data(dataRef)?.mmmm.valor}
                            </span>
                            <Moeda tamanhoIcone={20} className="font-mono text-sm">
                                {saldo.creditos ?? 0}
                            </Moeda>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-zinc-400">
                                Débitos em {fn.dtfmt.data(dataRef)?.mmmm.valor}
                            </span>
                            <Moeda tamanhoIcone={20} className="font-mono text-sm">
                                {-saldo.debitos ?? 0}
                            </Moeda>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mt-3">
                        <CampoMoedaInline
                            titulo={`Saldo em ${primeiroDiaFmt}`}
                            valor={valorAnterior}
                            somenteLeitura
                        />
                        <CampoMoedaInline
                            titulo={`Saldo em ${ultimoDiaFmt}`}
                            valor={valorAtual}
                            somenteLeitura
                            alinhaADireita={!xs}
                        />
                    </div>
                    <div className="flex flex-col mt-5">
                        <Progress.Root size="md" radius="xl">
                            {valorAnterior === valorAtual ? (
                                <Progress.Section value={100} color="gray" />
                            ) : (
                                <>
                                    <Progress.Section value={diferencaPercentual} color="blue" />
                                    <Progress.Section
                                        value={100 - diferencaPercentual}
                                        color={diferencaPositiva ? 'green' : 'red'}
                                    />
                                </>
                            )}
                        </Progress.Root>
                        <div className="flex justify-between text-xs text-zinc-400 mt-0.5">
                            <div>Resultado do mês:</div>
                            {valorAnterior === 0 && valorAtual > 0 && (
                                <div>Movimentação Inicial</div>
                            )}
                            {valorAnterior > 0 && valorAtual === 0 && <div>Conta Zerada</div>}
                            {valorAnterior === valorAtual && <div>Sem Movimentação</div>}
                            {min > 0 && valorAnterior !== valorAtual && (
                                <div>
                                    Saldo {100 - diferencaPercentual}%{' '}
                                    {diferencaPositiva ? 'maior' : 'menor'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
