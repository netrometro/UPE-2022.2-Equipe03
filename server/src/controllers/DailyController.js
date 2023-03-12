import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default{
    //função de atualizar quantidade de moedas na carteira
    async updateMoney(req, res){
        try{
            const {userId} = req.params;

            //conferir click
            const {verifyClick} = await prisma.usuario.findUnique({
                where:{
                    click: (click),
                },

            })

            //check hour
            const {checkhour} = await prisma.usuario.findUnique({
                if(click){
                    
                }

            })
            
            //update money

            const updateMoney = await prisma.usuario.update({
                where: {
                    userId: Number(userId),
                    data: {
                        money:{
                            increment: 10,
                        }
                    }

                }
            })
            
    } 
    catch (error) {
      console.error(error); 
      return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}