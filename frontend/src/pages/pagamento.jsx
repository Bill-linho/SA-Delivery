
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { listarCarrinho } from "../services/carrinhoService";
import { finalizarPedido } from "../services/checkoutService";

import "../styles/pagamento.css";

export default function Pagamento() {
    const navigate = useNavigate();

    const [cliente, setCliente] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [endereco, setEndereco] = useState("");
    const [metodo, setMetodo] = useState("Dinheiro");
    const [carregando, setCarregando] = useState(true);
    const [finalizando, setFinalizando] = useState(false);
    const [erro, setErro] = useState("");
    const [pedidoFinalizado, setPedidoFinalizado] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const dadosCliente = JSON.parse(
                    localStorage.getItem("cliente")
                );

                if (!dadosCliente) {
                    navigate("/login");
                    return;
                }

                setCliente(dadosCliente);
                setEndereco(dadosCliente.endereco || "");

                const resposta = await listarCarrinho(
                    dadosCliente.id_cliente
                );

                setProdutos(resposta.data);

            } catch (error) {
                console.error("Erro ao carregar pagamento:", error);
                setErro("Não foi possível carregar os dados do pedido.");
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [navigate]);

    const total = produtos.reduce(
        (soma, produto) =>
            soma + Number(produto.preco) * produto.quantidade,
        0
    );

    function formatarPreco(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    async function handleFinalizar() {
        if (!endereco.trim()) {
            setErro("Informe o endereço de entrega.");
            return;
        }

        if (produtos.length === 0) {
            setErro("Seu carrinho está vazio.");
            return;
        }

        try {
            setFinalizando(true);
            setErro("");

            const resposta = await finalizarPedido({
                id_cliente: cliente.id_cliente,
                metodo,
                endereco,
            });

            const clienteAtualizado = {
                ...cliente,
                saldo: resposta.data.pedido.saldo_restante,
                endereco,
            };

            localStorage.setItem(
                "cliente",
                JSON.stringify(clienteAtualizado)
            );

            setCliente(clienteAtualizado);
            setPedidoFinalizado(resposta.data.pedido);
            setProdutos([]);

        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);

            setErro(
                error.response?.data?.mensagem ||
                "Não foi possível finalizar o pedido."
            );
        } finally {
            setFinalizando(false);
        }
    }

    if (carregando) {
        return <p>Carregando pagamento...</p>;
    }

    if (pedidoFinalizado) {
        return (
            <main className="pagamento-page">
                <section className="pagamento-sucesso">
                    <h1>Pedido realizado!</h1>

                    <p>
                        Seu pedido foi registrado com sucesso.
                    </p>

                    <p>
                        Número do pedido: {pedidoFinalizado.id_pedido}
                    </p>

                    <p>
                        Valor: {formatarPreco(pedidoFinalizado.valor_total)}
                    </p>

                    <p>
                        Pagamento: {pedidoFinalizado.metodo === "Saldo"
                            ? "Saldo da conta"
                            : "Dinheiro na entrega"}
                    </p>

                    {pedidoFinalizado.metodo === "Dinheiro" && (
                        <p>
                            Aguarde o motoboy entregar seu pedido.
                            O pagamento será feito na entrega.
                        </p>
                    )}

                    {pedidoFinalizado.metodo === "Saldo" && (
                        <p>
                            Saldo restante:{" "}
                            {formatarPreco(pedidoFinalizado.saldo_restante)}
                        </p>
                    )}

                    <button onClick={() => navigate("/menu")}>
                        Voltar ao menu
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="pagamento-page">

            <header className="pagamento-header">
                <button onClick={() => navigate("/carrinho")}>
                    <IoArrowBack />
                </button>

                <h1>Finalizar pedido</h1>
            </header>

            {erro && (
                <p className="pagamento-erro">{erro}</p>
            )}

            <section className="pagamento-endereco">
                <h2>Endereço de entrega</h2>

                <textarea
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Digite seu endereço completo"
                    rows={3}
                />
            </section>

            <section className="pagamento-metodos">
                <h2>Forma de pagamento</h2>

                <label className="pagamento-opcao">
                    <input
                        type="radio"
                        name="metodo"
                        value="Dinheiro"
                        checked={metodo === "Dinheiro"}
                        onChange={(e) => setMetodo(e.target.value)}
                    />

                    <div>
                        <strong>Dinheiro na entrega</strong>
                        <p>
                            Pague diretamente ao motoboy quando
                            receber seu pedido.
                        </p>
                    </div>
                </label>

                <label className="pagamento-opcao">
                    <input
                        type="radio"
                        name="metodo"
                        value="Saldo"
                        checked={metodo === "Saldo"}
                        onChange={(e) => setMetodo(e.target.value)}
                    />

                    <div>
                        <strong>Saldo da conta</strong>
                        <p>
                            Saldo disponível: {formatarPreco(cliente?.saldo || 0)}
                        </p>
                    </div>
                </label>
            </section>

            <section className="pagamento-resumo">
                <h2>Resumo do pedido</h2>

                {produtos.map((produto) => (
                    <div
                        className="pagamento-produto"
                        key={produto.id_item}
                    >
                        <span>
                            {produto.quantidade}x {produto.nome}
                        </span>

                        <strong>
                            {formatarPreco(
                                Number(produto.preco) * produto.quantidade
                            )}
                        </strong>
                    </div>
                ))}

                <div className="pagamento-total">
                    <span>Total</span>
                    <strong>{formatarPreco(total)}</strong>
                </div>

                <button
                    className="pagamento-confirmar"
                    onClick={handleFinalizar}
                    disabled={finalizando || produtos.length === 0}
                >
                    {finalizando
                        ? "Finalizando..."
                        : "Confirmar pedido"}
                </button>
            </section>

        </main>
    );
}
