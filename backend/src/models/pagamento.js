
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pagamento = sequelize.define("Pagamento", {
  id_pagamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  metodo: DataTypes.STRING,
  valor_pago: DataTypes.DECIMAL(10, 2),
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pendente",
  },
}, {
  tableName: "pagamento",
  timestamps: false,
});

export default Pagamento;
