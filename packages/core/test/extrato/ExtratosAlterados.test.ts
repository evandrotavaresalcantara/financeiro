import ExtratosAlterados from "../../src/extrato/event/ExtratosAlterados"
import UsuarioBuilder from "../data/UsuarioBuilder"

test('Deve criar evento de extratos alterados', () => {
    const usuario = UsuarioBuilder.criar().agora()
    const criarEvento = ExtratosAlterados.novo({
        data: new Date(),
        usuarioEmail: usuario.email.valor,
        corpo: []
    })

    expect(criarEvento.deuCerto).toBe(true)
})

test('Deve gerar erro ao criar evento com email inválido', () => {
    const criarEvento = ExtratosAlterados.novo({
        data: new Date(),
        usuarioEmail: 'usuario@',
        corpo: []
    })

    expect(criarEvento.deuErrado).toBe(true)
})