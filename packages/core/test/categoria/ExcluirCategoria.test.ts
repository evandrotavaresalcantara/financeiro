import CategoriaBuilder from '../data/CategoriaBuilder'
import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import ExcluirCategoria from '../../src/categoria/service/ExcluirCategoria'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve excluir a categoria corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const categoria = CategoriaBuilder.criar().agora()

    const excluirCategoria = new ExcluirCategoria(new ColecaoCategoriaMemoria()).executar(
        categoria,
        usuario
    )
    expect(excluirCategoria).toBeTruthy()
})

test('Deve gerar um erro ao excluir a categoria', async () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const categoria = CategoriaBuilder.criar()
        .semId()
        .semCor()
        .semNome()
        .semIdPai()
        .agora()

    const repo = new ColecaoCategoriaMemoria()
    const excluirCategoria = await new ExcluirCategoria(repo).executar(categoria, usuario)
    expect(excluirCategoria.deuErrado).toBe(true)
})

test('Deve gerar um erro ao excluir a categoria', async () => {
    const categoria = CategoriaBuilder.criar().agora()
    const repo = new ColecaoCategoriaMemoria()
    const excluirCategoria = await new ExcluirCategoria(repo).executar(categoria, null as any)

    expect(excluirCategoria.deuErrado).toBe(true)
})
