
import sequelize from "../config/database.js";

import Cliente from "../models/cliente.js";
import Produto from "../models/produto.js";
import Carrinho from "../models/carrinho.js";
import ItemCarrinho from "../models/itemCarrinho.js";
import Pedido from "../models/pedido.js";
import ItemPedido from "../models/itemPedido.js";
import Pagamento from "../models/pagamento.js";

export async function finalizarPedido(req, res) {
    const { id_cliente, metodo, endereco } = req.body;

    const metodosPermitidos = ["Dinheiro", "Saldo"];

    if (!id_cliente || !metodosPermitidos.includes(metodo)) {
        return res.status(400).json({
            mensagem: "Informe o cliente e uma forma de pagamento válida.",
        });
    }

    try {
        const resultado = await sequelize.transaction(async (transaction) => {

            // Busca o cliente e bloqueia sua linha durante a transação
            const cliente = await Cliente.findByPk(id_cliente, {
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!cliente) {
                throw new Error("Cliente não encontrado.");
            }

            // Verifica o endereço de entrega
            const enderecoEntrega = endereco?.trim() || cliente.endereco;

            if (!enderecoEntrega) {
                throw new Error("Informe o endereço de entrega.");
            }

            // Atualiza o endereço caso tenha sido alterado
            if (endereco?.trim()) {
                cliente.endereco = enderecoEntrega;
            }

            // Busca o carrinho
            const carrinho = await Carrinho.findOne({
                where: { id_cliente },
                transaction,
            });

            if (!carrinho) {
                throw new Error("Carrinho não encontrado.");
            }

            const itens = await ItemCarrinho.findAll({
                where: { id_carrinho: carrinho.id_carrinho },
                transaction,
            });

            if (itens.length === 0) {
                throw new Error("Seu carrinho está vazio.");
            }

            // Calcula o valor usando os preços do banco
            let valorTotal = 0;
            const produtosPedido = [];

            for (const item of itens) {
                const produto = await Produto.findByPk(item.id_produto, {
                    transaction,
                });

                if (!produto) {
                    throw new Error("Um produto do carrinho não foi encontrado.");
                }

                const preco = Number(produto.preco);

                valorTotal += preco * item.quantidade;

                produtosPedido.push({
                    id_produto: produto.id_produto,
                    quantidade: item.quantidade,
                    preco_unitario: preco,
                });
            }

            valorTotal = Number(valorTotal.toFixed(2));

            // Verifica e desconta o saldo, se necessário
            if (metodo === "Saldo") {
                const saldoAtual = Number(cliente.saldo);

                if (saldoAtual < valorTotal) {
                    throw new Error("Saldo insuficiente.");
                }

                cliente.saldo = Number(
                    (saldoAtual - valorTotal).toFixed(2)
                );
            }

            await cliente.save({ transaction });

            // Cria o pedido
            const pedido = await Pedido.create({
                id_cliente,
                valor_total: valorTotal,
                status_atual: "Pendente",
            }, { transaction });

            // Registra os produtos do pedido
            for (const item of produtosPedido) {
                await ItemPedido.create({
                    id_pedido: pedido.id_pedido,
                    id_produto: item.id_produto,
                    quantidade: item.quantidade,
                    preco_unitario: item.preco_unitario,
                }, { transaction });
            }

            // Registra o pagamento
            await Pagamento.create({
                id_pedido: pedido.id_pedido,
                metodo,
                valor_pago: valorTotal,
                status: metodo === "Saldo" ? "Pago" : "Pendente",
            }, { transaction });

            // Esvazia o carrinho
            await ItemCarrinho.destroy({
                where: { id_carrinho: carrinho.id_carrinho },
                transaction,
            });

            return {
                id_pedido: pedido.id_pedido,
                valor_total: valorTotal,
                status: pedido.status_atual,
                endereco: enderecoEntrega,
                metodo,
                saldo_restante: Number(cliente.saldo),
            };
        });

        return res.status(201).json({
            mensagem: "Pedido realizado com sucesso!",
            pedido: resultado,
        });

    } catch (erro) {
        console.error("Erro ao finalizar pedido:", erro);

        const errosDoCliente = [
            "Cliente não encontrado.",
            "Informe o endereço de entrega.",
            "Carrinho não encontrado.",
            "Seu carrinho está vazio.",
            "Um produto do carrinho não foi encontrado.",
            "Saldo insuficiente.",
        ];

        if (errosDoCliente.includes(erro.message)) {
            return res.status(400).json({
                mensagem: erro.message,
            });
        }

        return res.status(500).json({
            mensagem: "Erro ao finalizar pedido.",
        });
    }
}
