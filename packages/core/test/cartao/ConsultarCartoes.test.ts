import ConsultarCartoes from '../../src/cartao/service/ConsultarCartoes'
import CartaoBuilder from '../data/CartaoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'

test('Deve consultar os cartões do usuário', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultar = await new ConsultarCartoes(new ColecaoCartaoMemoria()).executar(usuario)
    expect(consultar.deuCerto).toBe(true)
    expect(consultar.instancia).toHaveLength(0)
})

test('Deve consultar os cartões do usuário', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const repo = new ColecaoCartaoMemoria()
    await repo.salvar(usuario, CartaoBuilder.criar().agora())

    const consultar = await new ConsultarCartoes(repo).executar(usuario)
    expect(consultar.deuCerto).toBe(true)
    expect(consultar.instancia).toHaveLength(1)
})

test('Deve retornar erro na consulta', async () => {
    const usuario = UsuarioBuilder.criar().agora()
    const consultar = await new ConsultarCartoes(new ColecaoCartaoMemoria(true)).executar(usuario)
    expect(consultar.deuErrado).toBe(true)
})
