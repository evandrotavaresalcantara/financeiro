import { RegistroDTO } from "adapters";
import CampoBoolean from "../../../template/formulario/CampoBoolean";
import CampoData from "../../../template/formulario/CampoData";
import CampoParcelas from "../../../template/formulario/CampoParcelas";
import FormularioTransacao from "./FormularioTransacao";
import Linha from "../../../template/layout/Linha";
import { Alert, Notification } from "@mantine/core";
import {
  IconExclamationCircle,
  IconExclamationMark,
  IconRepeat,
} from "@tabler/icons-react";

interface FormularioRecorrenciaProps {
  registro: RegistroDTO;
  registroMudou: (registro: RegistroDTO) => void;
  className?: string;
}

export default function FormularioRecorrencia(
  props: FormularioRecorrenciaProps,
) {
  const { registro } = props;

  function alterarRecorrencia(atrib: string) {
    return (valor: any) => {
      const novoRegistro = {
        ...props.registro,
        recorrencia: {
          ...props.registro.recorrencia,
          [atrib]: valor,
        },
      };
      props.registroMudou(novoRegistro);
    };
  }

  return registro && registro.recorrencia ? (
    <>
      {registro.recorrencia.id && (
        <Notification
          icon={<IconRepeat size={16} />}
          color="yellow"
          className="mb-4"
          withCloseButton={false}
        >
          Parcelas não consolidadas{" "}
          <span className="font-bold text-yellow-400 underline">
            serão alteradas
          </span>
          !
        </Notification>
      )}
      <FormularioTransacao
        registro={registro}
        registroMudou={props.registroMudou}
        parcela={!registro.recorrencia.indefinida}
      />
      <div className="text-zinc-600 mt-5">
        Recorrência{" "}
        <span className="font-bold text-zinc-500">
          {registro.recorrencia.indefinida
            ? "Indefinida"
            : " com Parcelas Fixas"}
        </span>
      </div>
      <hr className="mt-1 mb-3 border border-zinc-800 self-stretch" />
      <Linha md={2} className="items-end">
        <CampoBoolean
          rotulo="Indefinida?"
          valor={registro.recorrencia.indefinida}
          valorMudou={alterarRecorrencia("indefinida")}
        />
        {registro.recorrencia.indefinida ? (
          <CampoData
            rotulo="Data Fim"
            valor={registro.recorrencia.dataFim}
            valorMudou={alterarRecorrencia("dataFim")}
          />
        ) : (
          <CampoParcelas
            rotulo="Parcelas"
            primeira={registro.recorrencia.iniciarNaParcela}
            ultima={registro.recorrencia.qtdeDeParcelas}
            primeiraMudou={alterarRecorrencia("iniciarNaParcela")}
            ultimaMudou={alterarRecorrencia("qtdeDeParcelas")}
          />
        )}
      </Linha>
    </>
  ) : null;
}
