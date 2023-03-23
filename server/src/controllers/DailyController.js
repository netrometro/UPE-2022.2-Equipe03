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
      const today = new Date();
    const lastUpdate = new Date(usuario.lastMoneyUpdate);

    if (
      lastUpdate.getDate() === today.getDate() &&
      lastUpdate.getMonth() === today.getMonth() &&
      lastUpdate.getFullYear() === today.getFullYear()
    ) {
      return res.json(usuario);
    }

    usuario = await prisma.usuario.update({
      where: { userId: Number(userId) },
      data: {
        money: { increment: Number(money) },
        lastMoneyUpdate: today.toISOString().substring(0, 10),
      },
    });

      return res.json(usuario);
    } catch {
      return res.json({ error: "Erro no sistema" });
    }
  },
};
