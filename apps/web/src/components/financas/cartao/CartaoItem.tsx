import { CartaoDTO, FaturaDTO } from 'adapters'
import { fn } from 'utils'
import { IconCreditCard, IconX } from '@tabler/icons-react'
import { Loader, Progress } from '@mantine/core'
import { useEffect, useState } from 'react'
import CampoBandeiraInline from '../../template/formulario/CampoBandeiraInline'
import CampoCorInline from '../../template/formulario/CampoCorInline'
import CampoMoedaInline from '../../template/formulario/CampoMoedaInline'
import CampoTextoInline from '../../template/formulario/CampoTextoInline'
import Card from '../../template/shared/Card'
import ConfirmarExclusao from '../../template/formulario/ConfirmarExclusao'
import useCartoes from '../../../data/hooks/useCartoes'
import useDataRef from '../../../data/hooks/useDataRef'
import useDimensoes from '../../../data/hooks/useDimensoes'
import useFormulario from '../../../data/hooks/useFormulario'

export interface CartaoItemProps {
    cartao: CartaoDTO
    salvar?: (cartao: CartaoDTO) => Promise<void>
    excluir?: (cartao: CartaoDTO) => Promise<void>
}

export default function CartaoItem(props: CartaoItemProps) {
    const [confirmarExclusao, setConfirmarExclusao] = useState<boolean>(false)
    const { dataRef } = useDataRef()
    const { obterFatura, cartaoEmProcessamento } = useCartoes()
    const { xs } = useDimensoes()

    const { dados, alterarAtributo, alterarDados } = useFormulario<CartaoDTO>(
        props.cartao,
        {} as CartaoDTO,
        (c) => props.salvar?.(c)
    )

    const fatura = obterFatura(dados, dataRef)
    const percentualUtilizado = fn.num.percentual(fatura?.valor ?? 0, fatura?.valorPlanejado ?? 0)
    const percentualReal =
        percentualUtilizado > 100
            ? fn.num.percentual(fatura?.valorPlanejado ?? 0, fatura?.valor ?? 0)
            : percentualUtilizado

    useEffect(() => {
        alterarDados(props.cartao)
    }, [props.cartao])

    function alterarFatura(valorPlanejado: number) {
        const faturaAlterada: FaturaDTO = { ...fatura, valorPlanejado: -Math.abs(valorPlanejado) }
        const outrasFaturas = dados.faturas.filter((f) => f.id !== faturaAlterada.id)
        const faturas = [...outrasFaturas, faturaAlterada].sort((f1, f2) =>
            fn.str.ordenar(f1.id!, f2.id!)
        )

        alterarAtributo('faturas')(faturas)
    }

    return (
        <Card className={`flex flex-col relative`} semPadding>
            <ConfirmarExclusao
                visivel={confirmarExclusao}
                texto={dados.descricao!}
                executar={() => props.excluir?.(dados)}
                cancelar={() => setConfirmarExclusao(false)}
                overlayClassName="rounded-lg"
            />
            {cartaoEmProcessamento === dados.id && (
                <div className="absolute top-0 left-0 w-full h-full flex bg-black z-50 bg-opacity-70 rounded-lg">
                    <Loader className="m-auto" />
                </div>
            )}
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
            <div className="px-8 py-6">
                <div className="flex justify-between items-center cursor-pointer flex-wrap">
                    <div className="flex items-center">
                        <CampoCorInline
                            valor={dados.cor ?? ''}
                            icone={<IconCreditCard size={15} />}
                            valorMudou={alterarAtributo('cor')}
                            mobile={xs}
                        />
                        <CampoTextoInline
                            valor={dados.descricao!}
                            valorMudou={alterarAtributo('descricao')}
                            min={3}
                            max={25}
                            className="text-sm sm:text-xl font-bold"
                        />
                    </div>
                    <CampoBandeiraInline
                        valor={dados.bandeira!}
                        mobile={xs}
                        valorMudou={alterarAtributo('bandeira')}
                    />
                </div>
                <div className="flex flex-col text-lg mt-7 text-zinc-300">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">
                        <CampoMoedaInline
                            titulo={`Utilizado em ${fn.dtfmt.data(dataRef).mmm.space.yyyy.valor}`}
                            valor={fatura?.valor ?? 0}
                            somenteLeitura={true}
                        />
                        <CampoMoedaInline
                            titulo="Valor Planejado"
                            valor={fatura?.valorPlanejado ?? 0}
                            valorMudou={(valor) => alterarFatura(valor)}
                            alinhaADireita={!xs}
                        />
                    </div>
                    <div className="flex flex-col mt-3">
                        <span className="text-xs text-zinc-400 mb-2">Percentual</span>
                        <Progress.Root size="md" radius="xl">
                            {percentualReal != percentualUtilizado ? (
                                <>
                                    <Progress.Section value={percentualReal} color="blue" />
                                    <Progress.Section value={100 - percentualReal} color="red" />
                                </>
                            ) : (
                                <Progress.Section value={percentualReal} color="blue" />
                            )}
                        </Progress.Root>
                        <div className="flex justify-between text-xs text-zinc-400 mt-0.5">
                            <div>{percentualUtilizado}%</div>
                            <div>
                                {fn.moeda.num(Math.abs(fatura?.valor ?? 0)).valor} de{' '}
                                {fn.moeda.num(Math.abs(fatura?.valorPlanejado ?? 0)).valor}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
