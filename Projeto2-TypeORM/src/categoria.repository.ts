import { AppDataSource } from '../data-source';
import { Categoria } from '../entities/Categoria';

export class CategoriaRepository {
  private repo = AppDataSource.getRepository(Categoria);

  async criar(nome: string, descricao: string): Promise<Categoria> {
    const categoria = this.repo.create({
      nome,
      descricao,
      dataCriacao: new Date()
    });

    return await this.repo.save(categoria);
  }

  async listar(): Promise<Categoria[]> {
    return await this.repo.find();
  }

  async buscarPorId(id: number): Promise<Categoria | null> {
    return await this.repo.findOneBy({ id });
  }

  async buscarPorNome(nome: string): Promise<Categoria | null> {
    return await this.repo
      .createQueryBuilder("categoria")
      .where("LOWER(categoria.nome) = LOWER(:nome)", { nome })
      .getOne();
  }

  async atualizar(id: number, nome?: string, descricao?: string): Promise<boolean> {
    const categoria = await this.buscarPorId(id);
    if (!categoria) return false;

    if (nome) categoria.nome = nome;
    if (descricao) categoria.descricao = descricao;

    await this.repo.save(categoria);
    return true;
  }

  async remover(id: number): Promise<boolean> {
    const categoria = await this.buscarPorId(id);
    if (!categoria) return false;

    await this.repo.remove(categoria);
    return true;
  }
}

export const categoriaRepository = new CategoriaRepository();