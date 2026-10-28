
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cliente = sequelize.define("Cliente", {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: DataTypes.STRING,
  endereco: DataTypes.STRING,
}, {
  tableName: "cliente",
  timestamps: false,
});

export default Cliente;
