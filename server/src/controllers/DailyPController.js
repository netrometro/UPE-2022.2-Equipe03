import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    //função de adicionar pacote de cartas ao inventário
    async getPackage(req,res) {
        try{
            const { invId } = req.params;
            const { pac_product} = req.body;

            let inventario= await prisma.inventario.findUnique ({
                where: { invId: Number(invId)}
            });

            if (!inventario){
            return res.json({ error: "inventário indisponível"});
        }
        const today = new Date();
        const lastUpdate = new Date(usuario.lastPackUpdate);
    
        if (
          lastUpdate.getDate() === today.getDate() &&
          lastUpdate.getMonth() === today.getMonth() &&
          lastUpdate.getFullYear() === today.getFullYear()
        ) {
          return res.json(usuario);
        }

        inventario = await prisma.inventario.update({
            where: { invId: Number(invId)},
            data: { pac_product: {increment: (pac_product)},
            lastMoneyUpdate: today.toISOString().substring(0, 10), 
        },
        });

        return res.json(inventario);
    }catch{
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });

        }
    }
}