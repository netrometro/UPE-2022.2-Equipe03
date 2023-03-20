import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
        async findRepeated(req, res) {
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
                        price: true
                      }
                    }
                  }
                }
              }
            });
      
            if (!inventario) {
              return res.json({ error: "inventario não encontrado" });
            }
      
            
            const gaturinhasGrouped = inventario.gat_prod.reduce((acc, gp) => {
              const { gatId, gat } = gp;
              const index = acc.findIndex((item) => item.gatId === gatId);
              if (index !== -1) {
                acc[index].amount++;
              } else {
                acc.push({ amount: 1, gatId, ...gat });
              }
              return acc;
            }, []);
            
            const filteredGaturinhas = gaturinhasGrouped.filter((gaturinha) => gaturinha.amount >= 5);

            return res.json(filteredGaturinhas);
          } catch (error) {
            return res.json({ error });
          }
        },
      };





