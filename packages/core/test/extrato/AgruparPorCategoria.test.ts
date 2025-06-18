import AgruparPorCategoria from '../../src/extrato/filter/AgruparPorCategoria'
import CartaoBuilder from '../data/CartaoBuilder'
import CategoriaBuilder from '../data/CategoriaBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve agrupar por categoria', () => {
    const cat = CategoriaBuilder.criar().comNome('Pessoal').agora()

    const transacoes = [
        TransacaoBuilder.criar().agora(),
        TransacaoBuilder.criar().comCategoriaId(cat.id.valor).agora(),
        TransacaoBuilder.criar().comCategoriaId(cat.id.valor).agora(),
        TransacaoBuilder.criar().comCategoriaId(cat.id.valor).agora(),
    ]
    const agrupadas = AgruparPorCategoria.aplicar([cat])(transacoes)
    expect(agrupadas).toHaveLength(4)
    expect(agrupadas[1]!.agruparPor).toBe('Pessoal')
    expect(agrupadas[2]!.agruparPor).toBe('Pessoal')
    expect(agrupadas[3]!.agruparPor).toBe('Pessoal')
})
