import Dados from "./Dados"

export default class DadosEmail {
    static lista() {
        return [
            'aluno1@formacao.dev',
            'fulano.silva@gmail.com',
            'aluno2@gmail.com',
            'fulano2.silva@gmail.com',
            'alguem@gmail.com',
            'joaozinho@gmail.com'
        ]
    }
    static especifico(indice?: number) {
        return DadosEmail.lista()[indice ?? Dados.numero.entre(0, 5)]!
    }
    static invalido(indice?: number) {
        return [
            'asdas@gmail.c',
            'asdas@gma',
            'asdas'
        ][indice ?? Dados.numero.entre(0, 2)]
    }
}