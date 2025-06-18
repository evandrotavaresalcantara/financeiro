"use client";
import { CartaoDTO, FaturaDTO } from "adapters";
import { AnoMesId, TipoBandeira } from "core";
import { fn } from "utils";
import { createContext, useEffect, useState } from "react";
import useCentralDeAcesso from "../hooks/useCentralDeAcesso";
import useDebounce from "../hooks/useDebounce";
import useDataRef from "../hooks/useDataRef";
import useCoreFacade from "../hooks/useCoreFacade";

export interface CartoesContextProps {
  cartoes: CartaoDTO[];
  cartaoEmProcessamento: string | null;
  adicionarCartao: () => Promise<void>;
  salvarCartao: (cartao: CartaoDTO) => Promise<void>;
  excluirCartao: (cartao: CartaoDTO) => Promise<void>;
  cartaoPorId: (id: string) => CartaoDTO | null;
  obterFaturas: (dataRef: Date) => FaturaDTO[];
  obterFatura: (c: CartaoDTO, dataRef: Date) => FaturaDTO;
}

const CartoesContext = createContext<CartoesContextProps>({} as any);

export function CartoesProvider(props: any) {
  const [cartoes, setCartoes] = useState<CartaoDTO[]>([]);
  const [cartaoEmProcessamento, setCartaoEmProcessamento] = useState<
    string | null
  >(null);
  const { usuario } = useCentralDeAcesso();
  const { dataRef } = useDataRef();
  const debounce = useDebounce();

  const core2 = useCoreFacade();

  useEffect(() => {
    consultarCartoes();
  }, [usuario, dataRef]);

  async function adicionarCartao() {
    if (!usuario) return;

    const cartao = {
      descricao: "Novo Cartão",
      bandeira: TipoBandeira.MASTERCARD,
      cor: "",
      faturas: [],
    };
    await core2.cartao.salvar(usuario, cartao);
    await consultarCartoes();
  }

  async function salvarCartao(cartao: CartaoDTO) {
    if (!usuario || !cartoes || !cartao) return;
    debounce(
      async () => {
        setCartaoEmProcessamento(cartao.id ?? "salvarCartao");
        await core2.cartao.salvar(usuario, cartao);
        await consultarCartoes();
        setCartaoEmProcessamento(null);
      },
      3000,
      cartao.id ?? "salvarCartao",
    );
  }

  async function excluirCartao(cartao: CartaoDTO) {
    if (!usuario || !cartoes || !cartao.id) return;
    const encontrado = cartoes.find((c) => c.id === cartao.id);
    encontrado && (await core2.cartao.excluir(usuario, encontrado));
    encontrado && setCartoes(cartoes.filter((c) => c.id !== encontrado.id));
  }

  async function consultarCartoes() {
    if (!usuario) return;
    const cartoes = await core2.cartao.consultar(usuario);

    setCartoes(cartoes);
  }

  function cartaoPorId(cartaoId: string) {
    return cartoes.find((c) => c.id === cartaoId) ?? null;
  }

  function obterFaturas(dataRef: Date): FaturaDTO[] {
    return cartoes.map((c) => obterFatura(c, dataRef));
  }

  function obterFatura(c: CartaoDTO, dataRef: Date): FaturaDTO {
    const fatura = c.faturas?.find((f) => fn.dt.mesmoMes(f.data!, dataRef));
    if (fatura) return fatura;

    return {
      id: AnoMesId.novo(dataRef).instancia.valor,
      data: dataRef,
      valor: 0,
      valorPlanejado: 0,
    } as FaturaDTO;
  }

  return (
    <CartoesContext.Provider
      value={{
        cartoes,
        cartaoEmProcessamento,
        adicionarCartao,
        salvarCartao,
        excluirCartao,
        cartaoPorId,
        obterFaturas,
        obterFatura,
      }}
    >
      {props.children}
    </CartoesContext.Provider>
  );
}

export default CartoesContext;
