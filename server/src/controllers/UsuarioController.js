import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Funções para a tabela usuário

//Criar usuário
export default {
  async createUsuario(req, res) {
    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 8);

      let usuario = await prisma.usuario.findUnique({ where: { email } });

      if (usuario) {
        return res.json({ error: "já existe usuário com essas credenciais" });
      }

      usuario = await prisma.usuario.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const createInv = async (userId) => {
        const inv = await prisma.inventario.create({data: {userId: Number(userId),},});
      
        return inv;
      };

      const id = usuario.userId
      const invent = createInv(id)

      usuario = await prisma.usuario.update({
        where: { userId: Number(id) },
        data: {invent},
      });

      const token = jwt.sign(
        { userId: usuario.userId },
        process.env.JWT_SECRET
      );
      
      return res.json({ msg: "Cadastrado!" });

      res.json({ usuario, token });
    } catch (error) {
      return res.json({ error });
    }
  },

  //Achar todos os usuários
  async findAllUsuarios(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res.json({ error });
    }
  },

  // Login de usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const usuario = await prisma.usuario.findUnique({ where: { email } });
      const invId = await prisma.inventario.findUnique({where: { userId: usuario.userId} })

      if (!usuario) {
        return res.json({ error: "usuário não encontrado" });
      }

      const comparaSenha = await bcrypt.compare(password, usuario.password);

      if (!comparaSenha) {
        return res.json({ error: "senha incorreta" });
      }

      const token = jwt.sign(
        { userId: usuario.userId },
        process.env.JWT_SECRET
      );

      res.json({ result: comparaSenha, email: email, userId: usuario.userId, invId: invId.invId});
    } catch (error) {
      return res.json({ error: "Usuário não encontrado" });
    }
  },

  // Achar um único usuário
  async findUsuario(req, res) {
    try {
      const { userId } = req.params;

      const usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "usuario não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.json({ error });
    }
  },

  //Atualizar informações do usuário
  async updateUsuario(req, res) {
    try {
      const { userId } = req.params;
      const { name, email, password, money } = req.body;

      let usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "usuario não encontrado" });
      }

      usuario = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: { name, email, password, money },
      });

      return res.json(usuario);
    } catch {
      return res.json({ error });
    }
  },

  // Deletar usuário
  async deleteUsuario(req, res) {
    try {
      const { userId } = req.params;
      const usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "usuario não encontrado" });
      }

      await prisma.usuario.delete({ where: { userId: Number(userId) } });

      return res.json({ menssage: "usuario deletado!" });
    } catch (error) {
      return res.json({ error });
    }
  },
  async findMoney(req, res) {
    try {
      const { userId } = req.params;

      const usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
        select: { money: true },
      });

      if (!usuario) {
        return res.json({ error: "usuario não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.json({ error });
    }
  },
};
