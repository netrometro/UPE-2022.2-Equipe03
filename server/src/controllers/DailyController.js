import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  //função de atualizar quantidade de moedas na carteira
  async updateMoney(req, res) {
    try {
      const { userId } = req.params;
      const { money } = req.body;

      let usuario = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });

      if (!usuario) {
        return res.json({ error: "usuario não encontrado" });
      }

      usuario = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: { money: {increment: usuario.money + Number(money)}},
      });

      return res.json(usuario);
    } catch {
      return res.json({ error });
    }
  },
};
