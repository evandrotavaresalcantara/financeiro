CREATE TABLE IF NOT EXISTS sumarios (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    receitas NUMERIC(10, 2) NOT NULL,
    despesas NUMERIC(10, 2) NOT NULL,
    extrato_id VARCHAR(7) REFERENCES extratos(id) ON DELETE CASCADE
);
