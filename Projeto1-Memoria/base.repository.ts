export abstract class BaseRepository<T extends { id: number }> {
    protected items: Map<number, T> = new Map();

    async criar(item: T): Promise<T> {
        this.items.set(item.id, item);
        return item;
    }

    async obterTodos(): Promise<T[]> {
        return Array.from(this.items.values());
    }

    async obterPorId(id: number): Promise<T | undefined> {
        return this.items.get(id);
    }

    async atualizar(id: number, itemAtualizado: Partial<T>): Promise<{ status: 'OK' | 'ERRO', dados?: T, mensagem?: string }> {
        const itemExistente = this.items.get(id);

        if (!itemExistente) {
            return {
                status: 'ERRO',
                mensagem: 'Item não encontrado'
            };
        }

        const atualizado = { ...itemExistente, ...itemAtualizado };
        this.items.set(id, atualizado);

        return {
            status: 'OK',
            dados: atualizado
        };
    }

    async remover(id: number): Promise<boolean> {
        return this.items.delete(id);
    }
}