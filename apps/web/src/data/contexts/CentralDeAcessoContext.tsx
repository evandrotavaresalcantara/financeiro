"use client";
import { core } from "../../adapters";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsuarioDTO, UsuarioConfigDTO } from "adapters";
import Mensagem from "../model/Mensagem";
import useCarregando from "../hooks/useCarregando";
import useMensagens from "../hooks/useMensagens";
import useCoreFacade from "../hooks/useCoreFacade";

export interface CentralDeAcessoContextProps {
  pronto: boolean;
  usuario: UsuarioDTO | null;
  usuarioConfig: UsuarioConfigDTO | null;
  atualizarUsuario: (usuario: UsuarioDTO) => void;
  atualizarUsuarioConfig: (config: UsuarioConfigDTO) => void;
  loginFacebook: () => Promise<UsuarioDTO | null>;
  loginGoogle: () => Promise<UsuarioDTO | null>;
  loginYahoo: () => Promise<UsuarioDTO | null>;
  logout: () => Promise<void>;
}

const CentralDeAcessoContext = createContext<CentralDeAcessoContextProps>({
  pronto: false,
  usuario: null,
  usuarioConfig: null,
  atualizarUsuario: () => {},
  atualizarUsuarioConfig: () => {},
  loginFacebook: async () => null,
  loginGoogle: async () => null,
  loginYahoo: async () => null,
  logout: async () => {},
});

export function CentralDeAcessoProvider(props: any) {
  const { iniciarExecucao, pararExecucao } = useCarregando();
  const { adicionarErro, adicionarErroInesperado } = useMensagens();

  const router = useRouter();
  const [pronto, setPronto] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<UsuarioDTO | null>(null);
  const [usuarioConfig, setUsuarioConfig] = useState<UsuarioConfigDTO | null>(
    null,
  );
  const core2 = useCoreFacade();

  useEffect(() => {
    const cancelar = core2.autenticacao.monitorar(
      (usuario: UsuarioDTO | null) => {
        autenticar(usuario).then((_) => setPronto(true));
      },
    );
    return () => {
      cancelar.then((fn) => fn());
    };
  }, []);

  const atualizarUsuario = async (
    novoUsuario?: UsuarioDTO,
    apenasConfig: boolean = false,
  ) => {
    if (!novoUsuario) return;
    if (usuario && usuario.email !== novoUsuario.email) return logout();
    if (usuario && novoUsuario && usuario.email === novoUsuario.email) {
      apenasConfig
        ? setUsuarioConfig(novoUsuario.config)
        : setUsuario(novoUsuario);
      await core2.usuario.salvar(novoUsuario);
    }
  };

  const atualizarUsuarioConfig = async (config: UsuarioConfigDTO) => {
    if (!usuario) return;
    const configAtual = usuario.config ?? {};
    const novaConfig = { ...configAtual, ...config };
    const novoUsuario = { ...usuario, config: novaConfig };
    atualizarUsuario(novoUsuario, true);
  };

  const autenticar = async (usuario: UsuarioDTO | null) => {
    if (usuario) {
      await configurarUsuario(usuario);
      return usuario;
    } else {
      setUsuario(null);
      setUsuarioConfig(null);
      return null;
    }
  };

  const loginGoogle = async () => await login("google.com");
  const loginFacebook = async () => await login("facebook.com");
  const loginYahoo = async () => await login("yahoo.com");

  const login = async (provedor: string): Promise<UsuarioDTO | null> => {
    try {
      iniciarExecucao();
      const usuarioLogado = await core2.autenticacao.login(provedor);

      if (!usuarioLogado) return null;
      await core2.usuario.salvar(usuarioLogado);

      if (!usuario) return null;
      await autenticar(usuario);
      router.push("/");
      return usuario;
    } catch (e: any) {
      if (e.code === "auth/account-exists-with-different-credential") {
        adicionarErro({
          titulo: "Erro de Login",
          detalhe: `Conta existe, mas não está associada ao provedor ${provedor?.toUpperCase()}.`,
          duracao: 7000,
        } as Mensagem);
      } else {
        adicionarErroInesperado();
      }
      return null;
    } finally {
      pararExecucao();
    }
  };

  const logout = async () => {
    try {
      iniciarExecucao();
      await core.autenticacao.logout();
      await autenticar(null);
    } finally {
      pararExecucao();
    }
  };

  const configurarUsuario = async (usuarioParam?: UsuarioDTO) => {
    const usuarioAtual = usuarioParam ?? usuario;
    if (!usuarioAtual?.email) return;

    const usuarioDB = await core2.usuario.consultar(usuarioAtual.email);

    const usuarioAlterado = usuarioDB
      ? { ...usuarioAtual, ...usuarioDB }
      : null;
    setUsuario(usuarioAlterado);
    usuarioAlterado && setUsuarioConfig(usuarioAlterado.config);
  };

  return (
    <CentralDeAcessoContext.Provider
      value={{
        pronto,
        usuario,
        usuarioConfig,
        atualizarUsuario,
        atualizarUsuarioConfig,
        loginFacebook,
        loginGoogle,
        loginYahoo,
        logout,
      }}
    >
      {props.children}
    </CentralDeAcessoContext.Provider>
  );
}

export default CentralDeAcessoContext;
