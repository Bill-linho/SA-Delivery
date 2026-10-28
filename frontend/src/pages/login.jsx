import { useNavigate } from "react-router-dom";
import { fazerLogin } from "../services/authService";
import "../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        const formulario = event.target;

        const dados = {
            email: formulario.email.value,
            senha: formulario.password.value,
        };

        try {
            const resposta = await fazerLogin(dados);

            // Salva o token caso o backend retorne um.
            if (resposta.data.token) {
                localStorage.setItem("token", resposta.data.token);
            }

            alert("Login realizado com sucesso!");

            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer login:", error);

            alert(
                error.response?.data?.message ||
                "E-mail ou senha incorretos."
            );
        }
    }

    return (
        <div className="login-page">
            <main className="login-main">
                <section className="login-card">
                    <h1>QUE BOM TER VOCÊ AQUI!</h1>

                    <p className="login-subtitle">
                        Entre na sua conta e aproveite o Bar da Amizade.
                    </p>

                    <form className="login-form" onSubmit={handleLogin}>
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
                        Ainda não tem uma conta?{" "}
                        <a href="/cadastro">Criar conta</a>
                    </p>
                </section>
            </main>
        </div>
    );
}