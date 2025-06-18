import MonitorarAutenticacao from '../../src/usuario/service/MonitorarAutenticacao'
import ColecaoAutenticacaoMemoria from '../mock/ColecaoAutenticacaoMemoria'
import ColecaoUsuarioMemoria from '../mock/ColecaoUsuarioMemoria'

test('Deve monitorar o login do usuário com provedor corretamente', async () => {
    const auth = new ColecaoAutenticacaoMemoria()
    const monitorar = await new MonitorarAutenticacao(auth, new ColecaoUsuarioMemoria()).executar(
        (usuario) => {
            expect(usuario).toBeDefined()
        }
    )
    await auth.loginComProvedor('google')
    expect(monitorar.deuCerto).toBe(true)
})

test('Deve monitorar logout', async () => {
    const auth = new ColecaoAutenticacaoMemoria()
    await new MonitorarAutenticacao(auth, new ColecaoUsuarioMemoria()).executar((usuario) => {
        expect(usuario).toBeDefined()
    })
    await auth.logout()
})
