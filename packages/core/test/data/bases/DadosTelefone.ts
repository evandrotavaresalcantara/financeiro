import Dados from './Dados'

export default class DadosTelefone {
    static valido(indice?: number): string {
        return [
            '(91) 3965-3781',
            '(95) 3571-0741',
            '(37) 2555-3023',
            '(63) 3256-6464',
            '(61) 2337-4686',
            '79 33810744',
        ][indice ?? Dados.numero.entre(0, 5)]!
    }
    static invalido(indice?: number): string {
        return ['12123', '12/123', '(81)12123222654', '973428-5055', '9734285055'][
            indice ?? Dados.numero.entre(0, 4)
        ]!
    }
}
