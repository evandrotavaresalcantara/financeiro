import { TipoVisualizacao } from '../../src'
import SalvarUsuario from '../../src/usuario/service/SalvarUsuario'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoUsuarioMemoria from '../mock/ColecaoUsuarioMemoria'

test('Deve salvar o usuário corretamente', () => {
    const usuario = UsuarioBuilder.criar()
        .comImagemUrl('http://teste.com')
        .comConfig({
            esconderSumarios: true,
            esconderValores: true,
            menuMini: true,
            visualizacao: TipoVisualizacao.CARD,
            exibirFiltros: true,
            filtros: ['teste'],
        })
        .agora()

    const salvarUsuario = new SalvarUsuario(new ColecaoUsuarioMemoria()).executar(usuario)
    expect(salvarUsuario).toBeTruthy()
})

test('Deve gerar erro ao salvar o usuário', () => {
    const usuario = UsuarioBuilder.criar()
        .semId()
        .semConfig()
        .semEmail()
        .semProvider()
        .semNome()
        .agora()

    const salvarUsuario = new SalvarUsuario(new ColecaoUsuarioMemoria()).executar(usuario)

    salvarUsuario.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
