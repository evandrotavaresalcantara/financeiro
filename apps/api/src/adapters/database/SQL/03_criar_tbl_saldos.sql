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
