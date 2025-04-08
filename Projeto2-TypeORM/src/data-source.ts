import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Produto } from './entities/Produto';
import { Categoria } from './entities/Categoria';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  logging: false,
  entities: [Produto, Categoria],
});