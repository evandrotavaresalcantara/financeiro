import { CategoriaDTO } from 'adapters'
import { IdUnico } from 'utils'

const casa = { id: IdUnico.gerar(), nome: 'Casa' }
const alimentacao = { id: IdUnico.gerar(), nome: 'Alimentação' }
const educacao = { id: IdUnico.gerar(), nome: 'Educação' }
const extras = { id: IdUnico.gerar(), nome: 'Extras' }
const pessoais = { id: IdUnico.gerar(), nome: 'Pessoais' }
const imposto = { id: IdUnico.gerar(), nome: 'Impostos' }
const receita = { id: IdUnico.gerar(), nome: 'Receita' }
const saude = { id: IdUnico.gerar(), nome: 'Saúde' }
const transporte = { id: IdUnico.gerar(), nome: 'Transporte' }
const taxas = { id: IdUnico.gerar(), nome: 'Serviços Financeiros' }
const outras = { id: IdUnico.gerar(), nome: 'Outras' }

const categorias = [
    casa,
    { id: IdUnico.gerar(), nome: 'Água', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Aluguel', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Condomínio', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Funcionários', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Financiamento', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Gás', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Internet', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Energia', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Manutenção da Casa', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Materiais de Limpeza', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Seguro Residencial', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Streaming', idPai: casa.id },
    { id: IdUnico.gerar(), nome: 'Telefone', idPai: casa.id },

    alimentacao,
    { id: IdUnico.gerar(), nome: 'Açougue', idPai: alimentacao.id },
    { id: IdUnico.gerar(), nome: 'Lanches', idPai: alimentacao.id },
    { id: IdUnico.gerar(), nome: 'Padaria', idPai: alimentacao.id },
    { id: IdUnico.gerar(), nome: 'Restaurante', idPai: alimentacao.id },
    { id: IdUnico.gerar(), nome: 'Supermercado', idPai: alimentacao.id },

    educacao,
    { id: IdUnico.gerar(), nome: 'Cursos', idPai: educacao.id },
    { id: IdUnico.gerar(), nome: 'Escola', idPai: educacao.id },
    { id: IdUnico.gerar(), nome: 'Faculdade', idPai: educacao.id },
    { id: IdUnico.gerar(), nome: 'Livraria', idPai: educacao.id },
    { id: IdUnico.gerar(), nome: 'Material Escolar', idPai: educacao.id },
    { id: IdUnico.gerar(), nome: 'Pós - Graduação', idPai: educacao.id },

    extras,
    { id: IdUnico.gerar(), nome: 'Doações', idPai: extras.id },
    { id: IdUnico.gerar(), nome: 'Eletrônicos', idPai: extras.id },
    { id: IdUnico.gerar(), nome: 'Móveis e decoração', idPai: extras.id },
    { id: IdUnico.gerar(), nome: 'Presentes', idPai: extras.id },
    { id: IdUnico.gerar(), nome: 'Utensílios Domésticos', idPai: extras.id },

    pessoais,
    { id: IdUnico.gerar(), nome: 'Academia', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Acessórios', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Celular', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Dízimo', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Perfumaria', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Roupas e Calçados', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Salão de Beleza', idPai: pessoais.id },
    { id: IdUnico.gerar(), nome: 'Seguro de Vida', idPai: pessoais.id },

    imposto,
    { id: IdUnico.gerar(), nome: 'FGTS', idPai: imposto.id },
    { id: IdUnico.gerar(), nome: 'INSS', idPai: imposto.id },
    { id: IdUnico.gerar(), nome: 'IOF', idPai: imposto.id },
    { id: IdUnico.gerar(), nome: 'IPTU', idPai: imposto.id },
    { id: IdUnico.gerar(), nome: 'IPVA', idPai: imposto.id },
    { id: IdUnico.gerar(), nome: 'IR', idPai: imposto.id },

    receita,
    { id: IdUnico.gerar(), nome: '13º Salário', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Bônus', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Comissão', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Estorno', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Férias', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Honorários', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Juros de Investimentos', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Outras Receitas', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Reembolso', idPai: receita.id },
    { id: IdUnico.gerar(), nome: 'Salário', idPai: receita.id },

    saude,
    { id: IdUnico.gerar(), nome: 'Dentista', idPai: saude.id },
    { id: IdUnico.gerar(), nome: 'Exames', idPai: saude.id },
    { id: IdUnico.gerar(), nome: 'Farmácia', idPai: saude.id },
    { id: IdUnico.gerar(), nome: 'Médico', idPai: saude.id },
    { id: IdUnico.gerar(), nome: 'Plano de Saúde', idPai: saude.id },

    transporte,
    { id: IdUnico.gerar(), nome: 'Combustível', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Estacionamento', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Lavagem do Carro', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Manutenção do Carro', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Metrô/Ônibus', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Multas de Trânsito', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Pedágio', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Seguro do Carro', idPai: transporte.id },
    { id: IdUnico.gerar(), nome: 'Uber/Táxi', idPai: transporte.id },

    taxas,
    { id: IdUnico.gerar(), nome: 'Anuidade', idPai: taxas.id },
    { id: IdUnico.gerar(), nome: 'Juros', idPai: taxas.id },
    { id: IdUnico.gerar(), nome: 'Multas', idPai: taxas.id },
    { id: IdUnico.gerar(), nome: 'Tarifas', idPai: taxas.id },

    outras,
    { id: IdUnico.gerar(), nome: 'Não Lembro', idPai: outras.id },
    { id: IdUnico.gerar(), nome: 'Ajuste de Saldo', idPai: outras.id },
    { id: IdUnico.gerar(), nome: 'Geral', idPai: outras.id },
] as CategoriaDTO[]

export default categorias
