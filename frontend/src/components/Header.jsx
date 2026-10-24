import "../styles/header.css"
import { FaCartPlus } from "react-icons/fa6";

export default function Header() {

    return (
        <header>

            <img src="/src/assets/cerveja-logo.png" alt="Logo da Cerveja" />
            <h1>BAR DA <span>AMIZADE</span></h1>

            <div className="header-buttons">
                <button className="header-button">Comidas</button>
                <button className="header-button">Bebidas</button>
                <button className="header-button">Minha Conta</button>
                <button className="header-button"><FaCartPlus /> Carrinho </button>

            </div>

        </header>
    )
}