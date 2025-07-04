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