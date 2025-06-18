import { Id } from '../../src'
import Entidade, { EntidadeProps } from '../../src/shared/base/Entidade'

class Simples extends Entidade<Simples, EntidadeProps> {
    constructor(id: Id) {
        super(id)
    }
}

test('Deve instanciar uma entidade', () => {
    const id = Id.novo('123').instancia
    const entidade = new Simples(id)
    expect(entidade.id).toBe(id)
})

test('Deve comparar entidades como iguais', () => {
    const id = Id.novo('123').instancia
    const e1 = new Simples(id)
    const e2 = new Simples(id)
    expect(e1.igual(e2)).toBe(true)
    expect(e1.diferente(e2)).toBe(false)
})

test('Deve comparar entidades como diferentes', () => {
    const id1 = Id.novo('123').instancia
    const id2 = Id.novo('1234').instancia
    const e1 = new Simples(id1)
    const e2 = new Simples(id2)
    expect(e1.diferente(e2)).toBe(true)
    expect(e1.igual(e2)).toBe(false)
})
