
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const HistoricoPedido = sequelize.define("HistoricoPedido", {
  id_historico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: DataTypes.STRING,
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  anotacao: DataTypes.STRING,
}, {
  tableName: "historico_pedido",
  timestamps: false,
});

export default HistoricoPedido;
