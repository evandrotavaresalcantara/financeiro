import { Validador } from 'utils'
import Resultado from '../base/Resultado'
import VO, { VOConfig } from '../base/VO'

export interface DescricaoCfg extends VOConfig {
    min?: number
    max?: number
}

export default class Descricao extends VO<string, DescricaoCfg> {
    static readonly ERRO_NULO = 'DESCRICAO_NULA'
    static readonly ERRO_MENOR = 'DESCRICAO_MENOR'
    static readonly ERRO_MAIOR = 'DESCRICAO_MAIOR'

    private constructor(
        readonly valor: string,
        readonly cfg?: DescricaoCfg
    ) {
        super(valor, cfg)
    }

    static nova(valor?: string | null, cfg?: DescricaoCfg): Resultado<Descricao> {
        const { min = 3, max = 50, cls, atr } = cfg ?? {}
        const { maiorOuIgualQue, menorOuIgualQue, naoNulo } = Validador

        const erro =
            naoNulo(Descricao.ERRO_NULO, valor) ||
            maiorOuIgualQue(Descricao.ERRO_MENOR, valor!.length, min) ||
            menorOuIgualQue(Descricao.ERRO_MAIOR, valor!.length, max)

        return erro
            ? Resultado.falha<Descricao>({ tipo: erro, valor, cls, atr, detalhes: { min, max } })
            : Resultado.ok(new Descricao(valor!, cfg))
    }
}
