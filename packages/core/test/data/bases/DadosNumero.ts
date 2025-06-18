import { faker } from "@faker-js/faker"
import Dados from "./Dados"

export default class DadosNumero {
    static entre(min: number, max: number) {
        return faker.number.int({ min, max })
    }
    static aleatorio(tamanho: number = 2) {
        return +faker.random.numeric(tamanho)
    }
    static negativo() {
        return Dados.numero.entre(-1000, -1)
    }
}