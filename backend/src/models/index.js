
import Cliente from "./cliente.js";
import Produto from "./produto.js";
import Carrinho from "./carrinho.js";
import Pedido from "./pedido.js";
import ItemPedido from "./itemPedido.js";
import Pagamento from "./pagamento.js";
import HistoricoPedido from "./historicoPedido.js";

// Cliente e pedidos
Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });
Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });

// Cliente e carrinho
Cliente.hasMany(Carrinho, { foreignKey: "id_cliente" });
Carrinho.belongsTo(Cliente, { foreignKey: "id_cliente" });

// Produto e carrinho
Produto.hasMany(Carrinho, { foreignKey: "id_produto" });
Carrinho.belongsTo(Produto, { foreignKey: "id_produto" });

// Pedido e itens
Pedido.hasMany(ItemPedido, { foreignKey: "id_pedido" });
ItemPedido.belongsTo(Pedido, { foreignKey: "id_pedido" });

// Produto e itens do pedido
Produto.hasMany(ItemPedido, { foreignKey: "id_produto" });
ItemPedido.belongsTo(Produto, { foreignKey: "id_produto" });

// Pedido e pagamento
Pedido.hasMany(Pagamento, { foreignKey: "id_pedido" });
Pagamento.belongsTo(Pedido, { foreignKey: "id_pedido" });

// Pedido e histórico
Pedido.hasMany(HistoricoPedido, { foreignKey: "id_pedido" });
HistoricoPedido.belongsTo(Pedido, { foreignKey: "id_pedido" });

export {
  Cliente,
  Produto,
  Carrinho,
  Pedido,
  ItemPedido,
  Pagamento,
  HistoricoPedido,
};
