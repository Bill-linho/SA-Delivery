import "dotenv/config";
import express from "express";
import cors from "cors";

import sequelize from "./src/config/database.js";
import corsOptions from "./src/config/cors.js";
import authenticate from "./src/routes/cliente.route.js";
import produtoRoutes from "./src/routes/produtos.routes.js";
import carrinhoRoutes from "./src/routes/carrinhoRoutes.js";
import checkoutRoutes from "./src/routes/checkoutRoutes.js";

import "./src/models/index.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/home", authenticate)
app.use("/menu", produtoRoutes);
app.use("/carrinho", carrinhoRoutes);
app.use("/checkout", checkoutRoutes);

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado!");

    await sequelize.sync();
    console.log("Tabelas sincronizadas!");

    app.listen(3000, () => {
      console.log("API rodando em http://localhost:3000");
    });
  } catch (erro) {
    console.error("Erro ao iniciar:", erro);
  }
}

iniciarServidor();
