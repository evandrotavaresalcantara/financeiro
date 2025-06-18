import { faker } from '@faker-js/faker'

export default class DadosUrl {
    static avatar() {
        return faker.image.avatar()
    }
    static image() {
        return faker.image.url()
    }
    static invalida() {
        return faker.lorem.word()
    }
}
