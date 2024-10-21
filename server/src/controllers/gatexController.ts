import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async findAllgaturinhas(req: any, res: any) {
        try {
          const gaturinhas = await prisma.gaturinha.findMany();
          return res.json(gaturinhas);
        } catch (error) {
          return res.json({ error });
        }
      },
    }