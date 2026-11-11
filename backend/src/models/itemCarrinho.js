
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ItemCarrinho = sequelize.define("ItemCarrinho", {
    id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_carrinho: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    observacao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "item_carrinho",
    timestamps: false,
});

export default ItemCarrinho;