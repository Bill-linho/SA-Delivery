
import { Router } from "express";
import {
    adicionarProduto,
    listarCarrinho,
    alterarQuantidade,
    removerProduto
} from "../controllers/carrinhoController.js";

const router = Router();

router.post("/adicionar", adicionarProduto);
router.get("/listar/:id_cliente", listarCarrinho);
router.put("/quantidade/:id_item", alterarQuantidade);
router.delete("/remover/:id_cliente/:id_item", removerProduto);

export default router;
