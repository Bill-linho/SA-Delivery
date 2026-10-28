
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Produto = sequelize.define("Produto", {
  id_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: DataTypes.STRING,
  preco: DataTypes.DECIMAL(10, 2),
  categoria: DataTypes.STRING,
}, {
  tableName: "produto",
  timestamps: false,
});

export default Produto;
