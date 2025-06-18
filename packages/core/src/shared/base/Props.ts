export type TipoBasico =
    undefined | null | string | String |
    number | Number | boolean | Date

export default interface Props {
    [prop: string]: TipoBasico | TipoBasico[] | Props | Props[]
}