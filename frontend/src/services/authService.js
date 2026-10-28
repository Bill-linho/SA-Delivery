import API from "./api";

export function cadastrarUsuario(dados) {
    return API.post("/home/cadastro", dados);
}

export function fazerLogin(dados) {
    return API.post("/home/login", dados);
}