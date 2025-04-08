import { Produto, ResultadoOperacao } from '../types';
import { StatusOperacao } from '../enums';
import { BaseRepository } from './base.repository';

export class ProdutoRepository extends BaseRepository<Produto> {
    async criar(item: Omit<Produto, 'id' | 'dataCriacao'>): Promise<Produto> {
        const produto = await super.criar({
            ...item,
            dataAtualizacao: new Date()
        });
        return produto;
    }

    async atualizar(id: number, item: Partial<Produto>): Promise<ResultadoOperacao<Produto>> {
        const resultado = await super.atualizar(id, {
            ...item,
            dataAtualizacao: new Date()
        });

        return resultado;
    }

    async buscarPorCategoria(categoriaId: number): Promise<Produto[]> {
        return Array.from(this.items.values())
            .filter(produto => produto.categoriaId === categoriaId);
    }

    async atualizarEstoque(id: number, quantidade: number): Promise<ResultadoOperacao<Produto>> {
        const produto = await this.buscarPorId(id);

        if (!produto) {
            return {
                status: StatusOperacao.ERRO,
                mensagem: 'Produto não encontrado'
            };
        }

        return this.atualizar(id, { quantidade });
    }
}

// ✅ Instância única do repositório para persistência em memória
export const produtoRepository = new ProdutoRepository();