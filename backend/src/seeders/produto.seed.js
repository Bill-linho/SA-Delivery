
import "dotenv/config";
import sequelize from "../config/database.js";
import Produto from "../models/produto.js";

const produtos = [
  // BEBIDAS - CERVEJAS
  {
    nome: "Heineken 600ml",
    descricao: "Cerveja puro malte, sabor marcante e refrescante.",
    preco: 16.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9"
  },
  {
    nome: "Heineken Long Neck",
    descricao: "Cerveja premium em garrafa de 330ml.",
    preco: 10.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9"
  },
  {
    nome: "Original 600ml",
    descricao: "Cerveja pilsen leve e equilibrada.",
    preco: 14.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1535958636474-b021ee887b13"
  },
  {
    nome: "Brahma Duplo Malte 600ml",
    descricao: "Cerveja com sabor maltado e amargor equilibrado.",
    preco: 13.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1535958636474-b021ee887b13"
  },
  {
    nome: "Skol 600ml",
    descricao: "Cerveja pilsen leve e tradicional.",
    preco: 12.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9"
  },
  {
    nome: "Budweiser Long Neck",
    descricao: "Cerveja americana de sabor suave, 330ml.",
    preco: 10.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1535958636474-b021ee887b13"
  },
  {
    nome: "Corona Long Neck",
    descricao: "Cerveja mexicana leve e refrescante, 330ml.",
    preco: 12.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9"
  },
  {
    nome: "Stella Artois Long Neck",
    descricao: "Cerveja premium de sabor equilibrado, 330ml.",
    preco: 11.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1535958636474-b021ee887b13"
  },
  {
    nome: "Amstel 600ml",
    descricao: "Cerveja puro malte de sabor suave.",
    preco: 13.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9"
  },

  // BEBIDAS - DRINKS
  {
    nome: "Caipirinha de Limão",
    descricao: "Cachaça, limão, açúcar e gelo.",
    preco: 18.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Caipirinha de Morango",
    descricao: "Cachaça, morangos frescos, açúcar e gelo.",
    preco: 20.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Caipiroska de Limão",
    descricao: "Vodka, limão, açúcar e gelo.",
    preco: 20.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Caipiroska de Morango",
    descricao: "Vodka, morangos frescos, açúcar e gelo.",
    preco: 22.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Gin Tropical",
    descricao: "Gin, água tônica, laranja e frutas tropicais.",
    preco: 26.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a"
  },
  {
    nome: "Gin com Morango",
    descricao: "Gin, morangos frescos, água tônica e gelo.",
    preco: 25.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a"
  },
  {
    nome: "Mojito",
    descricao: "Rum, limão, hortelã, açúcar e água com gás.",
    preco: 22.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1556679343-c7306c1976bc"
  },
  {
    nome: "Moscow Mule",
    descricao: "Vodka, limão e xarope de gengibre.",
    preco: 25.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Sex on the Beach",
    descricao: "Vodka, licor de pêssego, suco de laranja e cranberry.",
    preco: 24.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Piña Colada",
    descricao: "Rum, leite de coco e suco de abacaxi.",
    preco: 24.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1544145945-f90425340c7e"
  },
  {
    nome: "Aperol Spritz",
    descricao: "Aperol, espumante, água com gás e laranja.",
    preco: 27.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },

  // BEBIDAS - DOSES
  {
    nome: "Dose de Whisky Red Label",
    descricao: "Dose de whisky escocês servido puro ou com gelo.",
    preco: 18.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8"
  },
  {
    nome: "Dose de Whisky Black Label",
    descricao: "Dose de whisky escocês envelhecido.",
    preco: 28.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8"
  },
  {
    nome: "Dose de Vodka",
    descricao: "Dose de vodka tradicional.",
    preco: 12.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Dose de Gin",
    descricao: "Dose de gin tradicional servido com gelo.",
    preco: 15.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a"
  },
  {
    nome: "Dose de Cachaça",
    descricao: "Dose de cachaça artesanal brasileira.",
    preco: 8.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8"
  },
  {
    nome: "Dose de Tequila",
    descricao: "Dose de tequila prata.",
    preco: 16.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8"
  },
  {
    nome: "Dose de Rum",
    descricao: "Dose de rum tradicional.",
    preco: 13.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8"
  },

  // BEBIDAS - VINHOS
  {
    nome: "Taça de Vinho Tinto",
    descricao: "Taça de vinho tinto seco da casa.",
    preco: 18.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
  },
  {
    nome: "Taça de Vinho Branco",
    descricao: "Taça de vinho branco suave e refrescante.",
    preco: 18.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
  },
  {
    nome: "Garrafa de Vinho Tinto",
    descricao: "Vinho tinto seco, garrafa de 750ml.",
    preco: 65.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
  },
  {
    nome: "Garrafa de Vinho Branco",
    descricao: "Vinho branco suave, garrafa de 750ml.",
    preco: 65.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
  },
  {
    nome: "Taça de Espumante",
    descricao: "Espumante brut servido gelado.",
    preco: 22.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },

  // BEBIDAS - REFRIGERANTES
  {
    nome: "Coca-Cola 350ml",
    descricao: "Refrigerante Coca-Cola tradicional em lata.",
    preco: 6.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
  },
  {
    nome: "Coca-Cola Zero 350ml",
    descricao: "Refrigerante Coca-Cola sem açúcar em lata.",
    preco: 6.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
  },
  {
    nome: "Guaraná Antarctica 350ml",
    descricao: "Refrigerante de guaraná em lata.",
    preco: 6.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
  },
  {
    nome: "Fanta Laranja 350ml",
    descricao: "Refrigerante de laranja em lata.",
    preco: 6.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
  },
  {
    nome: "Sprite 350ml",
    descricao: "Refrigerante de limão em lata.",
    preco: 6.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
  },

  // BEBIDAS - SUCOS E OUTRAS BEBIDAS
  {
    nome: "Água Mineral 500ml",
    descricao: "Água mineral sem gás.",
    preco: 4.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1564419320461-6870880221ad"
  },
  {
    nome: "Água com Gás 500ml",
    descricao: "Água mineral gaseificada.",
    preco: 5.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1564419320461-6870880221ad"
  },
  {
    nome: "Suco de Laranja",
    descricao: "Suco natural de laranja feito na hora.",
    preco: 10.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba"
  },
  {
    nome: "Suco de Limão",
    descricao: "Suco natural de limão gelado.",
    preco: 9.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Suco de Maracujá",
    descricao: "Suco natural de maracujá.",
    preco: 10.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba"
  },
  {
    nome: "Suco de Morango",
    descricao: "Suco de morango preparado na hora.",
    preco: 12.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba"
  },
  {
    nome: "Limonada Suíça",
    descricao: "Limão batido com água, açúcar e gelo.",
    preco: 12.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"
  },
  {
    nome: "Energético Red Bull",
    descricao: "Bebida energética em lata de 250ml.",
    preco: 13.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e"
  },
  {
    nome: "Água Tônica",
    descricao: "Água tônica gelada em lata.",
    preco: 7.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1564419320461-6870880221ad"
  },
  {
    nome: "Chá Gelado de Pêssego",
    descricao: "Chá gelado sabor pêssego.",
    preco: 8.00,
    categoria: "Bebidas",
    url_imagem: "https://images.unsplash.com/photo-1556679343-c7306c1976bc"
  },

  // COMIDAS
  {
    nome: "Batata Frita",
    descricao: "Porção de batatas fritas crocantes.",
    preco: 28.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
  },
  {
    nome: "Batata com Cheddar e Bacon",
    descricao: "Batatas fritas cobertas com cheddar e bacon.",
    preco: 38.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
  },
  {
    nome: "Iscas de Frango",
    descricao: "Tiras de frango empanadas e crocantes.",
    preco: 32.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1562967914-608f82629710"
  },
  {
    nome: "Calabresa Acebolada",
    descricao: "Linguiça calabresa frita com cebola.",
    preco: 30.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1544025162-d76694265947"
  },
  {
    nome: "Mandioca Frita",
    descricao: "Porção de mandioca frita e crocante.",
    preco: 25.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
  },
  {
    nome: "Iscas de Peixe",
    descricao: "Iscas de peixe empanadas, acompanhadas de limão.",
    preco: 38.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
  },
  {
    nome: "Bolinho de Bacalhau",
    descricao: "Bolinho de bacalhau artesanal servido em porção.",
    preco: 36.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1547592180-85f173990554"
  },
  {
    nome: "Frango à Passarinho",
    descricao: "Pedaços de frango temperados e fritos.",
    preco: 35.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1562967914-608f82629710"
  },
  {
    nome: "Amendoim Torrado",
    descricao: "Porção de amendoim torrado e levemente salgado.",
    preco: 12.00,
    categoria: "Comidas",
    url_imagem: "https://images.unsplash.com/photo-1567892737950-30c4db37cd89"
  }
];

async function executarSeed() {
  try {
    await sequelize.authenticate();

    console.log("Conexão com o banco estabelecida!");

    for (const produto of produtos) {
      const existente = await Produto.findOne({
        where: { nome: produto.nome }
      });

      if (existente) {
        await existente.update(produto);
      } else {
        await Produto.create(produto);
      }
    }

    console.log(`${produtos.length} produtos cadastrados ou atualizados!`);
  } catch (erro) {
    console.error("Erro ao executar seed:", erro);
  } finally {
    await sequelize.close();
  }
}

executarSeed();
