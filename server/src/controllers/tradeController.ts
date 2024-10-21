import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async findRepeated(req: any, res: any) {
    try {
      const { invId } = req.params;

      const inventario = await prisma.inventario.findUnique({
        where: { invId: Number(invId) },
        include: {
          gat_prod: {
            include: {
              gat: {
                select: {
                  gatId: true,
                  name: true,
                  image: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      if (!inventario) {
        return res.json({ error: "inventario não encontrado" });
      }

      const gaturinhasGrouped = inventario.gat_prod
        ? inventario.gat_prod.reduce((acc: { gatId: number; name: string; image: string; price: number; amount: number; prodIds: number[]; }[], gp) => {
            const { gatId, gat } = gp;
            const index = acc.findIndex((item) => item.gatId === gatId);
            if (index !== -1) {
              acc[index].amount++;
              acc[index].prodIds.push(gp.prodId);
            } else {
              const { gatId, ...gatWithoutId } = gat;
              acc.push({ amount: 1, gatId, prodIds: [gp.prodId], ...gatWithoutId });
            }
            return acc;
          }, [])
        : [];

      const filteredGaturinhas = gaturinhasGrouped.filter(
        (gaturinha) => gaturinha.amount >= 5
      );

      return res.json(filteredGaturinhas);
    } catch (error) {
      return res.json({ error });
    }
  },
  async tradeCardsRandom(req: any, res: any) {
    try {
      const { prodIds, invId } = req.body;

      if (!prodIds || !Array.isArray(prodIds) || prodIds.length === 0) {
        return res.json({ error: "Array invalido ou vazio" });
      }

      const deletedProducts = await prisma.gaturinha_product.deleteMany({
        where: {
          prodId: { in: prodIds.slice(0, 5) },
        },
      });

      const createGatProd = async (invId: any) => {
        const gatIds = await prisma.gaturinha.findMany({
          select: { gatId: true },
        });
        const randomGatId = gatIds[Math.floor(Math.random() * gatIds.length)].gatId;
        const gp = await prisma.gaturinha_product.create({
          data: { gatId: randomGatId, invId },
        });
        return gp;
      };

      const newGaturinha = await createGatProd(invId);

      return res.json({ success: true, deletedProducts, newGaturinha });
    } catch (error) {
      console.log(error);
      return res.json({ error: "Erro ao excluir ou criar a Gaturinha" });
    }
  },

  async tradeCardsEqual(req: any, res: any) {
    try {
      const { prodIds, invId } = req.body;

      if (!prodIds || !Array.isArray(prodIds) || prodIds.length === 0) {
        return res.json({ error: "Array invalido ou vazio" });
      }

      const rarity = await prisma.gaturinha_product.findUnique({
        where: {
          prodId: Number(prodIds[0]),
        },
        include: {
          gat: {
            select: {
              type: true,
            },
        },
      }});

      const deletedProducts = await prisma.gaturinha_product.deleteMany({
        where: {
          prodId: { in: prodIds.slice(0, 5) },
        },
      });

      const createGatProd = async (invId: any) => {
        let newType = '';

        if (!rarity) {
          return res.json({ error: "Raridade não encontrada" });
        }

        if (rarity.gat.type === 'Common') {
          newType = 'Rare';
        } else if (rarity.gat.type === 'Rare') {
          newType = 'Epic';
        } else if (rarity.gat.type === 'Epic') {
          newType = 'Legendary';
        } else {
          newType = 'ExodianCat';
        }

        const gatIds = await prisma.gaturinha.findMany({
          where: { type: newType },
          select: { gatId: true },
        });

        const randomGatId = gatIds[Math.floor(Math.random() * gatIds.length)].gatId;
        const gp = await prisma.gaturinha_product.create({
          data: { gatId: randomGatId, invId },
        });
        return gp;
      };

      const newGaturinha = await createGatProd(invId);

      return res.json({ success: true, deletedProducts, newGaturinha });
    } catch (error) {
      console.log(error);
      return res.json({ error: "Erro ao excluir ou criar a Gaturinha" });
    }
  },
};
