CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    provider VARCHAR(50), 
    imagem_url VARCHAR(250),
    config JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
    id UUID PRIMARY KEY,               
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,  
    id_pai UUID REFERENCES categorias(id) ON DELETE CASCADE,  
    nome VARCHAR(255) NOT NULL,       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contas (
    id UUID PRIMARY KEY,
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
    descricao VARCHAR(255) NOT NULL,
    banco VARCHAR(255) NOT NULL,
    cor VARCHAR(50), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS saldos (
    id VARCHAR NOT NULL,  
    conta_id UUID REFERENCES contas(id) ON DELETE CASCADE,
    data TIMESTAMPTZ NOT NULL,
    acumulado NUMERIC NOT NULL,
    creditos NUMERIC NOT NULL,
    debitos NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

     PRIMARY KEY ("id", "conta_id")
);

CREATE TABLE IF NOT EXISTS cartoes (
    id UUID PRIMARY KEY,
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
    descricao VARCHAR(255) NOT NULL,
    bandeira VARCHAR(100) NOT NULL,
    cor VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faturas (
    id VARCHAR NOT NULL,                         
    cartao_id UUID NOT NULL REFERENCES cartoes(id) ON DELETE CASCADE,
    data TIMESTAMPTZ NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    valor_planejado NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ,

    PRIMARY KEY ("id", "cartao_id")

);

CREATE TABLE IF NOT EXISTS extratos (
    id VARCHAR(7) NOT NULL,
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
    data TIMESTAMPTZ NOT NULL,
    sumario_data TIMESTAMPTZ NOT NULL,
    sumario_total NUMERIC(10, 2) NOT NULL,
    sumario_receitas NUMERIC(10, 2) NOT NULL,
    sumario_despesas NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

     PRIMARY KEY ("id", "usuario_id")
);

CREATE TABLE IF NOT EXISTS recorrencias (
    id UUID PRIMARY KEY,
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
    data_fim TIMESTAMPTZ,
    indefinida BOOLEAN NOT NULL DEFAULT FALSE,
    iniciar_na_parcela INTEGER NOT NULL,
    qtde_de_parcelas INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transacoes (
    id UUID PRIMARY KEY,
    extrato_id VARCHAR(7) NOT NULL,
    extrato_usuario_id TEXT NOT NULL,
    recorrencia_id UUID REFERENCES recorrencias(id) ON DELETE SET NULL,
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,
    conta_id UUID REFERENCES contas(id) ON DELETE SET NULL,
    cartao_id UUID REFERENCES cartoes(id) ON DELETE SET NULL,
    categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data TIMESTAMPTZ NOT NULL,
    consolidada BOOLEAN NOT NULL DEFAULT FALSE,
    operacao VARCHAR(10) NOT NULL,
    observacoes TEXT,
    numero_parcela INTEGER,
    em_memoria BOOLEAN DEFAULT FALSE,
    virtual BOOLEAN DEFAULT FALSE,
    agrupar_por VARCHAR(255),
    base BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    CONSTRAINT fk_extrato
        FOREIGN KEY (extrato_id, extrato_usuario_id)
        REFERENCES extratos(id, usuario_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transacoes_base (
    id UUID PRIMARY KEY,
    recorrencia_id UUID UNIQUE REFERENCES recorrencias(id) ON DELETE CASCADE,
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE, 
    conta_id UUID REFERENCES contas(id) ON DELETE SET NULL,
    cartao_id UUID REFERENCES cartoes(id) ON DELETE SET NULL,
    categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data TIMESTAMPTZ NOT NULL,
    consolidada BOOLEAN NOT NULL DEFAULT FALSE,
    operacao VARCHAR(10) NOT NULL,
    observacoes TEXT,
    numero_parcela INTEGER,
    em_memoria BOOLEAN DEFAULT FALSE,
    virtual BOOLEAN DEFAULT FALSE,
    agrupar_por VARCHAR(255),
    base BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

INSERT INTO usuarios (
    id, 
    nome, 
    email, 
    provider, 
    imagem_url, 
    config, 
    created_at, 
    updated_at
)
VALUES (
    'QJwZxIu7t7ROiUarG94iQSGwRFq2',
    'Evandro',             
    'evandrotavaresalcantara@gmail.com',    
    'google',           
     'https://github.com/evandrotavaresalcantara.png',                 
    '{"esconderSumarios": false, "exibirFiltros": false}', 
    CURRENT_TIMESTAMP,   
    CURRENT_TIMESTAMP    
);
