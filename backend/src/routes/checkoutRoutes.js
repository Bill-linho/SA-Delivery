
import { Router } from "express";
import { finalizarPedido } from "../controllers/checkoutController.js";

const router = Router();

router.post("/finalizar", finalizarPedido);

export default router;
