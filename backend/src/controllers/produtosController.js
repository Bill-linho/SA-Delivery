import Produto from "../models/Produto.js";

export async function listarBebidas(req, res) {
  try {
    const bebidas = await Produto.findAll({
      where: { categoria: "bebida" },
    });

    return res.status(200).json(bebidas);
  } catch (erro) {
    console.error("Erro ao buscar bebidas:", erro);

    return res.status(500).json({
      mensagem: "Erro ao buscar bebidas.",
    });
  }
}

export async function listarComidas(req, res) {
  try {
    const comidas = await Produto.findAll({
      where: { categoria: "comida" },
    });

    return res.status(200).json(comidas);
  } catch (erro) {
    console.error("Erro ao buscar comidas:", erro);

    return res.status(500).json({
      mensagem: "Erro ao buscar comidas.",
    });
  }
}