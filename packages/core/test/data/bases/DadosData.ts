import Dados from './Dados'

export default class DadosData {
    static agora(): Date {
        return new Date()
    }
    static xDiasNoFuturo(qtdeDias: number = 2): Date {
        const noFuturo = Dados.data.agoraEmMili() + qtdeDias * Dados.data.umDiaEmMili()
        return new Date(noFuturo)
    }
    static xDiasNoPassado(qtdeDias: number = 2): Date {
        const noPassado = Dados.data.agoraEmMili() - qtdeDias * Dados.data.umDiaEmMili()
        return new Date(noPassado)
    }
    static agoraEmMili() {
        return new Date().getTime()
    }
    static umDiaEmMili() {
        return 24 * 60 * 60 * 1000
    }
}
