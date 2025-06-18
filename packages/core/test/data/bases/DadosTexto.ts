import { faker } from '@faker-js/faker'
import Dados from './Dados'

export default class DadosTexto {
    static entre(min: number = 2, max: number = 255) {
        const intervalo = Math.floor(Math.random() * (max - min) + min)
        return faker.string.alpha(intervalo)
    }
    static invalido(min: number = 2, max: number = 255) {
        if (Dados.booleano.aleatorio()) {
            return Dados.texto.menorQue(min)
        } else {
            return Dados.texto.maiorQue(max)
        }
    }
    static menorQue(tamanho: number = 10) {
        const intervalo = Math.floor(Math.random() * tamanho - 1)

        return faker.string.alpha(intervalo)
    }
    static maiorQue(tamanho: number = 255) {
        let texto = ''
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        for (var i = 0; i < tamanho + 1; i++) {
            texto += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        }

        return texto
    }
    static geradorCaracteres(tamanho: number) {
        return faker.string.alpha(tamanho)
    }
}
