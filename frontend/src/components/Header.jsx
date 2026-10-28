import { FaCartPlus } from "react-icons/fa6";
import { LuBeer } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../styles/header.css"

export default function Header() {
    const navigate = useNavigate();

    return (
        <header>

            <LuBeer className="beer-icon" />
            <h1>BAR DA <span>AMIZADE</span></h1>

            <div className="header-buttons">
                <button className="header-button">Comidas</button>
                <button className="header-button" onClick={() => navigate("/login")}>Minha Conta</button>
                <button className="header-button"><FaCartPlus /> Carrinho </button>

            </div>

        </header>
    )
}