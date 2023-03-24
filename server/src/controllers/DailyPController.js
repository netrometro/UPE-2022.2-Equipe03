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

        inventario = await prisma.inventario.update({
            where: { invId: Number(invId)},
            data: { pac_product: {increment: (pac_product)},
        }
        });

        return res.json(inventario);
    }catch{
        console.error({error: "Erro interno do servidor"});

        }
    }
}