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
