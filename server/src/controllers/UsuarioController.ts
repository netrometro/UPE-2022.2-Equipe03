import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Funções para a tabela usuário

const prisma = new PrismaClient();

// Funções para a tabela usuário
export default {
  // Criar usuário
  async createUsuario(req: any, res: any) {
    try {
      const { email, password } = req.body;

      // Criptografar senha
      const hashedPassword = await bcrypt.hash(password, 8);

      // Verificar se o usuário já existe
      let usuario = await prisma.usuario.findUnique({ where: { email } });

      if (usuario) {
        return res.json({ error: "Já existe usuário com essas credenciais" });
      }

      // Criar novo usuário
      usuario = await prisma.usuario.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // Criar inventário para o usuário recém-criado
      const id = usuario.userId;
      const inv = await createInv(id); // Função assíncrona para criar inventário

      // Atualizar o usuário com o inventário criado
      usuario = await prisma.usuario.update({
        where: { userId: Number(id) },
        data: { inv: { connect: { invId: inv.invId } } }, // Conectar o inventário criado
      });

      // Criar token JWT
      const token = jwt.sign(
        { userId: usuario.userId },
        process.env.JWT_SECRET
      );

      // Retornar resposta de sucesso com o usuário e o token
      return res.json({ usuario, token, msg: "Cadastrado com sucesso!" });
    } catch (error) {
      return res.json({ error });
    }
  },

  // Achar todos os usuários
  async findAllUsuarios(req: any, res: any) {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res.json({ error });
    }
  },

  // Login de usuário
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;

      // Verificar se o usuário existe
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) {
        return res.json({ error: "Usuário não encontrado" });
      }

      // Verificar se o inventário existe
      const invId = await prisma.inventario.findUnique({ where: { userId: usuario.userId } });
      if (!invId) {
        return res.json({ error: "Inventário não encontrado" });
      }

      // Comparar senhas
      const comparaSenha = await bcrypt.compare(password, usuario.password);
      if (!comparaSenha) {
        return res.json({ error: "Senha incorreta" });
      }

      // Criar token JWT
      const token = jwt.sign(
        { userId: usuario.userId },
        process.env.JWT_SECRET
      );

      res.json({ result: comparaSenha, email: email, userId: usuario.userId, invId: invId.invId });
    } catch (error) {
      return res.json({ error: "Erro ao fazer login" });
    }
  },

  // Achar um único usuário
  async findUsuario(req: any, res: any) {
    try {
      const { userId } = req.params;

      const usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.json({ error });
    }
  },

  // Atualizar informações do usuário
  async updateUsuario(req: any, res: any) {
    try {
      const { userId } = req.params;
      const { name, email, password } = req.body;

      let usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "Usuário não encontrado" });
      }

      usuario = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: { name, email, password },
      });

      return res.json(usuario);
    } catch (error) {
      return res.json({ error });
    }
  },

  // Deletar usuário
  async deleteUsuario(req: any, res: any) {
    try {
      const { userId } = req.params;
      const usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "Usuário não encontrado" });
      }

      await prisma.usuario.delete({ where: { userId: Number(userId) } });

      return res.json({ message: "Usuário deletado!" });
    } catch (error) {
      return res.json({ error });
    }
  },

  // Verificar saldo do usuário
  async findMoney(req: any, res: any) {
    try {
      const { userId } = req.params;

      const usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
        select: { money: true },
      });

      if (!usuario) {
        return res.json({ error: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.json({ error });
    }
  },
};

// Função auxiliar para criar o inventário
const createInv = async (userId: number) => {
  const invent = await prisma.inventario.create({
    data: {
      userId: Number(userId),
    },
  });

  return invent;
};