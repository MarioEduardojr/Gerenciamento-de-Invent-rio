import { Categoria } from "./types";
import { BaseRepository } from "./base.repository";

export class CategoriaRepository extends BaseRepository<Categoria> {
  buscarPorNome(nome: string): Categoria | undefined {
    const categorias = this.obterTodos();
    return categorias.find(categoria => categoria.nome.toLowerCase() === nome.toLowerCase());
  }
}

// ✅ Instância única do repositório para persistência em memória
export const categoriaRepository = new CategoriaRepository();