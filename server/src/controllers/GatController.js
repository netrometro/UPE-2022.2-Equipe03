import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createGaturinha(req, res) {
    try {
      const { userId } = req.params;
      const { name, image, price, type, desc } = req.body;
  
      const gat = await prisma.gaturinha.findUnique({ where: { image } });
      if (gat) {
        return res.json({ error: "já existe essa gaturinha" });
      }
  
      const usuario = await prisma.usuario.findUnique({ where: { userId: Number(userId) } });
      if (!usuario) {
        return res.json({ error: "usuário não encontrado" });
      }
  
      let newMoney;
      if (type === "Common" && usuario.money >= 20) {
        newMoney = usuario.money - 20;
      } else if (type === "Rare" && usuario.money >= 100) {
        newMoney = usuario.money - 100;
      } else if (type === "Epic" && usuario.money >= 150) {
        newMoney = usuario.money - 150;
      } else if (type === "Legendary" && usuario.money >= 500) {
        newMoney = usuario.money - 500;
      } else {
        return res.json( false );
      }
  
      const updatedUsuario = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: { money: newMoney },
      });
  
      const createdGat = await prisma.gaturinha.create({
        data: {
          name,
          image,
          price,
          type,
          desc,
        },
      });
  
      return res.json({ msg: "Gaturinha Criada" });
    } catch (error) {
      console.error(error);
      return res.json({ error });
    }
  },

  async createCompra(req, res) {
    try {
      const { gatId, email } = req.body;
  
      const value = await prisma.gaturinha.findUnique({
        where: { gatId },
        select: {price: true},
      });
      let invent = await prisma.usuario.findUnique({
        where: { email },
        select: { userId: true },
      });
      let usuario = await prisma.usuario.findUnique({ where: { email } });
  
      if (value.price > usuario.money) {
        return res.json(false);
      }
  
      const createGatProd = async (gatId, invId) => {
        const gp = await prisma.gaturinha_product.create({
          data: { gatId, invId },
        });
  
        return gp;
      };
  
      const invt = await prisma.inventario.findUnique({
        where: { userId: invent.userId },
      });
  
      const ngp = await createGatProd(gatId, invt.invId);
      const newMoney = usuario.money - value.price;
  
      usuario = await prisma.usuario.update({
        where: { email },
        data: { money: newMoney },
      });
  
      res.json(true);
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },  
};
