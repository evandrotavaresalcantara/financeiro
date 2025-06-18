import { Erro } from 'utils'

export const ptBR = [
    {
        tipo: 'NOME_MENOR',
        msg: (e: Erro) =>
            `Nome deve ter entre ${e?.detalhes?.min ?? 0} e ${e?.detalhes?.max ?? 0} caracteres.`,
    },
] as Erro[]
