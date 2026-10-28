import { useEffect, useState } from "react";
import { bebidas, comidas } from "../services/produtoService";
import "../styles/menu.css";

export default function Menu() {
    const [listaBebidas, setListaBebidas] = useState([]);
    const [listaComidas, setListaComidas] = useState([]);
    const [categoria, setCategoria] = useState("comidas");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

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

    if (carregando) {
        return <p>Carregando menu...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <main className="menu-page">

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
                            <article className="menu-item" key={comida.id}>
                                <h3>{comida.nome}</h3>
                                <p>{comida.descricao}</p>
                                <p>
                                    R$ {Number(comida.preco).toFixed(2)}
                                </p>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="menu-lista">
                        {listaBebidas.map((bebida) => (
                            <article className="menu-item" key={bebida.id}>
                                <h3>{bebida.nome}</h3>
                                <p>{bebida.descricao}</p>
                                <p>
                                    R$ {Number(bebida.preco).toFixed(2)}
                                </p>
                            </article>
                        ))}
                    </div>
                )}

            </section>

        </main>
    );
}