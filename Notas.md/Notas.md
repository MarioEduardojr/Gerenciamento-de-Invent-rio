# 📘 Notas Técnicas e Exemplos - Projeto de Inventário

Este arquivo contém anotações, estudos e exemplos práticos relacionados ao uso de TypeScript e TypeORM no contexto do projeto de gerenciamento de inventário.

---

## 📌 TypeScript - Tipagem e Estruturas

### Tipos básicos
```ts
let id: number = 1;
let nome: string = "Produto";
let ativo: boolean = true;
let descricao: string | null = null;
```

### Tipos condicionais, intersection e union types
```ts
type Usuario = { id: number; nome: string };
type Admin = Usuario & { permissao: "admin" | "super" };

type Status = "ativo" | "inativo";
type Resultado<T> = T extends string ? string : number;
```

---

## 📘 Interfaces e Tipos Personalizados

### Interface com propriedades opcionais
```ts
interface Produto {
  id: number;
  nome: string;
  descricao?: string;
}
```

### Diferença entre `type` e `interface`
- `interface`: melhor para objetos e OO
- `type`: ideal para composições e manipulações de tipo

---

## 🧠 Funções com Tipagem

```ts
function somar(a: number, b: number): number {
  return a + b;
}

function exibir(msg: string): void {
  console.log(msg);
}
```

---

## 🏗️ Classes, Herança e Modificadores

```ts
class Entidade {
  protected id: number;
  constructor(id: number) {
    this.id = id;
  }
}

class Produto extends Entidade {
  private nome: string;
  constructor(id: number, nome: string) {
    super(id);
    this.nome = nome;
  }
}
```

---

## 🧰 Generics

```ts
function wrapper<T>(valor: T): T[] {
  return [valor];
}
```

---

## 📊 Enums e Mapeamento de Valores

```ts
enum StatusPedido {
  PENDENTE = "pendente",
  ENVIADO = "enviado",
  ENTREGUE = "entregue"
}

const status: StatusPedido = StatusPedido.PENDENTE;
```

---

## 💾 Persistência em Memória

```ts
class Repositorio<T> {
  private dados: T[] = [];

  inserir(item: T) {
    this.dados.push(item);
  }

  listar(): T[] {
    return this.dados;
  }
}
```

---

## ⚙️ tsconfig.json (comentado)

```jsonc
{
  "compilerOptions": {
    "target": "ES2020", // Suporte a recursos modernos do JS
    "module": "CommonJS", // Módulo padrão para Node.js
    "strict": true, // Tipagem rigorosa para maior segurança
    "esModuleInterop": true, // Compatibilidade entre import/export e require
    "skipLibCheck": true, // Ignora verificação de tipos de libs externas
    "forceConsistentCasingInFileNames": true, // Força nomes de arquivos com caixa consistente
    "outDir": "dist" // Saída da compilação
  },
  "include": ["src"]
}
```

---

## 🗄️ TypeORM - Conceitos e Exemplos

### Entidade
```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}
```

### Relacionamento
```ts
@ManyToOne(() => Categoria, categoria => categoria.produtos)
categoria: Categoria;

@OneToMany(() => Produto, produto => produto.categoria)
produtos: Produto[];
```

### DataSource
```ts
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  entities: [Produto, Categoria]
});
```

---

📎 Essas anotações servem como referência para estudo e revisão dos principais recursos utilizados no projeto.