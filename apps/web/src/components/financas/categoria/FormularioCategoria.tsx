import { CategoriaDTO } from 'adapters'
import { IconCheck, IconTags, IconTrash, IconX } from '@tabler/icons-react'
import CampoTexto from '../../template/formulario/CampoTexto'
import Formulario from '../../template/formulario/Formulario'
import useFormulario from '../../../data/hooks/useFormulario'

interface FormularioCategoriaProps {
    categoria: CategoriaDTO | null
    salvar?: (categoria: CategoriaDTO) => Promise<void>
    excluir?: (categoria: CategoriaDTO) => Promise<void>
    cancelar?: () => Promise<void>
    className?: string
}

export default function FormularioCategoria(props: FormularioCategoriaProps) {
    const { dados, alterarAtributo, limparDados } = useFormulario(props.categoria)

    const botoesEsquerda = {
        salvar: { icone: <IconCheck />, cor: 'bg-blue-600', acao: 'salvar', label: 'Salvar' },
        cancelar: { icone: <IconX />, cor: 'bg-gray-700', acao: 'cancelar', label: 'Cancelar' },
    }

    const botoesDireita = {
        excluir: {
            icone: <IconTrash />,
            cor: 'bg-red-500',
            acao: 'excluir',
            label: 'Excluir',
            confirmar: true,
        },
    }

    async function executar(acao: string, objeto: any) {
        if (botoesEsquerda.salvar.acao === acao) {
            await props.salvar?.(objeto)
        } else if (botoesEsquerda.cancelar.acao === acao) {
            await props.cancelar?.()
        } else if (botoesDireita.excluir.acao === acao) {
            await props.excluir?.(objeto)
        }
    }

    return dados ? (
        <Formulario
            icone={<IconTags />}
            titulo="Cadastro de Categoria"
            objeto={dados}
            executar={executar}
            cancelar={props.cancelar}
            limparFormulario={limparDados}
            botoesEsquerda={[botoesEsquerda.salvar, botoesEsquerda.cancelar]}
            botoesDireita={[props.categoria?.id ? botoesDireita.excluir : null]}
        >
            <CampoTexto
                rotulo="Nome"
                valor={dados.nome ?? ''}
                valorMudou={alterarAtributo('nome')}
                finalizou={() => executar('salvar', dados)}
            />
        </Formulario>
    ) : null
}
