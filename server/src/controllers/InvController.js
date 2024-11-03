import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async findInv(req, res) {
    try {
      const { invId } = req.params;

      const inventario = await prisma.inventario.findUnique({
        where: { invId: Number(invId) },
        include: {
          gat_prod: {
            select: {
              prodId: true,
              gat: {
                select: {
                  name: true,
                  image: true,
                }
              }
            }
          }
        }
      });

      if (!inventario) {
        return res.json({ error: "inventario não encontrado" });
      }

      const gaturinhas = inventario.gat_prod.map((gp) => {
        return {
          prodId: gp.prodId,
          ...gp.gat,
        };
      });

      return res.json(gaturinhas);
    } catch (error) {
      return res.json({ error });
    }
  },
};
