import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/header.css"

export default function Header() {
    const navigate = useNavigate();

    return (
        <header>

            <img src="/src/assets/cerveja-logo.png" alt="Logo da Cerveja" />
            <h1>BAR DA <span>AMIZADE</span></h1>

            <div className="header-buttons">
                <button className="header-button">Comidas</button>
                <button className="header-button">Bebidas</button>
                <button className="header-button" onClick={() => navigate("/login")}>Minha Conta</button>
                <button className="header-button"><FaCartPlus /> Carrinho </button>

            </div>

        </header>
    )
}