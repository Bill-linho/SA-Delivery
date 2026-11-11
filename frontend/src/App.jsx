import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Menu from "./pages/menu";
import Carrinho from "./pages/carrinho";
import Pagamento from "./pages/pagamento";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/pagamento" element={<Pagamento />} />
    </Routes>
  );
}

export default App;