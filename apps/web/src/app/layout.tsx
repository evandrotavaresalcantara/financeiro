import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { CarregandoProvider } from "../data/contexts/CarregandoContext";
import { CartoesProvider } from "../data/contexts/CartoesContext";
import { CategoriasProvider } from "../data/contexts/CategoriasContext";
import { CentralDeAcessoProvider } from "../data/contexts/CentralDeAcessoContext";
import { ContasProvider } from "../data/contexts/ContasContext";
import { DataRefProvider } from "../data/contexts/DataRefContext";
import { ExtratoProvider } from "../data/contexts/ExtratoContext";
import { LocaleHub } from "utils";
import { MantineProvider } from "@mantine/core";
import { MensagensProvider } from "../data/contexts/MensagensContext";
import { MenuProvider } from "../data/contexts/MenuContext";
import { ptBR } from "../data/constants/erros";
import MostrarMensagens from "../components/template/mensagem/MostrarMensagens";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poupig",
  description: "Gerenciador de finanças pessoais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  LocaleHub.addErros("pt-BR", ptBR);
  return (
    <html lang="pt-BR">
      <body>
        <MantineProvider defaultColorScheme="dark">
          <AppProvider>
            <FinancasProvider>
              {children}
              <MostrarMensagens />
            </FinancasProvider>
          </AppProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

function AppProvider(props: any) {
  return (
    <CarregandoProvider>
      <MensagensProvider>
        <CentralDeAcessoProvider>
          <MenuProvider>{props.children}</MenuProvider>
        </CentralDeAcessoProvider>
      </MensagensProvider>
    </CarregandoProvider>
  );
}

function FinancasProvider(props: any) {
  return (
    <DataRefProvider>
      <ContasProvider>
        <CartoesProvider>
          <CategoriasProvider>
            <ExtratoProvider>{props.children}</ExtratoProvider>
          </CategoriasProvider>
        </CartoesProvider>
      </ContasProvider>
    </DataRefProvider>
  );
}
