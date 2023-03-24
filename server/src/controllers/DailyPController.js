import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  //função de adicionar pacote de cartas ao inventário
  async getPackage(req, res) {
    try {
      const { invId } = req.params;

      let inventario = await prisma.inventario.findUnique({
        where: { invId: Number(invId) },
      });

      if (!inventario) {
        return res.json({ error: "inventário indisponível" });
      }

      const createPacProd = async (invId) => {
        const pp = await prisma.pac_product.create({
          data: { invId: Number(invId) },
        });

        return pp;
      };

      const npp = await createPacProd(invId);

      return res.json(npp);
    } catch {
      console.error({ error: "Erro interno do servidor" });
    }
  },

  async updateLastClick(req, res) {
    try {
      const { clickb } = req.body;
      const { userId } = req.params;

      let updateclick = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: { clickb },
      });

      return res.json(true);
    } catch (error) {
      return res.json({ error: false });
    }
  },

  async lastClick(req, res) {
    try {
      const { userId } = req.params;

      let clickb = await prisma.usuario.findUnique({
        where: {
          userId: Number(userId),
        },
        select: {
          clickb: true,
        },
      });
      return res.json(clickb);
    } catch (error) {
      return res.json({ error: false });
    }
  },
};
