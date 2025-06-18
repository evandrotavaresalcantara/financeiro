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
