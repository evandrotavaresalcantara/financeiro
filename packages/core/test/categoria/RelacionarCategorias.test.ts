import RelacionarCategorias from '../../src/categoria/model/RelacionarCategorias'
import CategoriaBuilder from '../data/CategoriaBuilder'

test('Deve ', () => {
    const categorias = [
        CategoriaBuilder.criar().comIdPai('casa').comNome('Aluguel').agora(),
        CategoriaBuilder.criar().comId('casa').comNome('Casa').agora(),
        CategoriaBuilder.criar().comIdPai('casa').comNome('Condomínio').agora(),
    ]
    const relacionar = new RelacionarCategorias(categorias)
    const relacionadas = relacionar.executar()
    expect(relacionadas.deuCerto).toBe(true)
    expect(relacionadas.instancia).toHaveLength(1)
})
