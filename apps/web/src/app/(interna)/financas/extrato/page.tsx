'use client'
import { Loader, Modal } from '@mantine/core'
import { TipoVisualizacao } from 'core'
import { TransacaoDTO, RegistroDTO } from 'adapters'
import { useState } from 'react'
import BotaoAdicionar from '@/components/financas/transacao/outros/BotaoAdicionar'
import BotaoFiltros from '@/components/financas/transacao/outros/BotaoFiltros'
import BotaoVisualizacao from '@/components/financas/transacao/outros/BotaoVisualizacao'
import CalendarioTransacao from '@/components/financas/transacao/calendario/CalendarioTransacao'
import Card from '@/components/template/shared/Card'
import Filtros from '@/components/financas/transacao/outros/Filtros'
import FormularioRegistro from '@/components/financas/transacao/formulario/FormularioRegistro'
import Linha from '@/components/template/layout/Linha'
import Pagina from '@/components/template/base/Pagina'
import SumarioMensal from '@/components/financas/transacao/outros/SumarioMensal'
import TabelaTransacoes from '@/components/financas/transacao/tabela/TabelaTransacoes'
import useDimensoes from '@/data/hooks/useDimensoes'
import useExtrato from '@/data/hooks/useExtrato'
import useCentralDeAcesso from '@/data/hooks/useCentralDeAcesso'

export default function ExtratoMensal() {
    const {
        alternarExibirFiltros,
        consultarRecorrencia,
        excluirRegistro,
        exibirFiltros,
        extrato,
        extratoFiltrado,
        salvarRegistro,
        processando,
    } = useExtrato()
    const { usuarioConfig } = useCentralDeAcesso()
    const { smOuMenor } = useDimensoes()

    const [modalVisivel, setModalVisivel] = useState(false)
    const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>(
        usuarioConfig?.visualizacao ?? TipoVisualizacao.LISTA
    )
    const [registro, setRegistro] = useState<RegistroDTO | null>(null)

    async function salvar(registro: RegistroDTO) {
        await salvarRegistro(registro)
        setModalVisivel(false)
    }

    async function excluir(registro: RegistroDTO) {
        await excluirRegistro(registro)
        setModalVisivel(false)
    }

    async function registroSelecionado(registro: RegistroDTO | null) {
        if (registro?.transacao.virtual) return
        setRegistro(registro)
        setModalVisivel(true)
    }

    async function recorrenciaSelecionada(recorrenciaId: string) {
        const recorrencia = await consultarRecorrencia(recorrenciaId)
        if (!recorrencia) return
        setRegistro({
            tipo: 'recorrencia',
            recorrencia,
            transacao: recorrencia.transacao,
        } as RegistroDTO)
    }

    function renderizarTransacoes() {
        if (!extratoFiltrado) return null
        return visualizacao === TipoVisualizacao.CALENDARIO ? (
            <CalendarioTransacao
                extrato={extratoFiltrado}
                transacaoSelecionada={(transacao: TransacaoDTO) => {
                    registroSelecionado({
                        tipo: 'avulsa',
                        transacao,
                    } as RegistroDTO)
                }}
                transacaoMudou={async (transacao: TransacaoDTO) => {
                    await salvar({
                        tipo: 'avulsa',
                        transacao,
                    } as RegistroDTO)
                }}
            />
        ) : (
            <TabelaTransacoes
                extrato={extratoFiltrado}
                comoCard={visualizacao === TipoVisualizacao.CARD}
                transacaoSelecionada={(transacao: TransacaoDTO) => {
                    registroSelecionado({
                        tipo: 'avulsa',
                        transacao,
                    } as RegistroDTO)
                }}
                transacaoMudou={async (transacao: TransacaoDTO) => {
                    await salvar({
                        tipo: 'avulsa',
                        transacao,
                    } as RegistroDTO)
                }}
            />
        )
    }

    return extratoFiltrado && extratoFiltrado.data ? (
        <Pagina titulo="Minhas Transações">
            <Linha>
                <SumarioMensal extrato={extrato} />
                <Card className={`flex justify-between items-center bg-black`}>
                    <BotaoAdicionar menor={smOuMenor} onClick={() => registroSelecionado(null)} />
                    <div className="flex gap-2">
                        <BotaoVisualizacao
                            visualizacao={visualizacao}
                            visualizacaoMudou={setVisualizacao}
                            menor={smOuMenor}
                        />
                        <BotaoFiltros
                            exibirFiltros={exibirFiltros}
                            exibirFiltrosMudou={alternarExibirFiltros}
                            menor={smOuMenor}
                        />
                    </div>
                </Card>
                {exibirFiltros && (
                    <Card>
                        <Filtros />
                    </Card>
                )}
                <Modal
                    opened={modalVisivel}
                    onClose={() => setModalVisivel(false)}
                    centered
                    withCloseButton={false}
                    padding={0}
                >
                    <FormularioRegistro
                        registro={registro}
                        salvar={salvar}
                        excluir={excluir}
                        cancelar={async () => setModalVisivel(false)}
                        recorrenciaSelecionada={recorrenciaSelecionada}
                    />
                </Modal>
                {processando ? (
                    <div className="h-52 flex flex-col justify-center items-center gap-2">
                        <Loader size={30} variant="bars" />
                        <span className="text-zinc-500 text-sm">Carregando...</span>
                    </div>
                ) : (
                    renderizarTransacoes()
                )}
            </Linha>
        </Pagina>
    ) : null
}
