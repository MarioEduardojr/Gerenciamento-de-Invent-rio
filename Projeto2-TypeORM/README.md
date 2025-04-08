# 📦 Sistema de Gerenciamento de Inventário (TypeORM)

Versão com persistência real em banco de dados SQLite utilizando TypeORM.

---

## 🛠 Requisitos

- Node.js v18+
- npm ou yarn

---

## ▶️ Instalação e Execução

```bash
# Instale as dependências
npm install

# Execute o sistema em modo de desenvolvimento
npm run dev
```

---

## 📂 Estrutura

- `src/data-source.ts` – Configuração do TypeORM e banco SQLite
- `src/entities/Produto.ts` – Entidade Produto
- `src/entities/Categoria.ts` – Entidade Categoria
- `src/menu.ts` – Menu principal da CLI (em construção)
- `src/index.ts` – Arquivo principal que inicia a aplicação

---

## ✅ Observações

- Banco de dados é criado automaticamente como `db.sqlite`
- A sincronização (`synchronize: true`) garante que as tabelas sejam geradas
- Suporte completo a relacionamentos entre categorias e produtos

---

💡 A aplicação será expandida com os mesmos recursos do projeto anterior: CRUD completo via terminal.

README desenvolvido com auxilo de IA visando Compliance Ass: Mario Eduardo
