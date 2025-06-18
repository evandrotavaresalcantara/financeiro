import Logout from "../../src/usuario/service/Logout"
import ColecaoAutenticacaoMemoria from "../mock/ColecaoAutenticacaoMemoria"

test('Deve fazer o logout do usuário corretamente', () => {
    const logout = new Logout(new ColecaoAutenticacaoMemoria()).executar()

    expect(logout).toBeTruthy()
})