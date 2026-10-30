
import "dotenv/config";
import sequelize from "../config/database.js";
import Produto from "../models/produto.js";

const produtos = [
  // DRINKS
  {
    nome: "Caipirinha",
    descricao: "Drink de cachaça, limão, açúcar e gelo",
    preco: 18.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=500",
  },
  {
    nome: "Caipiroska de morango",
    descricao: "Drink de vodka, morango, açúcar e gelo",
    preco: 22.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1536935338788846bb9981813?w=500",
  },
  {
    nome: "Mojito",
    descricao: "Drink de rum, limão, hortelã, açúcar e água com gás",
    preco: 24.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500",
  },
  {
    nome: "Gin tônica",
    descricao: "Drink de gin, água tônica e limão",
    preco: 26.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1571950006415-6d4b9a2b1f0a?w=500",
  },

  // REFRIGERANTES
  {
    nome: "Coca-Cola",
    descricao: "Refrigerante de cola, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500",
  },
  {
    nome: "Coca-Cola Zero",
    descricao: "Refrigerante de cola sem açúcar, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500",
  },
  {
    nome: "Guaraná Antarctica",
    descricao: "Refrigerante de guaraná, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500",
  },
  {
    nome: "Sprite",
    descricao: "Refrigerante de limão, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1625772299848-391b6a4e6e2e?w=500",
  },
  {
    nome: "Fanta Laranja",
    descricao: "Refrigerante de laranja, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500",
  },
  {
    nome: "Fanta Uva",
    descricao: "Refrigerante de uva, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500",
  },

  // ÁGUAS
  {
    nome: "Água mineral sem gás",
    descricao: "Água mineral natural, garrafa 500 ml",
    preco: 3.50,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
  },
  {
    nome: "Água mineral com gás",
    descricao: "Água mineral gaseificada, garrafa 500 ml",
    preco: 4.50,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500",
  },

  // CERVEJAS
  {
    nome: "Heineken",
    descricao: "Cerveja Pilsen, long neck 330 ml",
    preco: 10.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },
  {
    nome: "Budweiser",
    descricao: "Cerveja American Lager, long neck 330 ml",
    preco: 9.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },
  {
    nome: "Corona Extra",
    descricao: "Cerveja Premium Lager, long neck 330 ml",
    preco: 12.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1623934199716-dc28818a6f4b?w=500",
  },
  {
    nome: "Stella Artois",
    descricao: "Cerveja Premium Lager, long neck 330 ml",
    preco: 11.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },
  {
    nome: "Original",
    descricao: "Cerveja Pilsen, garrafa 600 ml",
    preco: 13.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },
  {
    nome: "Brahma Duplo Malte",
    descricao: "Cerveja Puro Malte, garrafa 600 ml",
    preco: 12.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },
  {
    nome: "Skol",
    descricao: "Cerveja Pilsen, lata 350 ml",
    preco: 6.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },
  {
    nome: "Amstel",
    descricao: "Cerveja Puro Malte, lata 350 ml",
    preco: 7.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
  },

  // CHOPP
  {
    nome: "Chopp Pilsen 300 ml",
    descricao: "Chopp Pilsen gelado, copo de 300 ml",
    preco: 9.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500",
  },
  {
    nome: "Chopp Pilsen 500 ml",
    descricao: "Chopp Pilsen gelado, copo de 500 ml",
    preco: 14.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500",
  },

  // ENERGÉTICOS
  {
    nome: "Red Bull",
    descricao: "Energético tradicional, lata 250 ml",
    preco: 12.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1610878180933-123728745d22?w=500",
  },
  {
    nome: "Monster Energy",
    descricao: "Energético tradicional, lata 473 ml",
    preco: 13.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500",
  },
  {
    nome: "Red Bull Tropical",
    descricao: "Energético sabor tropical, lata 250 ml",
    preco: 12.00,
    categoria: "bebida",
    url: "https://images.unsplash.com/photo-1610878180933-123728745d22?w=500",
  },

  // COMIDAS
  {
    nome: "Batata frita",
    descricao: "Porção de batatas fritas crocantes",
    preco: 25.00,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
  },
  {
    nome: "Hambúrguer simples",
    descricao: "Pão, carne de hambúrguer e queijo",
    preco: 10.00,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  {
    nome: "Porção de camarões",
    descricao: "Porção de camarões preparados na manteiga e alho",
    preco: 120.00,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500",
  },
  {
    nome: "Anéis de cebola",
    descricao: "Porção de anéis de cebola empanados e crocantes",
    preco: 30.00,
    categoria: "comida",
    url: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500",
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
