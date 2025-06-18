import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import ConsultarCategorias from '../../src/categoria/service/ConsultarCategorias'
import UsuarioBuilder from '../data/UsuarioBuilder'
import CategoriaBuilder from '../data/CategoriaBuilder'

test('Deve consultar categorias', async () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const repo = new ColecaoCategoriaMemoria()
    await repo.salvarTodas(usuario, [
        CategoriaBuilder.criar().comNome('C1').agora(),
        CategoriaBuilder.criar().comNome('C2').agora(),
        CategoriaBuilder.criar().comNome('C3').agora(),
    ])

    const consultar = await new ConsultarCategorias(repo).executar(usuario)
    expect(consultar.deuCerto).toBe(true)
    expect(consultar.instancia.length).toBe(3)
})

test('Deve retornar erro na consulta', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultar = await new ConsultarCategorias(new ColecaoCategoriaMemoria(true)).executar(
        usuario
    )
    expect(consultar.deuErrado).toBe(true)
})

test('Deve retornar erro com categoria inválida', async () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const repo = new ColecaoCategoriaMemoria()
    await repo.salvarTodas(usuario, [CategoriaBuilder.criar().semNome().agora()])

    const consultar = await new ConsultarCategorias(repo).executar(usuario)
    expect(consultar.deuErrado).toBe(true)
})
