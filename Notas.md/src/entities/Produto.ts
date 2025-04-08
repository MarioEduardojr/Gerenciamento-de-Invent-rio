import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from './Categoria';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal')
  preco: number;

  @Column()
  quantidade: number;

  @Column()
  dataCriacao: Date;

  @Column()
  dataAtualizacao: Date;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, { eager: true })
  categoria: Categoria;
}