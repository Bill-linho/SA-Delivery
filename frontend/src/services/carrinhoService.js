
import API from "./api";

// Adicionar produto ao carrinho
export function adicionarProduto(dados) {
    return API.post("/carrinho/adicionar", dados);
}

// Listar produtos do carrinho
export function listarCarrinho(id_cliente) {
    return API.get(`/carrinho/listar/${id_cliente}`);
}

// Alterar quantidade de um produto
export function alterarQuantidade(id_item, quantidade) {
    return API.put(`/carrinho/quantidade/${id_item}`, {
        quantidade,
    });
}

// Remover produto do carrinho
export function removerProduto(id_cliente, id_item) {
    return API.delete(`/carrinho/remover/${id_cliente}/${id_item}`);
}
