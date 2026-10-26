import Header from "../components/Header"

export default function Login() {
    return (
        <div className="login-page">
            <Header />
            <main className="login-main">
                <section className="login-card">
                    <h1>QUE BOM TER VOCÊ AQUI!</h1>
                    <p className="login-subtitle">
                        Entre na sua conta e aproveite o Bar da Amizade.
                    </p>

                    <form className="login-form">
                        <div className="login-field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>

                        <button type="submit" className="login-button">
                            ENTRAR
                        </button>
                    </form>

                    <p className="login-register">
                        Ainda não tem uma conta? <a href="/cadastro">Criar conta</a>
                    </p>
                </section>
            </main>
        </div>
    );
}