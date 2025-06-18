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
