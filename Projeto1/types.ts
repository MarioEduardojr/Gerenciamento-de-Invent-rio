import { StatusOperacao } from './enums';

export interface EntidadeBase {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
}


export interface Categoria extends EntidadeBase {

}

export interface Produto extends EntidadeBase {
    preco: number;
    quantidade: number;
    categoriaId: number;
    dataAtualizacao: Date;
}
export type ResultadoOperacao<T> = {
    status: StatusOperacao;
    mensagem: string;
    dados?: T;
};


export type BuscaFn<T> = (termo: string | number) => Promise<T[]>;


export interface MenuOption {
    id: number;
    label: string;
    action: () => Promise<void>;
}


export type ValidadorEntrada<T> = (valor: unknown) => T | null;

export interface Repository<T extends EntidadeBase> {
    criar(item: Omit<T, 'id' | 'dataCriacao'>): Promise<T>;
    buscarPorId(id: number): Promise<T | null>;
    buscarPorNome(nome: string): Promise<T[]>;
    listarTodos(): Promise<T[]>;
    atualizar(id: number, item: Partial<T>): Promise<ResultadoOperacao<T>>;
    remover(id: number): Promise<ResultadoOperacao<void>>;
}

export type FormatadorSaida<T> = (item: T) => string; 
