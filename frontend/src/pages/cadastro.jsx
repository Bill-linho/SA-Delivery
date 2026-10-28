import { useNavigate } from "react-router-dom";
import '../styles/auth.css';


export default function Cadastro() {
    const navigate = useNavigate();

    return (
        <div className="cadastro-page">
            <main className="cadastro-main">
                <section className="cadastro-card">

                    <h1>VENHA FAZER PARTE!</h1>

                    <p className="cadastro-subtitle">
                        Crie sua conta e aproveite o Bar da Amizade.
                    </p>

                    <form className="cadastro-form">

                        <div className="cadastro-field">
                            <label htmlFor="nome">Nome de usuário</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome de usuário"
                                required
                            />
                        </div>

                        <div className="cadastro-field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </div>

                        <div className="cadastro-field">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                type="tel"
                                id="telefone"
                                name="telefone"
                                placeholder="(00) 00000-0000"
                                required
                            />
                        </div>

                        <div className="cadastro-field">
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                placeholder="Rua, número e bairro"
                                required
                            />
                        </div>

                        <div className="cadastro-field">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Crie uma senha"
                                required
                            />
                        </div>

                        <button type="submit" className="cadastro-button">
                            CRIAR CONTA
                        </button>

                    </form>

                    <p className="cadastro-login">
                        Já tem uma conta?{" "}
                        <a href="/login">Entrar</a>
                    </p>

                    <button
                        type="button"
                        className="cadastro-voltar"
                        onClick={() => navigate("/")}
                    >
                        Voltar para o início
                    </button>

                </section>
            </main>
        </div>
    );
}