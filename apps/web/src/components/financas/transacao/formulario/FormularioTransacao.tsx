import { RegistroDTO } from "adapters";
import { TipoOperacao } from "core";
import CampoCartao from "../../../template/formulario/CampoCartao";
import CampoCategoria from "../../../template/formulario/CampoCategoria";
import CampoConta from "../../../template/formulario/CampoConta";
import CampoData from "../../../template/formulario/CampoData";
import CampoMoeda from "../../../template/formulario/CampoMoeda";
import CampoTexto from "../../../template/formulario/CampoTexto";
import CampoValoresDetalhados from "../../../template/formulario/CampoValoresDetalhados";
import Linha from "../../../template/layout/Linha";

interface FormularioTransacaoProps {
  registro: RegistroDTO;
  parcela?: boolean;
  registroMudou: (registro: RegistroDTO) => void;
  recorrenciaSelecionada?: (recorrenciaId: string) => Promise<void>;
  className?: string;
}

export default function FormularioTransacao(props: FormularioTransacaoProps) {
  const temValoresDetalhados =
    (props.registro.transacao.valoresDetalhados ?? []).length > 0;

  function alterarTransacao(atrib: string) {
    return (valor: any) => {
      const novoRegistro = {
        ...props.registro,
        transacao: {
          ...props.registro.transacao,
          [atrib]: valor,
        },
      };
      novoRegistro && props.registroMudou(novoRegistro);
    };
  }

  return (
    <>
      <span className="text-zinc-600">Informações Básicas</span>
      <hr className="mt-1 mb-3 border border-zinc-800 self-stretch" />
      <Linha md={temValoresDetalhados ? 1 : 2} className="gap-5 mb-5">
        <CampoTexto
          rotulo="Nome"
          valor={props.registro.transacao.nome ?? ""}
          valorMudou={alterarTransacao("nome")}
        />
        {!temValoresDetalhados && (
          <CampoMoeda
            rotulo={props.parcela ? "Valor da Parcela" : "Valor"}
            valor={props.registro.transacao.valor ?? 0}
            operacao={props.registro.transacao.operacao ?? TipoOperacao.DESPESA}
            valorMudou={alterarTransacao("valor")}
            operacaoMudou={alterarTransacao("operacao")}
            className="flex-1"
          />
        )}
      </Linha>
      <Linha className="mb-5">
        <CampoValoresDetalhados
          rotulo="Valores Detalhados"
          valor={props.registro.transacao.valoresDetalhados ?? []}
          valorMudou={alterarTransacao("valoresDetalhados")}
        />
      </Linha>
      <Linha md={2} className="gap-5 mb-5">
        <CampoData
          rotulo="Data"
          valor={props.registro.transacao.data}
          valorMudou={alterarTransacao("data")}
        />
        <CampoCategoria
          rotulo="Categoria"
          valor={props.registro.transacao.categoriaId}
          valorMudou={alterarTransacao("categoriaId")}
          className="mb-5"
        />
      </Linha>
      <Linha md={2} className="gap-5 mb-5">
        <CampoConta
          rotulo="Associada com Conta"
          valor={props.registro.transacao.contaId}
          valorMudou={alterarTransacao("contaId")}
        />
        <CampoCartao
          rotulo="Associada com Cartão"
          valor={props.registro.transacao.cartaoId}
          valorMudou={alterarTransacao("cartaoId")}
        />
      </Linha>
      <CampoTexto
        area={true}
        rotulo="Observações"
        valor={props.registro.transacao.observacoes}
        valorMudou={alterarTransacao("observacoes")}
      />
    </>
  );
}
