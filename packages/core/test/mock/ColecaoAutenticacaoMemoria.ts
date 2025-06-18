import { MonitorarAut, PararMonitoramentoAut, ProvedorAutenticacao, Usuario } from '../../src'
import Dados from '../data/bases/Dados'
import Resultado from '../../src/shared/base/Resultado'

export default class ColecaoAutenticacaoMemoria implements ProvedorAutenticacao {
    private _fn: MonitorarAut | null = null
    private usuarios: Resultado<Usuario>[] = [
        Usuario.novo({
            id: Dados.id.aleatorio(),
            nome: Dados.nome.usuario(),
            email: Dados.email.especifico(),
            config: {
                esconderSumarios: false,
                esconderValores: false,
                menuMini: false,
                exibirFiltros: false,
                filtros: [Dados.texto.geradorCaracteres(3), Dados.texto.geradorCaracteres(3)],
            },
        }),
        Usuario.novo({
            id: Dados.id.aleatorio(),
            nome: Dados.nome.usuario(),
            email: Dados.email.especifico(0),
            provider: 'google',
            config: {
                esconderSumarios: false,
                esconderValores: false,
                menuMini: false,
                exibirFiltros: false,
                filtros: [Dados.texto.geradorCaracteres(3), Dados.texto.geradorCaracteres(3)],
            },
        }),
    ]

    async loginComProvedor(providerId: string): Promise<Usuario | null> {
        const usuario = this.usuarios.find((u) => u.instancia?.props.provider === providerId)
            ?.instancia
        this._fn?.(usuario ?? null)
        return usuario ?? null
    }

    async logout(): Promise<void> {
        this._fn?.(null)
    }

    monitorar(fn: MonitorarAut): PararMonitoramentoAut {
        this._fn = fn
        return () => {
            this._fn = null
        }
    }
}
