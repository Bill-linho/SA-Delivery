
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Carrinho = sequelize.define("Carrinho", {
  id_carrinho: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade: DataTypes.INTEGER,
  observacao: DataTypes.STRING,
}, {
  tableName: "carrinho",
  timestamps: false,
});

export default Carrinho;
