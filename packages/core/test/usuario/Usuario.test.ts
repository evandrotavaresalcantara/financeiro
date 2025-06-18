import { TipoVisualizacao } from '../../src'
import Usuario from '../../src/usuario/model/Usuario'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve instanciar usuário', () => {
    const criarUsuario = UsuarioBuilder.criar().obter()
    expect(criarUsuario.deuCerto).toBe(true)

    const usuario = criarUsuario.instancia
    const props = usuario.props
    expect(Object.keys(props).join(',')).toBe('id,nome,email,provider,imagemUrl,config')
})

test('Deve instanciar usuários', () => {
    const props = [
        UsuarioBuilder.criar().comEmail('x@emp.com').toProps(),
        UsuarioBuilder.criar().comEmail('y@emp.com').toProps(),
    ]

    const criarUsuarios = Usuario.novos(props)
    expect(criarUsuarios.deuCerto).toBe(true)
    expect(criarUsuarios.instancia).toHaveLength(2)
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarUsuario = UsuarioBuilder.criar()
        .comId('abc')
        .comNome('Teste Qualquer')
        .comEmail('teste@gmail.com')
        .comProvider('google')
        .comImagemUrl('http://teste.com')
        .comConfig({
            esconderSumarios: true,
            esconderValores: true,
            menuMini: true,
            visualizacao: TipoVisualizacao.CARD,
            exibirFiltros: true,
            filtros: ['teste'],
        })
        .obter()
    const props = criarUsuario.instancia.props
    expect(props.id).toBe('abc')
    expect(props.nome).toBe('Teste Qualquer')
    expect(props.email).toBe('teste@gmail.com')
    expect(props.provider).toBe('google')
    expect(props.imagemUrl).toBe('http://teste.com')
    expect(props.config.esconderSumarios).toBe(true)
    expect(props.config.esconderValores).toBe(true)
    expect(props.config.menuMini).toBe(true)
    expect(props.config.visualizacao).toBe(TipoVisualizacao.CARD)
    expect(props.config.exibirFiltros).toBe(true)
    expect(props.config.filtros).toEqual(['teste'])
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = UsuarioBuilder.criar()
        .comId('abc')
        .comNome('Teste Qualquer')
        .comEmail('teste@gmail.com')
        .comProvider('google')
        .comImagemUrl('http://teste.com')
        .comConfig({
            esconderSumarios: true,
            esconderValores: true,
            menuMini: true,
            visualizacao: TipoVisualizacao.CARD,
            exibirFiltros: true,
            filtros: ['teste'],
        })
        .toProps()
    const criarUsuario = Usuario.novo(props)

    const usuario = criarUsuario.instancia
    expect(usuario.id.valor).toBe('abc')
    expect(usuario.nome.valor).toBe('Teste Qualquer')
    expect(usuario.email.valor).toBe('teste@gmail.com')
    expect(usuario.provider).toBe('google')
    expect(usuario.imagemUrl?.valor).toBe('http://teste.com')
    expect(usuario.config.esconderSumarios).toBe(true)
    expect(usuario.config.esconderValores).toBe(true)
    expect(usuario.config.menuMini).toBe(true)
    expect(usuario.config.visualizacao).toBe(TipoVisualizacao.CARD)
    expect(usuario.config.exibirFiltros).toBe(true)
    expect(usuario.config.filtros).toEqual(['teste'])
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = UsuarioBuilder.criar()
        .semConfig()
        .semEmail()
        .semImagemUrl()
        .semNome()
        .semProvider()
        .toProps()
    const criarUsuario = Usuario.novo(props)
    expect(criarUsuario.deuErrado).toBe(true)
})


test('Deve criar modelo a partir de props válidas', () => {
    const props = UsuarioBuilder.criar()
        .comId('abc')
        .comEmail('teste@gmail.com')
        .comProvider('google')
        .toProps()
    const criarUsuario = Usuario.novo({email: "teste@gmail.com", config: {}})
    console.log(criarUsuario.instancia)
    
})