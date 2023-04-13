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

  async sellGat(req, res) {
    // o try tenta executar algo.
    try {
      // necessario: pegar o id da gaturinha, deletar ela pelo id e devolver o dinheiro pra conta.
      const {userId} = req.params; //pega o id do usuario (atraves do link)
      const {prodId} = req.body; //pega o id da gaturinha product (atraves de resposta do front-end)
      let usuario = await prisma.usuario.findUnique({
        where: {userId: Number(userId),}
      });

            if (!usuario) {
        return res.json({ error: "Usuário não encontrado" });
      }
      let gaturinha = await prisma.gaturinha_product.findUnique({
        where: {prodId: Number(prodId)},
        include: {gat: {select: {price: true}}}
    });

    usuario = await prisma.usuario.update({
      where: {userId: Number(userId)},
      data: {money: {increment: Number(gaturinha.gat.price*0.3)}}
    });

    gaturinha = await prisma.gaturinha_product.delete({
      where: {prodId: Number(prodId)}
    });

    return res.json(true);
    } // se o try nao conseguir executar, o catch pega o erro.
    catch (error) {
      return res.json({ error });
    }
  }
};
