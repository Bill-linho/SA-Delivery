
import API from "./api";

export function finalizarPedido(dados) {
    return API.post("/checkout/finalizar", dados);
}
