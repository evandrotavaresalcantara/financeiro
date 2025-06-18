import { v4 as uuidv4 } from 'uuid'
import Dados from './Dados'

export default class DadosId {
    static produtos(indice?: number) {
        return [
            'arquiteto.dev',
            'formacao.dev',
            'universidade.dev'
        ][indice ?? Dados.numero.entre(0, 1)]
    }
    static cursos(indice?: number) {
        return [
            'controlando-codigo',
            'iniciando-com-programacao',
            'iniciando-html-e-css'
        ][indice ?? Dados.numero.entre(0, 1)]
    }
    static trilhas(indice?: number) {
        return [
            'inicial',
            'web',
            'mobile'
        ][indice ?? Dados.numero.entre(0, 1)]
    }
    static turmas(indice?: number) {
        return [
            'turma-2022-01',
            'turma-2023-02',
        ][indice ?? Dados.numero.entre(0, 1)]
    }
    static lista(){
        return [
            DadosId.produtos(),
            DadosId.produtos(),
            DadosId.produtos(),
            DadosId.produtos(),
            DadosId.produtos(),
            DadosId.produtos()
        ]
    }
    static aleatorio() {
        return uuidv4()
    }

}