import { Router } from "express";
import { listarBebidas, listarComidas} from "../controllers/produtosController.js";

const router = Router();

router.get("/bebida", listarBebidas);
router.get("/comida", listarComidas);

export default router;