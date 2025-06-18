'use client'
import CartaoItem from '@/components/financas/cartao/CartaoItem'
import Linha from '@/components/template/layout/Linha'
import NovoItem from '@/components/template/shared/NovoItem'
import Pagina from '@/components/template/base/Pagina'
import SumarioCartoes from '@/components/financas/cartao/SumarioCartoes'
import useCartoes from '@/data/hooks/useCartoes'

export default function Cartoes() {
    const { cartoes, adicionarCartao, salvarCartao, excluirCartao } = useCartoes()

    function renderizarCartoes() {
        return cartoes?.map((cartao) => {
            return (
                <CartaoItem
                    key={cartao.id}
                    cartao={cartao}
                    salvar={salvarCartao}
                    excluir={excluirCartao}
                />
            )
        })
    }

    return (
        <Pagina titulo="Meus Cartões">
            <Linha className="gap-10">
                <SumarioCartoes />
                <Linha lg={2} xl={3}>
                    {renderizarCartoes()}
                    <NovoItem texto="Novo Cartão" adicionar={adicionarCartao} />
                </Linha>
            </Linha>
        </Pagina>
    )
}
