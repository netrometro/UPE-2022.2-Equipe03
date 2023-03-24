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
      data: {
        money: { increment: Number(money) },
      }
    });

      return res.json(usuario);
    } catch {
      return res.json({ error: error });
    }
  },

  async updateLastClick(req, res){
    try{
      const {click} = req.body;
      const {userId} = req.params;
      
      let updateclick = await prisma.usuario.update({
        where: { userId: Number(userId)
        }, data: {click}
      })

      return res.json(true)
    }catch(error){
      return res.json({error: false})
    }
  },
  
  async lastClick(req, res){
    try{
      const {userId} = req.params;

      let click = await prisma.usuario.findUnique({
        where:{
          userId: Number(userId)
        }, select: {
          click: true
        }

      })
      return res.json(click)
    }
    catch(error){
      return res.json({error: false})
    }
  }
};