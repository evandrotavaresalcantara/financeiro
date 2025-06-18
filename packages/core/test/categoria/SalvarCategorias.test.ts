import CategoriaBuilder from '../data/CategoriaBuilder'
import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import SalvarCategorias from '../../src/categoria/service/SalvarCategorias'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve salvar as categorias corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const categoria = CategoriaBuilder.criar().agora()
    const outraCategoria = CategoriaBuilder.criar().comNome('Outra categoria').agora()

    const salvarCategoria = new SalvarCategorias(new ColecaoCategoriaMemoria()).executar(
        [categoria, outraCategoria],
        usuario
    )
    expect(salvarCategoria).toBeTruthy()
})

test('Deve gerar um erro ao salvar as categorias', async () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const categoria = CategoriaBuilder.criar()
        .semId()
        .semCor()
        .semNome()
        .semIdPai()
        .agora()
    const outraCategoria = CategoriaBuilder.criar().comNome('Outra categoria').agora()

    const repo = new ColecaoCategoriaMemoria()
    const salvarCategoria = await new SalvarCategorias(repo).executar(
        [categoria, outraCategoria],
        usuario
    )

    expect(salvarCategoria.deuErrado).toBe(true)
})

test('Deve gerar um erro ao salvar as categorias com usuario nulo', async () => {
    const categoria = CategoriaBuilder.criar().agora()
    const repo = new ColecaoCategoriaMemoria()
    const salvarCategoria = await new SalvarCategorias(repo).executar([categoria], null as any)
    expect(salvarCategoria.deuErrado).toBe(true)
})

test('Deve gerar um erro ao salvar as categorias com categorias nula', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const repo = new ColecaoCategoriaMemoria()
    const salvarCategoria = await new SalvarCategorias(repo).executar(null as any, usuario)
    expect(salvarCategoria.deuErrado).toBe(true)
})
