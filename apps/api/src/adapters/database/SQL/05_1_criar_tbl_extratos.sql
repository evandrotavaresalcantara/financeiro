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
