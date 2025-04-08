import * as readline from 'readline';
import { categoriaRepository } from './categoria.repository';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function menuPrincipal(): void {
  console.log("\n=== Sistema de Inventário - TypeORM ===");
  console.log("1. Gerenciar Categorias");
  console.log("2. Gerenciar Produtos");
  console.log("3. Sair");

  rl.question("Selecione uma opção: ", async (opcao: string) => {
    switch (opcao) {
      case "1":
        await menuCategorias();
        break;
      case "2":
        await menuProdutos();
        break;
      case "3":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        menuPrincipal();
        break;
    }
  });
}

async function menuCategorias(): Promise<void> {
  console.log("\n--- Gerenciar Categorias ---");
  console.log("1. Criar Categoria");
  console.log("2. Listar Categorias");
  console.log("3. Buscar Categoria por ID");
  console.log("4. Buscar Categoria por Nome");
  console.log("5. Atualizar Categoria");
  console.log("6. Remover Categoria");
  console.log("7. Voltar ao Menu Principal");

  rl.question("Escolha uma opção: ", async (opcao: string) => {
    switch (opcao) {
      case "1":
        rl.question("Nome: ", nome => {
          rl.question("Descrição: ", async descricao => {
            const nova = await categoriaRepository.criar(nome, descricao);
            console.log("Categoria criada:", nova);
            menuCategorias();
          });
        });
        break;
      case "2":
        await menuProdutos();
        break;
      case "3":
        const categorias = await categoriaRepository.listar();
        console.table(categorias);
        menuCategorias();
        break;
      case "3":
        rl.question("ID: ", async id => {
          const categoria = await categoriaRepository.buscarPorId(Number(id));
          console.log(categoria ?? "Categoria não encontrada.");
          menuCategorias();
        });
        break;
      case "4":
        rl.question("Nome: ", async nome => {
          const categoria = await categoriaRepository.buscarPorNome(nome);
          console.log(categoria ?? "Categoria não encontrada.");
          menuCategorias();
        });
        break;
      case "5":
        rl.question("ID: ", idStr => {
          const id = Number(idStr);
          rl.question("Novo nome (vazio para manter): ", nome => {
            rl.question("Nova descrição (vazio para manter): ", async descricao => {
              const sucesso = await categoriaRepository.atualizar(id, nome || undefined, descricao || undefined);
              console.log(sucesso ? "Atualizada com sucesso." : "Categoria não encontrada.");
              menuCategorias();
            });
          });
        });
        break;
      case "6":
        rl.question("ID: ", async id => {
          const sucesso = await categoriaRepository.remover(Number(id));
          console.log(sucesso ? "Removida com sucesso." : "Categoria não encontrada.");
          menuCategorias();
        });
        break;
      case "7":
        menuPrincipal();
        break;
      default:
        console.log("Opção inválida.");
        menuCategorias();
        break;
    }
  });
}

import { produtoRepository } from './produto.repository';

async function menuProdutos(): Promise<void> {
  console.log("\n--- Gerenciar Produtos ---");
  console.log("1. Criar Produto");
  console.log("2. Listar Produtos");
  console.log("3. Buscar Produto por ID");
  console.log("4. Buscar Produto por Nome");
  console.log("5. Buscar Produtos por Categoria");
  console.log("6. Atualizar Produto");
  console.log("7. Remover Produto");
  console.log("8. Voltar ao Menu Principal");

  rl.question("Escolha uma opção: ", async (opcao: string) => {
    switch (opcao) {
      case "1":
        rl.question("Nome: ", nome => {
          rl.question("Descrição: ", descricao => {
            rl.question("Preço: ", precoStr => {
              rl.question("Quantidade: ", quantidadeStr => {
                rl.question("ID da Categoria: ", async categoriaIdStr => {
                  const produto = await produtoRepository.criar({
                    nome,
                    descricao,
                    preco: parseFloat(precoStr),
                    quantidade: parseInt(quantidadeStr),
                    categoriaId: parseInt(categoriaIdStr)
                  });
                  console.log(produto ?? "Erro: Categoria não encontrada.");
                  menuProdutos();
                });
              });
            });
          });
        });
        break;
      case "2":
        const produtos = await produtoRepository.listar();
        console.table(produtos);
        menuProdutos();
        break;
      case "3":
        rl.question("ID: ", async idStr => {
          const produto = await produtoRepository.buscarPorId(parseInt(idStr));
          console.log(produto ?? "Produto não encontrado.");
          menuProdutos();
        });
        break;
      case "4":
        rl.question("Nome: ", async nome => {
          const produto = await produtoRepository.buscarPorNome(nome);
          console.log(produto ?? "Produto não encontrado.");
          menuProdutos();
        });
        break;
      case "5":
        rl.question("ID da Categoria: ", async catIdStr => {
          const produtos = await produtoRepository.buscarPorCategoria(parseInt(catIdStr));
          console.table(produtos);
          menuProdutos();
        });
        break;
      case "6":
        rl.question("ID do Produto: ", idStr => {
          const id = parseInt(idStr);
          rl.question("Novo nome: ", nome => {
            rl.question("Nova descrição: ", descricao => {
              rl.question("Novo preço: ", precoStr => {
                rl.question("Nova quantidade: ", async quantidadeStr => {
                  const sucesso = await produtoRepository.atualizar(id, {
                    nome,
                    descricao,
                    preco: parseFloat(precoStr),
                    quantidade: parseInt(quantidadeStr)
                  });
                  console.log(sucesso ? "Produto atualizado." : "Produto não encontrado.");
                  menuProdutos();
                });
              });
            });
          });
        });
        break;
      case "7":
        rl.question("ID: ", async idStr => {
          const sucesso = await produtoRepository.remover(parseInt(idStr));
          console.log(sucesso ? "Removido com sucesso." : "Produto não encontrado.");
          menuProdutos();
        });
        break;
      case "8":
        menuPrincipal();
        break;
      default:
        console.log("Opção inválida.");
        menuProdutos();
        break;
    }
  });
}