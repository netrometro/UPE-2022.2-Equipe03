import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createGaturinha(req, res) {
    try {
      const { name, image, price, type } = req.body;

      let gat = await prisma.gaturinha.findUnique({ where: { image } });

      if (gat) {
        return res.json({ error: "já existe essa gaturinha" });
      }

      gat = await prisma.gaturinha.create({
        data: {
          name,
          image,
          price,
          type,
        },
      });

      return res.json({ msg: "Gaturinha Criada" });
    } catch (error) {
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
        return res.json({ msg: "não foi possível realizar a compra" });
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
  
      res.json({ msg: "compra realizada com sucesso"});
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },  
};
