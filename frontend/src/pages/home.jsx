import Header from "../components/Header"
import { LuUtensilsCrossed, LuClock, LuHeart, LuBeer } from "react-icons/lu";
export default function Home() {

    return (
        <div>
            <Header />

            <seaction className="home-hero">
                <h2>O SEU BOTECO, ONDE VOCÊ ESTIVER</h2>
                <h1>COMIDA BOA.</h1>
                <h1>BEBIDA GELADA.</h1>
                <h1 className="hero-h1-title">AMIZADE SEMPRE.</h1>
                <h2>O sabor do nosso bar, no conforto de casa.</h2>
                <h2>Escolha seus favoritos e deixe o resto com a gente.</h2>

                <div className="home-hero-buttons">
                    <button className="home-hero-button">Fazer Pedido</button>
                    <button className="home-hero-button">Criar Conta</button>
                </div>

            </seaction>

            <seaction className="home-review">
                <div>
                    <h2><LuUtensilsCrossed /> FEITO NA HORA</h2>
                    <p>Capricho em cada porção.</p>
                </div>
                <div>
                    <h2><LuClock /> ENTREGA RÁPIDA</h2>
                    <p>Seu pedido chega rápido e quente.</p>
                </div>
                <div>
                    <h2><LuHeart /> AMIZADE SEMPRE</h2>
                    <p>Compartilhe momentos incríveis com amigos e familiares.</p>
                </div>
            </seaction>

            <seaction className="home-invitation">

                <h2>PODE CHEGAR, A CASA É SUA</h2>
                <h1>O QUE VAI SER HOJE?</h1>

                <div className="home-invitation-buttons">
                    <button className="home-invitation-button"><LuUtensilsCrossed />UMA PORÇÃO DE FELICIDADE<p>PETISCOS, BURGUERS E CLÁSSICOS DO BAR</p></button>
                    <button className="home-invitation-button"><LuBeer />UM BRINDE AOS BONS MOMENTOS<p>CHOPP, DRINKS E OPÇÕES SEM ÁLCOOL</p></button>
                </div>

            </seaction>

        </div>
    )
}