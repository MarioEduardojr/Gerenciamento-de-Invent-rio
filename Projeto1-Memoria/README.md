# 📦 Sistema de Gerenciamento de Inventário (CLI)

Este é um sistema de linha de comando (CLI) para gerenciamento de **Produtos** e **Categorias**, com **persistência em memória**, desenvolvido em **TypeScript**.

---

## 🚀 Funcionalidades

### 📁 Categorias
- Criar categoria
- Listar categorias
- Buscar categoria por ID ou nome
- Atualizar categoria
- Remover categoria (impede remoção se houver produtos associados)

### 📦 Produtos
- Criar produto (vinculado a uma categoria existente)
- Listar produtos
- Buscar produto por ID, nome ou categoria
- Atualizar produto
- Atualizar estoque
- Remover produto

---

## 📂 Estrutura do Projeto

- `types.ts`: Definição das interfaces `Produto` e `Categoria`
- `base.repository.ts`: Repositório genérico com métodos CRUD (assíncronos)
- `produto.repository.ts` e `categoria.repository.ts`: Repositórios específicos
- `comandos.ts`: Menu e lógica da interface de linha de comando
- `Index.ts`: Ponto de entrada da aplicação
- `Validador.ts`: Regras de validação de entrada

---

## 🛠️ Requisitos

- Node.js `v18+`
- npm ou yarn
- TypeScript instalado globalmente ou via dependência de projeto

---

## 📦 Instalação

```bash
# Instale as dependências
npm install
```

---

## ▶️ Execução

```bash
# Execute o sistema
npx ts-node Index.ts
```

---

## ⚙️ Compilar para JavaScript (opcional)

```bash
npx tsc
node dist/Index.js
```

---

## ✅ Observações

- Os dados são armazenados **apenas em memória**, ou seja, são perdidos ao encerrar a execução.
- Todos os repositórios agora usam **instância única**, garantindo consistência durante o uso.

---

README desenvolvido com auxilo de IA visando Compliance Ass: Mario Eduardo 
