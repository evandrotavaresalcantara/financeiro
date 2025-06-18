import LoginComProvedor from '../../src/usuario/service/LoginComProvedor'
import ColecaoAutenticacaoMemoria from '../mock/ColecaoAutenticacaoMemoria'
import ColecaoUsuarioMemoria from '../mock/ColecaoUsuarioMemoria'

test('Deve fazer o login do usuário com provedor corretamente', async () => {
    const login = await new LoginComProvedor(
        new ColecaoAutenticacaoMemoria(),
        new ColecaoUsuarioMemoria()
    ).executar('google')

    expect(login.deuCerto).toBe(true)
    expect(login.instancia?.email?.valor).toBeDefined()
})

test('Deve gerar um erro ao fazer o login do usuário com provedor corretamente', () => {
    const login = new LoginComProvedor(
        new ColecaoAutenticacaoMemoria(),
        new ColecaoUsuarioMemoria()
    ).executar('teste')

    expect(login).toBeTruthy()
})
