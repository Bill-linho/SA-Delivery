import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Menu from "./pages/menu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;