import { AppDataSource } from '../data-source';
import { Produto } from '../entities/Produto';
import { Categoria } from '../entities/Categoria';

export class ProdutoRepository {
  private repo = AppDataSource.getRepository(Produto);
  private categoriaRepo = AppDataSource.getRepository(Categoria);

  async criar(dados: {
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
  }): Promise<Produto | null> {
    const categoria = await this.categoriaRepo.findOneBy({ id: dados.categoriaId });
    if (!categoria) return null;

    const produto = this.repo.create({
      ...dados,
      categoria,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    });

    return await this.repo.save(produto);
  }

  async listar(): Promise<Produto[]> {
    return await this.repo.find();
  }

  async buscarPorId(id: number): Promise<Produto | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async buscarPorNome(nome: string): Promise<Produto | null> {
    return await this.repo
      .createQueryBuilder("produto")
      .where("LOWER(produto.nome) = LOWER(:nome)", { nome })
      .getOne();
  }

  async buscarPorCategoria(categoriaId: number): Promise<Produto[]> {
    return await this.repo.find({
      where: { categoria: { id: categoriaId } }
    });
  }

  async atualizar(id: number, dados: Partial<Omit<Produto, "id" | "categoria" | "dataCriacao">>): Promise<boolean> {
    const produto = await this.buscarPorId(id);
    if (!produto) return false;

    Object.assign(produto, dados);
    produto.dataAtualizacao = new Date();

    await this.repo.save(produto);
    return true;
  }

  async remover(id: number): Promise<boolean> {
    const produto = await this.buscarPorId(id);
    if (!produto) return false;

    await this.repo.remove(produto);
    return true;
  }
}

export const produtoRepository = new ProdutoRepository();