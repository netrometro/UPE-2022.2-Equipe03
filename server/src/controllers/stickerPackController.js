import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async createCompraPac(req, res) {
        try {
          const { email } = req.body;
      
          const value = await prisma.pacotefig.findUnique({
            where: { pacId: 1 },
            select: {price: true},
          });
          let userId = await prisma.usuario.findUnique({
            where: { email },
            select: { userId: true },
          });
          let usuario = await prisma.usuario.findUnique({ where: { email } });
      
          if (value.price > usuario.money) {
            return res.json(false);
          }
      
          const createPacProd = async ( invId) => {
            const pp = await prisma.pac_product.create({
              data: { invId },
            });
      
            return pp;
          };
      
          const invt = await prisma.inventario.findUnique({
            where: { userId: userId.userId },
          });
      
          const ngp = await createPacProd(invt.invId);
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
      async findAllpackages(req, res) {
        try {
          const packages = await prisma.pacotefig.findMany();
          return res.json(packages);
        } catch (error) {
          return res.json({ error });
        }
      },  
    };