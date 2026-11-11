
import Carrinho from "../models/carrinho.js";
import ItemCarrinho from "../models/itemCarrinho.js";
import Produto from "../models/produto.js";

export async function adicionarProduto(req, res) {
    try {
        const { id_cliente, id_produto, quantidade } = req.body;

        // Verifica se os dados foram enviados
        if (!id_cliente || !id_produto) {
            return res.status(400).json({
                mensagem: "Informe o cliente e o produto.",
            });
        }

        // Verifica se o produto existe
        const produto = await Produto.findByPk(id_produto);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado.",
            });
        }

        // Procura o carrinho do cliente
        let carrinho = await Carrinho.findOne({
            where: { id_cliente },
        });

        // Se não existir, cria um carrinho
        if (!carrinho) {
            carrinho = await Carrinho.create({
                id_cliente,
            });
        }

        // Verifica se o produto já está no carrinho
        const item = await ItemCarrinho.findOne({
            where: {
                id_carrinho: carrinho.id_carrinho,
                id_produto,
            },
        });

        if (item) {
            // Se já existe, aumenta a quantidade
            item.quantidade += Number(quantidade) || 1;
            await item.save();
        } else {
            // Se não existe, adiciona um novo item
            await ItemCarrinho.create({
                id_carrinho: carrinho.id_carrinho,
                id_produto,
                quantidade: Number(quantidade) || 1,
            });
        }

        return res.status(201).json({
            mensagem: "Produto adicionado ao carrinho!",
        });

    } catch (erro) {
        console.error("Erro ao adicionar produto:", erro);

        return res.status(500).json({
            mensagem: "Erro ao adicionar produto ao carrinho.",
        });
    }
}

export async function listarCarrinho(req, res) {
    try {
        const { id_cliente } = req.params;

        // Procura o carrinho do cliente
        const carrinho = await Carrinho.findOne({
            where: { id_cliente },
        });

        // Se não existir carrinho, retorna uma lista vazia
        if (!carrinho) {
            return res.status(200).json([]);
        }

        // Busca os itens do carrinho
        const itens = await ItemCarrinho.findAll({
            where: {
                id_carrinho: carrinho.id_carrinho,
            },
        });

        // Busca os dados dos produtos
        const produtos = [];

        for (const item of itens) {
            const produto = await Produto.findByPk(item.id_produto);

            if (produto) {
                produtos.push({
                    id_item: item.id_item,
                    id_produto: produto.id_produto,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    url: produto.url,
                    quantidade: item.quantidade,
                });
            }
        }

        return res.status(200).json(produtos);

    } catch (erro) {
        console.error("Erro ao listar carrinho:", erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar o carrinho.",
        });
    }
}

export async function alterarQuantidade(req, res) {
    try {
        const { id_item } = req.params;
        const { quantidade } = req.body;

        // Verifica se a quantidade foi informada
        if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 1) {
            return res.status(400).json({
                mensagem: "Informe uma quantidade válida.",
            });
        }

        // Procura o item no carrinho
        const item = await ItemCarrinho.findByPk(id_item);

        if (!item) {
            return res.status(404).json({
                mensagem: "Item não encontrado no carrinho.",
            });
        }

        // Atualiza a quantidade
        item.quantidade = Number(quantidade);
        await item.save();

        return res.status(200).json({
            mensagem: "Quantidade atualizada com sucesso!",
        });

    } catch (erro) {
        console.error("Erro ao alterar quantidade:", erro);

        return res.status(500).json({
            mensagem: "Erro ao alterar quantidade.",
        });
    }
}

export async function removerProduto(req, res) {
    try {
        const { id_cliente, id_item } = req.params;

        // Procura o carrinho do cliente
        const carrinho = await Carrinho.findOne({
            where: { id_cliente },
        });

        if (!carrinho) {
            return res.status(404).json({
                mensagem: "Carrinho não encontrado.",
            });
        }

        // Procura o item dentro do carrinho do cliente
        const item = await ItemCarrinho.findOne({
            where: {
                id_item,
                id_carrinho: carrinho.id_carrinho,
            },
        });

        if (!item) {
            return res.status(404).json({
                mensagem: "Produto não encontrado no carrinho.",
            });
        }

        // Remove o produto
        await item.destroy();

        return res.status(200).json({
            mensagem: "Produto removido do carrinho!",
        });

    } catch (erro) {
        console.error("Erro ao remover produto:", erro);

        return res.status(500).json({
            mensagem: "Erro ao remover produto do carrinho.",
        });
    }
}
