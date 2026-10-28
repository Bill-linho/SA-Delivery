
import Cliente from "../models/cliente.js";

export async function cadastrar(req, res) {
  try {
    const { nome, telefone, endereco, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Preencha nome, email e senha.",
      });
    }

    const existente = await Cliente.findOne({
      where: { email },
    });

    if (existente) {
      return res.status(409).json({
        mensagem: "Email já cadastrado.",
      });
    }

    const cliente = await Cliente.create({
      nome,
      telefone,
      endereco,
      email,
      senha,
    });

    return res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso!",
      cliente: {
        id_cliente: cliente.id_cliente,
        nome: cliente.nome,
        email: cliente.email,
      },
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao cadastrar cliente.",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Informe email e senha.",
      });
    }

    const cliente = await Cliente.findOne({
      where: { email, senha },
    });

    if (!cliente) {
      return res.status(401).json({
        mensagem: "Email ou senha incorretos.",
      });
    }

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      cliente: {
        id_cliente: cliente.id_cliente,
        nome: cliente.nome,
        email: cliente.email,
      },
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro ao realizar login.",
    });
  }
}
