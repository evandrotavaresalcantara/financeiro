import Dados from './Dados'

export default class DadosCpf {
    static valido(indice?: number): string {
        return [
            '414.478.740-05',
            '770.295.822-76',
            '651.948.833-07',
            '481.981.745-08',
            '764.859.744-66',
            '11814701613',
            '55547553301',
            '24931764304',
            '12259651364',
            '21187341827',
        ][indice ?? Dados.numero.entre(0, 9)]!
    }
    static invalido(indice?: number): string {
        return ['0123456789', '0123', '321-556-112', '647.493.433', '647493433'][
            indice ?? Dados.numero.entre(0, 4)
        ]!
    }
}
