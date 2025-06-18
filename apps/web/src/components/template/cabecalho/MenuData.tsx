import { Button, NumberInput, Popover } from '@mantine/core'
import { fn } from 'utils'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import TxtGradiente from '../shared/TxtGradiente'
import useDataRef from '../../../data/hooks/useDataRef'

interface MenuDataProps {
    titulo?: string
}

export default function MenuData(props: MenuDataProps) {
    const { dataRef, alterarDataRef, permiteAlterar } = useDataRef()

    function alterarAno(ano: number | string) {
        if (!ano) return
        alterarDataRef(new Date(+ano, dataRef.getMonth(), dataRef.getDate()))
    }

    function alterarMes(mes: number) {
        if (!mes) return
        alterarDataRef(new Date(dataRef.getFullYear(), mes - 1, dataRef.getDate()))
    }

    function incrementar() {
        alterarDataRef(fn.dt.adicionarMeses(dataRef, 1))
    }

    function decrementar() {
        alterarDataRef(fn.dt.subtrairMeses(dataRef, 1))
    }

    const mesAtual = fn.dtfmt.hoje().mmmm.space.yyyy.valor
    const mesRef = fn.dtfmt.data(dataRef).mmmm.space.yyyy.valor
    const ehMesCorrente = mesAtual === mesRef

    return (
        <div className="flex items-center gap-3">
            <Popover withArrow>
                <Popover.Target>
                    <div className="flex flex-col">
                        {props.titulo && (
                            <div
                                className={`
                                flex self-start text-sm rounded-md
                                text-zinc-400 -mb-1.5
                            `}
                            >
                                {props.titulo}
                            </div>
                        )}
                        <div
                            className={`
                            flex items-center gap-2 cursor-pointer
                            text-lg sm:text-2xl
                        `}
                        >
                            <span className="font-black">
                                <TxtGradiente>{fn.dtfmt.data(dataRef).mmmm.valor}</TxtGradiente>
                            </span>
                            <span className="font-extralight text-zinc-500">
                                {dataRef.getFullYear()}
                            </span>
                        </div>
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <div className="flex justify-center mb-5 gap-2">
                        <NumberInput value={dataRef.getFullYear()} onChange={alterarAno} />
                        {fn.dt.emMesesDiferentes(new Date(), dataRef) && (
                            <Button
                                color="yellow"
                                className="bg-orange-600"
                                onClick={() => alterarDataRef(new Date())}
                            >
                                Atual
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {fn.dtfmt.mesesDoAno().map((mes, i) => {
                            const selecionada = dataRef.getMonth() === i
                            return (
                                <Button
                                    key={i}
                                    color={selecionada ? 'red' : 'blue'}
                                    className={`${selecionada ? 'bg-red-500' : 'bg-blue-500'}`}
                                    onClick={() => alterarMes(i + 1)}
                                >
                                    {mes}
                                </Button>
                            )
                        })}
                    </div>
                </Popover.Dropdown>
            </Popover>
            <div className="flex gap-2">
                <div
                    className={`
                    flex justify-center items-center
                    bg-zinc-600 rounded-full hover:bg-yellow-600
                    text-white cursor-pointer h-6 w-6 
                `}
                    color="indigo"
                    onClick={decrementar}
                >
                    <IconChevronLeft size={17} />
                </div>
                {!ehMesCorrente && (
                    <div
                        className={`
                        hidden sm:flex justify-center items-center
                        bg-zinc-600 rounded-full hover:bg-yellow-600
                        text-white cursor-pointer h-6 px-4 text-xs
                    `}
                        color="indigo"
                        onClick={() => alterarDataRef(new Date())}
                    >
                        Atual
                    </div>
                )}
                {permiteAlterar(fn.dt.adicionarMeses(dataRef, 1)) && (
                    <div
                        className={`
                        flex justify-center items-center
                        bg-zinc-600 rounded-full hover:bg-yellow-600
                        text-white cursor-pointer h-6 w-6
                    `}
                        color="indigo"
                        onClick={incrementar}
                    >
                        <IconChevronRight size={17} />
                    </div>
                )}
            </div>
        </div>
    )
}
