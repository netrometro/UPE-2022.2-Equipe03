import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async findAlbum(req, res) {
        try {
          const { albumId } = req.params;
    
          const album = await prisma.album.findUnique({
            where: { invId: Number(albumId) },
            include: {
              gat_prod: {
                include: {
                  gat: {
                    select: {
                      gatId: true,
                      name: true,
                      image: true,
                      price: true
                    }
                  }
                }
              }
            }
          });
    
          if (!album) {
            return res.json({ error: "album não encontrado" });
          }
    
          const gaturinhas = album.gat_prod.map((gp) => gp.gat);
    
          return res.json(gaturinhas);
        } catch (error) {
          return res.json({ error });
        }
      },
}