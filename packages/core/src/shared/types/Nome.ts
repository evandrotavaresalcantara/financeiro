import { Validador } from 'utils'
import Resultado from '../base/Resultado'
import VO, { VOConfig } from '../base/VO'

export interface NomeCfg extends VOConfig {
    min?: number
    max?: number
}

export default class Nome extends VO<string, NomeCfg> {
    static readonly ERRO_NULO = 'NOME_NULO'
    static readonly ERRO_MENOR = 'NOME_MENOR'
    static readonly ERRO_MAIOR = 'NOME_MAIOR'

    private constructor(
        readonly valor: string,
        readonly cfg?: NomeCfg
    ) {
        super(valor, cfg)
    }

    static novo(valor?: string | null, cfg?: NomeCfg): Resultado<Nome> {
        const { min = 3, max = 50, cls, atr } = cfg ?? {}
        const { maiorOuIgualQue, menorOuIgualQue, naoNulo } = Validador

        const erro =
            naoNulo(Nome.ERRO_NULO, valor) ||
            maiorOuIgualQue(Nome.ERRO_MENOR, valor!.length, min) ||
            menorOuIgualQue(Nome.ERRO_MAIOR, valor!.length, max)

        return erro
            ? Resultado.falha<Nome>({ tipo: erro, valor, cls, atr, detalhes: { min, max } })
            : Resultado.ok(new Nome(valor!, cfg))
    }
}
