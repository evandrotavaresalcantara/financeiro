'use client'
import ContaItem from '@/components/financas/conta/ContaItem'
import Linha from '@/components/template/layout/Linha'
import NovoItem from '@/components/template/shared/NovoItem'
import Pagina from '@/components/template/base/Pagina'
import SumarioContas from '@/components/financas/conta/SumarioContas'
import useContas from '@/data/hooks/useContas'

export default function Cartoes() {
    const { contas, adicionarConta, salvarConta, excluirConta } = useContas()

    function renderizarContas() {
        return contas?.map((conta) => {
            return (
                <ContaItem
                    key={conta.id}
                    conta={conta}
                    salvar={salvarConta}
                    excluir={excluirConta}
                />
            )
        })
    }

    return (
        <Pagina titulo="Minhas Contas">
            <Linha className="gap-10">
                <SumarioContas />
                <Linha lg={2} xl={3}>
                    {renderizarContas()}
                    <NovoItem texto="Nova Conta" adicionar={adicionarConta} />
                </Linha>
            </Linha>
        </Pagina>
    )
}
