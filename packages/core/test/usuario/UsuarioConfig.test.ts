import { UsuarioConfig } from "../../src"

test('Deve instanciar usuário config', () => {
    const config = UsuarioConfig.vazio()
    expect(config.esconderSumarios).toBe(false)
    expect(config.esconderValores).toBe(false)
    expect(config.menuMini).toBe(false)
    expect(config.visualizacao).toBe('lista')
    expect(config.exibirFiltros).toBe(false)
    
})