import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  //função de adicionar pacote de cartas ao inventário
  async getPackage(req: any, res: any) {
    try {
      const { invId } = req.params;

      let inventario = await prisma.inventario.findUnique({
        where: { invId: Number(invId) },
      });

      if (!inventario) {
        return res.json({ error: "inventário indisponível" });
      }

      const allGaturinhas = await prisma.gaturinha.count();

      let gatIdsArray = [];

      for (let i = 0; i < 5; i++) {
        gatIdsArray.push(Math.floor(Math.random() * allGaturinhas) + 1);
      }

      const createPacProd = async (invId: any, Array: any) => {
        const pp = await prisma.pac_product.create({
          data: { invId, gatId1: Array[0], gatId2: Array[1], gatId3: Array[2], gatId4: Array[3], gatId5: Array[4]},
        });

        return pp;
      };

      const npp = await createPacProd(Number(invId), gatIdsArray);

      return res.json(npp);
    } catch (error) {
      console.log(error)
      console.error({ error: "Erro interno do servidor" });
    }
  },

  async updateLastClick(req: any, res: any) {
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

  async lastClick(req: any, res: any) {
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
