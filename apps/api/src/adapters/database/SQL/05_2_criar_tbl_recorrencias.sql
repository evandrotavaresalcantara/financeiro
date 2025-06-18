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
