import { Categoria, Produto, FormatadorSaida } from '../types';

export class Formatter {
    static formatarData(data: Date): string {
        return data.toLocaleString('pt-BR');
    }

    static formatarMoeda(valor: number): string {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    static categoria: FormatadorSaida<Categoria> = (categoria: Categoria): string => {
        return [
            `ID: ${categoria.id}`,
            `Nome: ${categoria.nome}`,
            `Descrição: ${categoria.descricao}`,
            `Data de Criação: ${this.formatarData(categoria.dataCriacao)}`
        ].join(' | ');
    }

    static produto: FormatadorSaida<Produto> = (produto: Produto): string => {
        return [
            `ID: ${produto.id}`,
            `Nome: ${produto.nome}`,
            `Descrição: ${produto.descricao}`,
            `Preço: ${this.formatarMoeda(produto.preco)}`,
            `Quantidade: ${produto.quantidade}`,
            `Categoria ID: ${produto.categoriaId}`,
            `Criado em: ${this.formatarData(produto.dataCriacao)}`,
            `Atualizado em: ${this.formatarData(produto.dataAtualizacao)}`
        ].join(' | ');
    }

    static tabelaCategorias(categorias: Categoria[]): void {
        console.log('\nCategorias:');
        console.log('='.repeat(100));
        console.log('ID | Nome | Descrição | Data de Criação');
        console.log('-'.repeat(100));
        
        categorias.forEach(categoria => {
            console.log(this.categoria(categoria));
        });
        
        console.log('='.repeat(100));
    }

    static tabelaProdutos(produtos: Produto[]): void {
        console.log('\nProdutos:');
        console.log('='.repeat(150));
        console.log('ID | Nome | Descrição | Preço | Quantidade | Categoria | Criado em | Atualizado em');
        console.log('-'.repeat(150));
        
        produtos.forEach(produto => {
            console.log(this.produto(produto));
        });
        
        console.log('='.repeat(150));
    }
} 
