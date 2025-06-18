import { useState } from 'react'
import { fn } from 'utils'

export default function useFormulario<T = any>(
    dadosIniciais: T = {} as T,
    dadosVazios: T = {} as T,
    dadosMudou?: (dados: T) => void
) {
    const [dados, setDados] = useState<T>(dadosIniciais)

    function alterarDados(novosDados: any) {
        if (fn.obj.iguais(dados, novosDados)) return
        setDados(novosDados)
        dadosMudou?.(novosDados)
    }

    function alterarAtributo(caminho: string, func?: (v: any) => any) {
        return (valor: any) => {
            const v = _obterValor(valor)

            const novoValor = func?.(v) ?? v
            const valorAtual = fn.obj.obterValor(dados, caminho)
            if (novoValor === valorAtual) return

            const novosDados = fn.obj.alterarValor(dados, caminho, novoValor)
            setDados(novosDados)
            dadosMudou?.(novosDados)
        }
    }

    function limparDados() {
        setDados(dadosVazios)
    }

    function _obterValor(v: any) {
        const target = v?.currentTarget ?? v?.target
        const checkbox = target?.type === 'checkbox'
        const valor = checkbox ? target?.checked : target?.value
        return valor ?? v
    }

    return {
        dados,
        alterarAtributo,
        alterarDados,
        limparDados,
    }
}
