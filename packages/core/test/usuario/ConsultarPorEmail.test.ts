import ConsultarPorEmail from '../../src/usuario/service/ConsultarPorEmail'
import Dados from '../data/bases/Dados'
import ColecaoUsuarioMemoria from '../mock/ColecaoUsuarioMemoria'

test('Deve consultar o usuário corretamente', async () => {
    const consultarUsuario = await new ConsultarPorEmail(new ColecaoUsuarioMemoria()).executar(
        Dados.email.especifico(0)
    )
    expect(consultarUsuario.deuCerto).toBe(true)
})

test('Deve consultar o usuário inexistente', async () => {
    const consultarUsuario = await new ConsultarPorEmail(new ColecaoUsuarioMemoria()).executar(
        'usuario@empresa.com.br'
    )
    expect(consultarUsuario.deuCerto).toBe(true)
    expect(consultarUsuario.instancia).toBeNull()
})

test('Deve gerar um erro ao consultar por email', async () => {
    const consultarUsuario = await new ConsultarPorEmail(new ColecaoUsuarioMemoria(true)).executar(
        Dados.email.especifico(0)
    )
    expect(consultarUsuario.deuErrado).toBe(true)
})
