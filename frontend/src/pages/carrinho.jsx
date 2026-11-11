
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoTrashOutline } from "react-icons/io5";
import {
    listarCarrinho,
    alterarQuantidade as alterarQuantidadeAPI,
    removerProduto,
} from "../services/carrinhoService";
import "../styles/carrinho.css";

export default function Carrinho() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // Busca os produtos do carrinho no banco
    async function carregarCarrinho() {
        try {
            const cliente = JSON.parse(localStorage.getItem("cliente"));

            if (!cliente) {
                setErro("Faça login para visualizar seu carrinho.");
                setProdutos([]);
                return;
            }

            const resposta = await listarCarrinho(cliente.id_cliente);

            setProdutos(resposta.data);
            setErro("");
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
            setErro("Não foi possível carregar seu carrinho.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarCarrinho();
    }, []);

    // Altera a quantidade de um produto
    async function alterarQuantidade(id_item, valor) {
        const produto = produtos.find(
            (item) => item.id_item === id_item
        );

        if (!produto) return;

        const novaQuantidade = produto.quantidade + valor;

        // Não permite quantidade menor que 1
        if (novaQuantidade < 1) return;

        try {
            await alterarQuantidadeAPI(id_item, novaQuantidade);
            await carregarCarrinho();
        } catch (error) {
            console.error("Erro ao alterar quantidade:", error);
            alert("Não foi possível alterar a quantidade.");
        }
    }

    // Remove um produto do carrinho
    async function removerItem(id_item) {
        try {
            const cliente = JSON.parse(localStorage.getItem("cliente"));

            await removerProduto(cliente.id_cliente, id_item);

            await carregarCarrinho();
        } catch (error) {
            console.error("Erro ao remover produto:", error);
            alert("Não foi possível remover o produto.");
        }
    }

    // Soma o valor de todos os produtos
    const total = produtos.reduce(
        (soma, produto) =>
            soma + Number(produto.preco) * produto.quantidade,
        0
    );

    // Conta a quantidade total de itens
    const quantidadeTotal = produtos.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    function formatarPreco(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    if (carregando) {
        return <p>Carregando carrinho...</p>;
    }

    return (
        <main className="carrinho-page">

            <header className="carrinho-header">
                <button
                    className="carrinho-voltar"
                    onClick={() => window.history.back()}
                >
                    <IoArrowBack />
                </button>

                <h1>Meu carrinho</h1>

                <span className="carrinho-contador">
                    {quantidadeTotal} itens
                </span>
            </header>

            {erro ? (
                <section className="carrinho-vazio">
                    <h2>{erro}</h2>
                </section>
            ) : produtos.length === 0 ? (
                <section className="carrinho-vazio">
                    <h2>Seu carrinho está vazio</h2>
                    <p>Adicione alguns produtos do nosso menu!</p>

                    <button onClick={() => window.history.back()}>
                        Voltar ao menu
                    </button>
                </section>
            ) : (
                <div className="carrinho-conteudo">

                    <section className="carrinho-produtos">
                        <h2>Seus produtos</h2>

                        {produtos.map((produto) => (
                            <article
                                className="carrinho-item"
                                key={produto.id_item}
                            >
                                <img
                                    src={produto.url}
                                    alt={produto.nome}
                                    className="carrinho-item-imagem"
                                />

                                <div className="carrinho-item-info">
                                    <h3>{produto.nome}</h3>
                                    <p>{produto.descricao}</p>

                                    <strong>
                                        {formatarPreco(produto.preco)}
                                    </strong>

                                    <div className="carrinho-item-acoes">
                                        <div className="carrinho-quantidade">
                                            <button
                                                onClick={() =>
                                                    alterarQuantidade(
                                                        produto.id_item,
                                                        -1
                                                    )
                                                }
                                                disabled={produto.quantidade <= 1}
                                            >
                                                -
                                            </button>

                                            <span>{produto.quantidade}</span>

                                            <button
                                                onClick={() =>
                                                    alterarQuantidade(
                                                        produto.id_item,
                                                        1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="carrinho-remover"
                                            onClick={() =>
                                                removerItem(produto.id_item)
                                            }
                                            title="Remover produto"
                                        >
                                            <IoTrashOutline />
                                        </button>
                                    </div>
                                </div>

                                <strong className="carrinho-item-subtotal">
                                    {formatarPreco(
                                        Number(produto.preco) *
                                        produto.quantidade
                                    )}
                                </strong>
                            </article>
                        ))}
                    </section>

                    <aside className="carrinho-resumo">
                        <h2>Resumo do pedido</h2>

                        <div className="carrinho-resumo-linha">
                            <span>Subtotal</span>
                            <span>{formatarPreco(total)}</span>
                        </div>

                        <div className="carrinho-resumo-linha">
                            <span>Entrega</span>
                            <span>A calcular</span>
                        </div>

                        <div className="carrinho-resumo-total">
                            <span>Total</span>
                            <strong>{formatarPreco(total)}</strong>
                        </div>

                        <button
                            className="carrinho-finalizar"
                            onClick={() => navigate("/pagamento")}
                        >
                            Continuar para pagamento
                        </button>
                    </aside>

                </div>
            )}

        </main>
    );
}
