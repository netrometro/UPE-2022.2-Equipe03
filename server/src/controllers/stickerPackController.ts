import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createCompraPac(req: any, res: any) {
    try {
      const { email } = req.body;

      const value = await prisma.pacotefig.findUnique({
        where: { pacId: 1 },
        select: { price: true },
      });
      let userId = await prisma.usuario.findUnique({
        where: { email },
        select: { userId: true },
      });
      let usuario = await prisma.usuario.findUnique({ where: { email } });

      if (!value || !usuario || value.price > usuario.money) {
        return res.json(false);
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

      if (!userId) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const invt = await prisma.inventario.findUnique({
        where: { userId: userId.userId },
      });

      if (!invt) {
        return res.status(404).json({ error: "Inventário não encontrado" });
      }

      const npp = await createPacProd(invt.invId, gatIdsArray);
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
  async findAllpackages(req: any, res: any) {
    try {
      const packages = await prisma.pacotefig.findMany();
      return res.json(packages);
    } catch (error) {
      return res.json({ error });
    }
  },
  async findInv(req: any, res: any) {
    try {
      const { invId } = req.params;

      const inventario = await prisma.inventario.findUnique({
        where: { invId: Number(invId) },
        include: {
          pac_product: {
            select: {
              pacprodId: true,
              pacotefig: {
                select: {
                  pacId: true,
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
      const pacotinho = inventario.pac_product.map((pp) => {
        return {
          pacprodId: pp.pacprodId,
          ...pp.pacotefig,
        };
      });
      return res.json(pacotinho);
    } catch (error) {
      return res.json({ error });
    }
  },
    
  async openPack(req: any, res: any) {
    try {
      const { pacprodId, invId } = req.body;

      const pacProd = await prisma.pac_product.findUnique({
        where: { pacprodId },
      });

      if (!pacProd) {
        return res.json({ error: "Pacote não encontrado" });
      }
    
      const createGatProdFromPac = async (pacProd: any) =>{
        const gatIds = [
        pacProd.gatId1,
        pacProd.gatId2,
        pacProd.gatId3,
        pacProd.gatId4,
        pacProd.gatId5,
        ];

        const gatProds = await prisma.$transaction(
        gatIds.map((gatId) => {
            return prisma.gaturinha_product.create({
              data: { gatId, invId },
            });
          }));
      }

            const newGaturinhas = createGatProdFromPac(pacProd);
          
      await prisma.pac_product.delete({
        where: { pacprodId: pacprodId },
      });
      return res.json(true);
    } catch (error) {
      return res.json({ error });
    }
  },
  async openAllPacks(req: any, res: any) {
    try {
      const { invId } = req.body;
  
      const pacProds = await prisma.pac_product.findMany({
        where: { invId },
      });
  
      const results = await Promise.all(
        pacProds.map(async (pacProd) => {
          const gatIds = [
            pacProd.gatId1,
            pacProd.gatId2,
            pacProd.gatId3,
            pacProd.gatId4,
            pacProd.gatId5,
          ];
  
          const gatProds = await prisma.$transaction(
            gatIds.map((gatId) => {
              return prisma.gaturinha_product.create({
                data: { gatId, invId },
              });
            })
          );
  
          await prisma.pac_product.delete({
            where: { pacprodId: pacProd.pacprodId },
          });
  
          return true;
        })
      );
  
      res.json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }};


