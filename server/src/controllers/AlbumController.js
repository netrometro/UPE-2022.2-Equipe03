import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createAlbum(req, res) {
    try {
      const { userId } = req.body;
      let album = await prisma.album.findUnique({
        where: { userId: Number(userId)},
      });
      if (album) {
        return res.json({ error: "album já existe" });
      } else {

        album = await prisma.album.create({
        data: { userId: Number(userId)},
        });
        return res.json(true)
      }
      } catch (error) {
        return res.json({ error });
      }
    },
  async findAlbum(req, res) {
    try {
      const { userId } = req.params;

      const album = await prisma.album.findUnique({
        where: { userId: Number(userId) },
        include: {
          gat_prod: {
            include: {
              gat: {
                select: {
                  gatId: true,
                  name: true,
                  image: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      if (!album) {
        return res.json(false);
      }

      const gaturinhas = album.gat_prod.map((gp) => gp.gat);

      return res.json({result: true, gaturinhas});
    } catch (error) {
      return res.json({ error });
    }
  },

 async sellAlbum(req, res) {
   try {
     const { userId } = req.params;
     const album = await prisma.album.findUnique({
       where: { userId: Number(userId) }, include: {album: {select: {albumId: true}}}
      });

     const countGaturinhasAlbum = await prisma.gaturinha_product.count({ where: { albumId: Number(album.albumId)}})
     const allGatruinhas = await prisma.gaturinha.count()
     let money = await prisma.usuario.findUnique({where: {userId: Number(userId)}, })
     const price = 10000

     if (!album) {
       return res.json({ error: "album não encontrado" });
     }

     if(countGaturinhasAlbum === 0 ){
      return res.json({error: "Você não pode vender um album vazio"})
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.10)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.10) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.20)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.20) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.30)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.30) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.40)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.40) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.50)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.50) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.60)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.60) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.70)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.70) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.80)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.80) },
        }
      });
     } else if (countGaturinhasAlbum <= (allGatruinhas*0.90)){
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price*0.90) },
        }
      });
     } else {
      money = await prisma.usuario.update({
        where: { userId: Number(userId) },
        data: {
          money: { increment: Number(price) },
        }
      });
     }

     await prisma.album.delete({ where: { albumId: Number(album.albumId) } });

     return res.json({ menssage: "album vendido!" });
   } catch (error) {
     return res.json({ error });
   }
 },
};
