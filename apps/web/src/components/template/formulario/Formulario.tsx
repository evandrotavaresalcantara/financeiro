import { Alert, Button, LoadingOverlay, Tooltip } from "@mantine/core";
import { Tradutor } from "utils";
import { IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import ConfirmarExclusao from "./ConfirmarExclusao";

interface FormularioBotaoProps {
  acao: string;
  label: string;
  icone: any;
  cor: string;
  confirmar?: boolean;
}

interface FormularioProps {
  icone?: any;
  titulo?: string;
  objeto?: any;
  executar?: (acao: string, objeto: any) => Promise<void>;
  cancelar?: () => Promise<void>;
  limparFormulario?: () => void;
  botoesEsquerda?: (FormularioBotaoProps | null)[];
  botoesDireita?: (FormularioBotaoProps | null)[];
  erros?: any[];
  children?: any;
  className?: string;
}

export default function Formulario(props: FormularioProps) {
  const [erros, setErros] = useState<any[]>([]);
  const [acao, setAcao] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [confirmacao, setConfirmacao] = useState(false);

  const objetoRef = useRef<any>(props.objeto);
  useEffect(() => {
    objetoRef.current = props.objeto;
  }, [props.objeto]);

  function executar(acao: string | null, confirma?: boolean) {
    return async () => {
      if (!acao) return setConfirmacao(false);
      if (confirma && !confirmacao) {
        setAcao(acao);
        setConfirmacao(true);
        return;
      }
      try {
        setAcao(null);
        setConfirmacao(false);
        setProcessando(true);
        await props.executar?.(acao, objetoRef.current);
        props.limparFormulario?.();
        setErros([]);
      } catch (e: any) {
        setErros(Tradutor.traduzirErros(e));
      } finally {
        setProcessando(false);
      }
    };
  }

  async function cancelarConfirmacao() {
    setConfirmacao(false);
  }

  async function cancelar() {
    try {
      setProcessando(true);
      await props.cancelar?.();
      props.limparFormulario?.();
      setErros([]);
    } catch (e: any) {
      setErros(Tradutor.traduzirErros(e));
    } finally {
      setProcessando(false);
    }
  }

  function renderizarErros() {
    return erros?.length ? (
      <div className="mb-7">
        <Alert
          variant="outline"
          icon={<IconX size={16} />}
          title="Erros de Validação"
          color="red"
        >
          <div className="flex flex-col">
            {erros.map((e, i) => {
              return (
                <span key={`erro-${i}`}>
                  - {e.toString?.() ?? "Erro desconhecido"}
                </span>
              );
            })}
          </div>
        </Alert>
      </div>
    ) : null;
  }

  return (
    <div
      className={props.className}
      style={{ position: "relative", height: "100%" }}
    >
      {props.titulo && (
        <div
          className={`
                    flex items-center justify-between
                    bg-black rounded-t-md px-5 py-3
                `}
        >
          <div className="flex items-center gap-1">
            {props.icone}
            <span className="text-zinc-400">{props.titulo}</span>
          </div>
          <IconX className="cursor-pointer" onClick={cancelar} />
        </div>
      )}
      <ConfirmarExclusao
        visivel={confirmacao}
        texto="excluir"
        executar={executar(acao)}
        cancelar={cancelarConfirmacao}
      />
      <LoadingOverlay visible={processando} overlayProps={{ blur: 2 }} />
      <div className="p-7">
        {renderizarErros()}
        {props.children}
      </div>
      <hr className="border border-zinc-800 self-stretch" />
      <div className="flex gap-2 px-7 py-5">
        {props.botoesEsquerda &&
          props.botoesEsquerda.map((btn) =>
            btn ? (
              <Tooltip key={btn.acao} label={btn.label} withArrow color="blue">
                <Button
                  color={btn.cor.split("-")[1]}
                  className={btn.cor}
                  onClick={executar(btn.acao, btn.confirmar ?? false)}
                  px={10}
                >
                  {btn.icone}
                </Button>
              </Tooltip>
            ) : null,
          )}
        <div className="flex-1" />
        {props.botoesDireita &&
          props.botoesDireita.map((btn) =>
            btn ? (
              <Tooltip key={btn.acao} label={btn.label} withArrow color="blue">
                <Button
                  color={btn.cor.split("-")[1]}
                  className={btn.cor}
                  onClick={executar(btn.acao, btn.confirmar ?? false)}
                  px={10}
                >
                  {btn.icone}
                </Button>
              </Tooltip>
            ) : null,
          )}
      </div>
    </div>
  );
}
