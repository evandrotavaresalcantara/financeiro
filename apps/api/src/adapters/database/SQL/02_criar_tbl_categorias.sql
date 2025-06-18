CREATE TABLE IF NOT EXISTS categorias (
    id UUID PRIMARY KEY,               
    usuario_id TEXT REFERENCES usuarios(id) ON DELETE CASCADE,  
    id_pai UUID REFERENCES categorias(id) ON DELETE CASCADE,  
    nome VARCHAR(255) NOT NULL,       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
