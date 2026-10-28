import API from "./api";

export function cadastrarUsuario(dados) {
    return API.post("/home/cadastro", dados);
}