import { v4 as uuid } from 'uuid'

export default class IdUnico {
    static gerar(): string {
        return uuid()
    }
}
