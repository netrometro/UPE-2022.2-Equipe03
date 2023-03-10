import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async findInv(req, res) {
        try {
          const { invId } = req.params;
    
          const inventario = await prisma.inventario.findUnique({
            where: { invId: Number(invId) },
          });
    
          if (!inventario) {
            return res.json({ error: "inventario não encontrado" });
          }
    
          const gaturinhas = await prisma.gaturinha_product.findMany({ where: {invId: Number (invId)},
        select: {gatId: true}})

          return res.json(gaturinhas);
        } catch (error) {
          return res.json({ error });
        }
      },
}