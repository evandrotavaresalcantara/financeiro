import Url from "../../src/shared/types/Url"

test('Deve criar uma url', () => {
    const criarUrl = Url.nova('https://www.google.com')
    expect(criarUrl.deuCerto).toBe(true)
})

test('Deve gerar erro com url inválida', () => {
    const criarUrl = Url.nova('google.com')
    expect(criarUrl.deuErrado).toBe(true)
})