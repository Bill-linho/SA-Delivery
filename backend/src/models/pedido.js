
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pedido = sequelize.define("Pedido", {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status_atual: {
    type: DataTypes.STRING,
    defaultValue: "Pendente",
  },
  valor_total: DataTypes.DECIMAL(10, 2),
}, {
  tableName: "pedido",
  timestamps: false,
});

export default Pedido;
