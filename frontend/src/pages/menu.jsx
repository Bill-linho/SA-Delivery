
import { useEffect, useState } from "react";
import { bebidas, comidas } from "../services/produtoService";
import { adicionarProduto } from "../services/carrinhoService";
import { IoArrowBack } from "react-icons/io5";
import "../styles/menu.css";

export default function Menu() {
    const [listaBebidas, setListaBebidas] = useState([]);
    const [listaComidas, setListaComidas] = useState([]);
    const [categoria, setCategoria] = useState("comidas");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [adicionando, setAdicionando] = useState(null);

    useEffect(() => {
        async function buscarMenu() {
            try {
                const [resBebidas, resComidas] = await Promise.all([
                    bebidas(),
                    comidas()
                ]);

                setListaBebidas(resBebidas.data);
                setListaComidas(resComidas.data);
            } catch (error) {
                console.error("Erro ao buscar o menu:", error);
                setErro("Não foi possível carregar o menu.");
            } finally {
                setCarregando(false);
            }
        }

        buscarMenu();
    }, []);

    async function handleAdicionar(produto) {
        try {
            // Recupera os dados do cliente
            const cliente = JSON.parse(localStorage.getItem("cliente"));

            if (!cliente) {
                alert("Faça login para adicionar produtos ao carrinho.");
                return;
            }

            setAdicionando(produto.id_produto);

            // Adiciona o produto ao carrinho
            await adicionarProduto({
                id_cliente: cliente.id_cliente,
                id_produto: produto.id_produto,
                quantidade: 1,
            });

            alert("Produto adicionado ao carrinho!");

        } catch (error) {
            console.error("Erro ao adicionar produto:", error);

            alert(
                error.response?.data?.mensagem ||
                "Não foi possível adicionar o produto ao carrinho."
            );
        } finally {
            setAdicionando(null);
        }
    }

    if (carregando) {
        return <p>Carregando menu...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <main className="menu-page">
            <button onClick={() => window.history.back()}>
                <IoArrowBack />
            </button>

            <h1>Nosso Menu</h1>

            <div className="menu-categorias">
                <button
                    className={categoria === "comidas" ? "ativo" : ""}
                    onClick={() => setCategoria("comidas")}
                >
                    Comidas
                </button>

                <button
                    className={categoria === "bebidas" ? "ativo" : ""}
                    onClick={() => setCategoria("bebidas")}
                >
                    Bebidas
                </button>
            </div>

            <section className="menu-section">
                {categoria === "comidas" ? (
                    <div className="menu-lista">
                        {listaComidas.map((comida) => (
                            <article
                                className="menu-item"
                                key={comida.id_produto}
                            >
                                <img
                                    src={comida.url}
                                    alt={comida.nome}
                                    className="menu-item-imagem"
                                />

                                <h3>{comida.nome}</h3>
                                <p>{comida.descricao}</p>

                                <p>
                                    R$ {Number(comida.preco).toFixed(2)}
                                </p>

                                <button
                                    onClick={() => handleAdicionar(comida)}
                                    disabled={adicionando === comida.id_produto}
                                >
                                    {adicionando === comida.id_produto
                                        ? "Adicionando..."
                                        : "Adicionar ao carrinho"}
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="menu-lista">
                        {listaBebidas.map((bebida) => (
                            <article
                                className="menu-item"
                                key={bebida.id_produto}
                            >
                                <img
                                    src={bebida.url}
                                    alt={bebida.nome}
                                    className="menu-item-imagem"
                                />

                                <h3>{bebida.nome}</h3>
                                <p>{bebida.descricao}</p>

                                <p>
                                    R$ {Number(bebida.preco).toFixed(2)}
                                </p>

                                <button
                                    onClick={() => handleAdicionar(bebida)}
                                    disabled={adicionando === bebida.id_produto}
                                >
                                    {adicionando === bebida.id_produto
                                        ? "Adicionando..."
                                        : "Adicionar ao carrinho"}
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
