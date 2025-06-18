import { faker } from "@faker-js/faker"

export default class DadosNome {
    static usuario() {
        return faker.internet.userName()
    }
}