import * as readline from 'readline';
import { MenuPrincipal, MenuCategorias, MenuProdutos, StatusOperacao } from './enums';
import { CategoriaRepository } from './repositories/categoria.repository';
import { ProdutoRepository } from './repositories/produto.repository';
import { Formatter } from './utils/formatter';
import { Validator } from './utils/validator';

class GerenciadorInventario {
    private rl: readline.Interface;
    private categoriaRepo: CategoriaRepository;
    private produtoRepo: ProdutoRepository;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.categoriaRepo = new CategoriaRepository();
        this.produtoRepo = new ProdutoRepository();
    }

    private async mostrarMenu(): Promise<void> {
        console.log('\n=== Sistema de Gerenciamento de Inventário ===');
        console.log(`${MenuPrincipal.CATEGORIAS}. Gerenciar Categorias`);
        console.log(`${MenuPrincipal.PRODUTOS}. Gerenciar Produtos`);
        console.log(`${MenuPrincipal.SAIR}. Sair`);
        
        const opcao = await this.perguntar('Escolha uma opção: ');
        const opcaoNum = Validator.numero(opcao);
        
        switch (opcaoNum) {
            case MenuPrincipal.CATEGORIAS:
                await this.menuCategorias();
                break;
            case MenuPrincipal.PRODUTOS:
                await this.menuProdutos();
                break;
            case MenuPrincipal.SAIR:
                console.log('Saindo do sistema...');
                this.rl.close();
                return;
            default:
                console.log('Opção inválida!');
                await this.mostrarMenu();
        }
    }

    private async menuCategorias(): Promise<void> {
        console.log('\n=== Gerenciamento de Categorias ===');
        console.log(`${MenuCategorias.CRIAR}. Criar Categoria`);
        console.log(`${MenuCategorias.LISTAR}. Listar Categorias`);
        console.log(`${MenuCategorias.BUSCAR}. Buscar Categoria`);
        console.log(`${MenuCategorias.ATUALIZAR}. Atualizar Categoria`);
        console.log(`${MenuCategorias.REMOVER}. Remover Categoria`);
        console.log(`${MenuCategorias.VOLTAR}. Voltar`);

        const opcao = await this.perguntar('Escolha uma opção: ');
        const opcaoNum = Validator.numero(opcao);

        switch (opcaoNum) {
            case MenuCategorias.CRIAR:
                await this.criarCategoria();
                break;
            case MenuCategorias.LISTAR:
                await this.listarCategorias();
                break;
            case MenuCategorias.BUSCAR:
                await this.buscarCategoria();
                break;
            case MenuCategorias.ATUALIZAR:
                await this.atualizarCategoria();
                break;
            case MenuCategorias.REMOVER:
                await this.removerCategoria();
                break;
            case MenuCategorias.VOLTAR:
                await this.mostrarMenu();
                return;
            default:
                console.log('Opção inválida!');
        }
        await this.menuCategorias();
    }

    private async menuProdutos(): Promise<void> {
        console.log('\n=== Gerenciamento de Produtos ===');
        console.log(`${MenuProdutos.CRIAR}. Criar Produto`);
        console.log(`${MenuProdutos.LISTAR}. Listar Produtos`);
        console.log(`${MenuProdutos.BUSCAR}. Buscar Produto`);
        console.log(`${MenuProdutos.ATUALIZAR}. Atualizar Produto`);
        console.log(`${MenuProdutos.REMOVER}. Remover Produto`);
        console.log(`${MenuProdutos.VOLTAR}. Voltar`);

        const opcao = await this.perguntar('Escolha uma opção: ');
        const opcaoNum = Validator.numero(opcao);

        switch (opcaoNum) {
            case MenuProdutos.CRIAR:
                await this.criarProduto();
                break;
            case MenuProdutos.LISTAR:
                await this.listarProdutos();
                break;
            case MenuProdutos.BUSCAR:
                await this.buscarProduto();
                break;
            case MenuProdutos.ATUALIZAR:
                await this.atualizarProduto();
                break;
            case MenuProdutos.REMOVER:
                await this.removerProduto();
                break;
            case MenuProdutos.VOLTAR:
                await this.mostrarMenu();
                return;
            default:
                console.log('Opção inválida!');
        }
        await this.menuProdutos();
    }

    private async criarCategoria(): Promise<void> {
        const nome = await Validator.validarEntradaTexto('Nome da categoria: ');
        const descricao = await Validator.validarEntradaTexto('Descrição: ');

        if (!nome || !descricao) return;

        const categoria = await this.categoriaRepo.criar({ nome, descricao });
        console.log('Categoria criada com sucesso!');
        Formatter.tabelaCategorias([categoria]);
    }

    private async listarCategorias(): Promise<void> {
        const categorias = await this.categoriaRepo.listarTodos();
        Formatter.tabelaCategorias(categorias);
    }

    private async buscarCategoria(): Promise<void> {
        const termo = await Validator.validarEntradaTexto('Digite o nome da categoria: ');
        if (!termo) return;

        const categorias = await this.categoriaRepo.buscarPorNome(termo);
        if (categorias.length === 0) {
            console.log('Nenhuma categoria encontrada.');
            return;
        }

        Formatter.tabelaCategorias(categorias);
    }

    private async atualizarCategoria(): Promise<void> {
        const id = await Validator.validarEntradaNumero('ID da categoria: ');
        if (!id) return;

        const nome = await Validator.validarEntradaTexto('Novo nome (deixe em branco para manter): ', false);
        const descricao = await Validator.validarEntradaTexto('Nova descrição (deixe em branco para manter): ', false);

        const resultado = await this.categoriaRepo.atualizar(id, {
            ...(nome && { nome }),
            ...(descricao && { descricao })
        });

        console.log(resultado.mensagem);
        if (resultado.status === StatusOperacao.SUCESSO && resultado.dados) {
            Formatter.tabelaCategorias([resultado.dados]);
        }
    }

    private async removerCategoria(): Promise<void> {
        const id = await Validator.validarEntradaNumero('ID da categoria: ');
        if (!id) return;

        const resultado = await this.categoriaRepo.remover(id);
        console.log(resultado.mensagem);
    }

    private async criarProduto(): Promise<void> {
        const nome = await Validator.validarEntradaTexto('Nome do produto: ');
        const descricao = await Validator.validarEntradaTexto('Descrição: ');
        const preco = await Validator.validarEntradaNumero('Preço: ');
        const quantidade = await Validator.validarEntradaNumero('Quantidade: ');
        const categoriaId = await Validator.validarEntradaNumero('ID da categoria: ');

        if (!nome || !descricao || !preco || !quantidade || !categoriaId) return;

        const categoria = await this.categoriaRepo.buscarPorId(categoriaId);
        if (!categoria) {
            console.log('Categoria não encontrada!');
            return;
        }

        const produto = await this.produtoRepo.criar({
            nome,
            descricao,
            preco,
            quantidade,
            categoriaId,
            dataAtualizacao: new Date()
        });

        console.log('Produto criado com sucesso!');
        Formatter.tabelaProdutos([produto]);
    }

    private async listarProdutos(): Promise<void> {
        const produtos = await this.produtoRepo.listarTodos();
        Formatter.tabelaProdutos(produtos);
    }

    private async buscarProduto(): Promise<void> {
        console.log('1. Buscar por nome');
        console.log('2. Buscar por categoria');
        
        const opcao = await Validator.validarEntradaNumero('Escolha uma opção: ');
        if (!opcao) return;

        let produtos: any[] = [];

        if (opcao === 1) {
            const termo = await Validator.validarEntradaTexto('Digite o nome do produto: ');
            if (!termo) return;
            produtos = await this.produtoRepo.buscarPorNome(termo);
        } else if (opcao === 2) {
            const categoriaId = await Validator.validarEntradaNumero('Digite o ID da categoria: ');
            if (!categoriaId) return;
            produtos = await this.produtoRepo.buscarPorCategoria(categoriaId);
        } else {
            console.log('Opção inválida!');
            return;
        }

        if (produtos.length === 0) {
            console.log('Nenhum produto encontrado.');
            return;
        }

        Formatter.tabelaProdutos(produtos);
    }

    private async atualizarProduto(): Promise<void> {
        const id = await Validator.validarEntradaNumero('ID do produto: ');
        if (!id) return;

        const nome = await Validator.validarEntradaTexto('Novo nome (deixe em branco para manter): ', false);
        const descricao = await Validator.validarEntradaTexto('Nova descrição (deixe em branco para manter): ', false);
        const preco = await Validator.validarEntradaNumero('Novo preço (deixe em branco para manter): ', false);
        const quantidade = await Validator.validarEntradaNumero('Nova quantidade (deixe em branco para manter): ', false);
        const categoriaId = await Validator.validarEntradaNumero('Novo ID da categoria (deixe em branco para manter): ', false);

        if (categoriaId) {
            const categoria = await this.categoriaRepo.buscarPorId(categoriaId);
            if (!categoria) {
                console.log('Categoria não encontrada!');
                return;
            }
        }

        const resultado = await this.produtoRepo.atualizar(id, {
            ...(nome && { nome }),
            ...(descricao && { descricao }),
            ...(preco && { preco }),
            ...(quantidade && { quantidade }),
            ...(categoriaId && { categoriaId })
        });

        console.log(resultado.mensagem);
        if (resultado.status === StatusOperacao.SUCESSO && resultado.dados) {
            Formatter.tabelaProdutos([resultado.dados]);
        }
    }

    private async removerProduto(): Promise<void> {
        const id = await Validator.validarEntradaNumero('ID do produto: ');
        if (!id) return;

        const resultado = await this.produtoRepo.remover(id);
        console.log(resultado.mensagem);
    }

    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }

    public async iniciar(): Promise<void> {
        console.log('Bem-vindo ao Sistema de Gerenciamento de Inventário!');
        await this.mostrarMenu();
    }
}

const gerenciador = new GerenciadorInventario();
gerenciador.iniciar(); 
