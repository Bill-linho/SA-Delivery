
import "dotenv/config";
import sequelize from "../config/database.js";
import Produto from "../models/produto.js";

const produtos = [
  {
    nome: "Água mineral",
    descricao: "Água mineral sem gás, 500 ml",
    preco: 3.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
  },
  {
    nome: "Refrigerante Cola",
    descricao: "Refrigerante 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500",
  },
  {
    nome: "Suco de laranja",
    descricao: "Suco natural de laranja, 300 ml",
    preco: 7.50,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
  },
  {
    nome: "Hambúrguer artesanal",
    descricao: "Hambúrguer com queijo, alface e tomate",
    preco: 22.90,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  {
    nome: "Batata frita",
    descricao: "Porção de batatas fritas",
    preco: 14.00,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
  },
  {
    nome: "Pizza de calabresa",
    descricao: "Pizza individual de calabresa",
    preco: 29.90,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500",
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