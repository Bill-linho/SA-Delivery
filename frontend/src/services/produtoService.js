import API from "./api";

export function bebidas() {
    return API.get("/menu/bebida");
}

export function comidas() {
    return API.get("/menu/comida");
}