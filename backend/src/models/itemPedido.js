
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ItemPedido = sequelize.define("ItemPedido", {
  id_item_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade: DataTypes.INTEGER,
  preco_unitario: DataTypes.DECIMAL(10, 2),
  observacao: DataTypes.STRING,
}, {
  tableName: "item_pedido",
  timestamps: false,
});

export default ItemPedido;
