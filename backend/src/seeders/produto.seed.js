import "dotenv/config";
import sequelize from "../config/database.js";
import Produto from "../models/Produto.js";

const produtos = [
  {
    nome: "Água mineral",
    descricao: "Água mineral sem gás, 500 ml",
    preco: 3.00,
    categoria: "bebida",
  },
  {
    nome: "Refrigerante Cola",
    descricao: "Refrigerante 350 ml",
    preco: 6.00,
    categoria: "bebida",
  },
  {
    nome: "Suco de laranja",
    descricao: "Suco natural de laranja, 300 ml",
    preco: 7.50,
    categoria: "bebida",
  },
  {
    nome: "Hambúrguer artesanal",
    descricao: "Hambúrguer com queijo, alface e tomate",
    preco: 22.90,
    categoria: "comida",
  },
  {
    nome: "Batata frita",
    descricao: "Porção de batatas fritas",
    preco: 14.00,
    categoria: "comida",
  },
  {
    nome: "Pizza de calabresa",
    descricao: "Pizza individual de calabresa",
    preco: 29.90,
    categoria: "comida",
  },
];

async function popularProdutos() {
  try {
    console.log("Testando conexão com o banco...");

    await sequelize.authenticate();
    console.log("Conexão estabelecida!");

    await Produto.sync();
    console.log("Tabela produto verificada!");

    const quantidade = await Produto.count();

    if (quantidade > 0) {
      console.log(`A tabela já possui ${quantidade} produtos.`);
      console.log("Nenhum produto novo foi inserido.");
      return;
    }

    await Produto.bulkCreate(produtos);

    console.log(`${produtos.length} produtos cadastrados com sucesso!`);
  } catch (erro) {
    console.error("Erro ao popular produtos:", erro.message);
  } finally {
    await sequelize.close();
  }
}

popularProdutos();