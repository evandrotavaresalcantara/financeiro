import CategoriaBuilder from '../data/CategoriaBuilder'
import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import SalvarCategoria from '../../src/categoria/service/SalvarCategoria'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve salvar a categoria corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const categoria = CategoriaBuilder.criar().agora()

    const salvarCategoria = new SalvarCategoria(new ColecaoCategoriaMemoria()).executar(
        categoria,
        usuario
    )
    expect(salvarCategoria).toBeTruthy()
})

test('Deve gerar um erro ao salvar a categoria', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').agora()
    const categoria = CategoriaBuilder.criar().semId().semCor().semNome().semIdPai().agora()

    const salvarCategoria = new SalvarCategoria(new ColecaoCategoriaMemoria()).executar(
        categoria,
        usuario
    )

    return salvarCategoria.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
