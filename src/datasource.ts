import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dockerdb',
  password: 'dockerdb',
  database: 'teste_nestjs',
  entities: ['src/entities/*.ts'],
  migrations: ['migrations/*.ts'],
});
