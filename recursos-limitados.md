Quando você trabalha com recursos limitados, como no seu caso, existem várias estratégias eficazes para otimizar o desempenho:

Processamento em lote (Batch Processing):

Agrupe várias operações em uma única transação
Use INSERT com múltiplos VALUES ou técnicas como Promise.all() com um número controlado de operações


Ajuste fino de connection pools:

Reduza o número de conexões para corresponder aos recursos disponíveis (10-20 pode ser melhor que 100)
Configure timeouts adequados para evitar conexões pendentes
Implemente retries com backoff exponencial para falhas


Otimize operações intensivas:

Use bcrypt com menor custo computacional em vez de Argon2id para ambientes de teste
Pré-gere hashes em paralelo antes de iniciar transações de banco de dados
Considere mover operações computacionais intensivas para workers separados


Implemente filas de tarefas:

Use Redis, RabbitMQ ou similar para enfileirar trabalhos
Processe tarefas no ritmo que o sistema consegue suportar
Adicione respostas assíncronas (retorne 202 Accepted com um ID para consulta posterior)


Otimização de banco de dados:

Configure corretamente shared_buffers, work_mem e outros parâmetros do PostgreSQL
Adicione índices apropriados nas colunas frequentemente pesquisadas
Use EXPLAIN ANALYZE para identificar consultas problemáticas


Cache estratégico:

Implemente cache de dados frequentemente acessados usando Redis ou similar
Use estratégias de cache com invalidação apropriada


Modelagem de dados eficiente:

Use tipos de dados apropriados (ex: UUID pode ser mais pesado que int/bigint para PKs)
Considere desnormalização seletiva para reduzir JOINs


Ajuste de prioridades:

Configure nice/ionice para dar maior prioridade ao banco de dados do que à aplicação
Use PgBouncer para gerenciar conexões e priorizar consultas críticas


Monitoramento e logging inteligente:

Reduza logs desnecessários em produção
Implemente métricas para identificar gargalos precisamente
Use ferramentas como pg_stat_statements para identificar consultas problemáticas


Sharding e particionamento:

Particione tabelas grandes por data ou outra dimensão lógica
Considere soluções de sharding horizontal para distribuir carga