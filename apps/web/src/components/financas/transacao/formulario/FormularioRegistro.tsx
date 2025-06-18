import { RegistroDTO, TransacaoDTO } from "adapters";
import { TipoOperacao } from "core";
import { useEffect, useState } from "react";
import CampoTipoTransacao from "../../../template/formulario/CampoTipoTransacao";
import Formulario from "../../../template/formulario/Formulario";
import FormularioRecorrencia from "./FormularioRecorrencia";
import FormularioTransacao from "./FormularioTransacao";
import {
  IconArrowsDoubleNeSw,
  IconCheck,
  IconChecks,
  IconRepeat,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import useDataRef from "../../../../data/hooks/useDataRef";

interface FormularioRegistroProps {
  registro: RegistroDTO | null;
  salvar?: (registro: RegistroDTO) => Promise<void>;
  excluir?: (registro: RegistroDTO) => Promise<void>;
  cancelar?: () => Promise<void>;
  recorrenciaSelecionada?: (recorrenciaId: string) => Promise<void>;
  className?: string;
}

export default function FormularioRegistro(props: FormularioRegistroProps) {
  const { dataRef } = useDataRef();
  const [novo, setNovo] = useState<boolean>(true);
  const [registro, setRegistro] = useState<RegistroDTO | null>(
    props.registro ?? null,
  );

  const botoesEsquerda = {
    salvarECons: {
      icone: <IconChecks />,
      cor: "bg-green-600",
      acao: "salvarEConsolidar",
      label: "Salvar e Consolidar",
    },
    salvar: {
      icone: <IconCheck />,
      cor: "bg-blue-600",
      acao: "salvar",
      label: "Salvar",
    },
    cancelar: {
      icone: <IconX />,
      cor: "bg-gray-700",
      acao: "cancelar",
      label: "Cancelar",
    },
  };

  const botoesDireita = {
    editarRec: {
      icone: <IconRepeat />,
      cor: "bg-yellow-600",
      acao: "editarRecorrencia",
      label: "Editar Recorrência",
    },
    excluir: {
      icone: <IconTrash />,
      cor: "bg-red-500",
      acao: "excluir",
      label: "Excluir",
      confirmar: true,
    },
  };

  useEffect(() => inicializarRegistro(props.registro), [props.registro]);

  function inicializarRegistro(registro: RegistroDTO | null) {
    const transacao: TransacaoDTO = {
      nome: "",
      valor: 0,
      data: new Date(dataRef.getFullYear(), dataRef.getMonth(), 5),
      consolidada: false,
      observacoes: "",
      operacao: TipoOperacao.DESPESA,
    };
    const registroVazio: RegistroDTO = { tipo: "avulsa", transacao };
    setRegistro(registro ?? registroVazio);
    setNovo(!registro);
  }

  async function executar(acao: string, registro: any) {
    if (botoesEsquerda.salvarECons.acao === acao) {
      const reg = {
        ...registro,
        transacao: { ...registro.transacao, consolidada: true },
      };
      await props.salvar?.(reg);
    } else if (botoesEsquerda.salvar.acao === acao) {
      await props.salvar?.(registro);
    } else if (botoesEsquerda.cancelar.acao === acao) {
      await props.cancelar?.();
    } else if (botoesDireita.editarRec.acao === acao) {
      await props.recorrenciaSelecionada?.(registro.transacao.recorrenciaId);
    } else if (botoesDireita.excluir.acao === acao) {
      await props.excluir?.(registro);
    }
  }

  return registro ? (
    <Formulario
      titulo={`${novo ? "Cadastrar" : "Alterar"} ${
        registro.tipo === "avulsa" ? "Transação" : "Recorrência"
      }`}
      icone={<IconArrowsDoubleNeSw />}
      objeto={registro}
      executar={executar}
      cancelar={props.cancelar}
      limparFormulario={() => setRegistro(null)}
      botoesEsquerda={[
        registro.tipo === "avulsa" ? botoesEsquerda.salvarECons : null,
        botoesEsquerda.salvar,
        botoesEsquerda.cancelar,
      ]}
      // botoesDireita={[
      //   (registro.transacao as any).recorrenciaId
      //     ? botoesDireita.editarRec
      //     : null,
      //   !novo && !(registro.transacao as any).recorrenciaId
      //     ? botoesDireita.excluir
      //     : null,
      // ]}
      botoesDireita={[
        registro.tipo === "recorrencia" ||
        (registro.transacao?.base && registro.transacao?.recorrenciaId)
          ? botoesDireita.excluir
          : null,
        registro.tipo === "avulsa" &&
        registro.transacao?.recorrenciaId &&
        !registro.transacao?.base
          ? botoesDireita.editarRec
          : null,
        registro.tipo === "avulsa" && !registro.transacao?.recorrenciaId
          ? botoesDireita.excluir
          : null,
      ]}
    >
      {novo && (
        <CampoTipoTransacao
          valor={registro}
          valorMudou={setRegistro}
          className="mb-6"
        />
      )}
      {registro.tipo === "avulsa" ? (
        <FormularioTransacao
          registro={registro}
          registroMudou={setRegistro}
          recorrenciaSelecionada={props.recorrenciaSelecionada}
        />
      ) : (
        <FormularioRecorrencia
          registro={registro}
          registroMudou={setRegistro}
        />
      )}
    </Formulario>
  ) : null;
}
