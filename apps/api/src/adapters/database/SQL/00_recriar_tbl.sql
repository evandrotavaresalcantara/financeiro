DROP TABLE IF EXISTS transacoes;
DROP TABLE IF EXISTS transacoes_base;
DROP TABLE IF EXISTS saldos;
DROP TABLE IF EXISTS faturas;
DROP TABLE IF EXISTS cartoes;
DROP TABLE IF EXISTS contas;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS recorrencias;
DROP TABLE IF EXISTS extratos;
DROP TABLE IF EXISTS usuarios;
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/01_criar_tbl_usuarios.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/02_criar_tbl_categorias.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/03_criar_tbl_contas.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/03_criar_tbl_saldos.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/04_criar_tbl_cartoes.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/04_criar_tbl_faturas.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/05_1_criar_tbl_extratos.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/05_2_criar_tbl_recorrencias.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/05_3_criar_tbl_transacoes.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/05_4_criar_tbl_transacoes_base.sql
\i /home/evandro-tavares/cod3r/formacao-dev-arquiteto/poupig/poupig-postgres/apps/backendexpress/src/adapters/database/SQL/00_criar_usuario_evandro.sql