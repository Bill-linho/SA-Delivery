import API from "./api";

export function cadastrarUsuario(dados) {
    return API.post("/user/cadastro", dados);
}