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

  // async sellAlbum(req, res) {
  //   try {
  //     const { userId } = req.params;
  //     const album = await prisma.album.findUnique({
  //       where: { userId: Number(userId) },
  //     });

  //     if (!album) {
  //       return res.json({ error: "album não encontrado" });
  //     }

  //     const gaturinhas = album.gat_prod.map((gp) => gp.gat);
  //     await prisma.album.delete({ where: { albumId: Number(album.albumId) } });

  //     return res.json({ menssage: "album vendido!" });
  //   } catch (error) {
  //     return res.json({ error });
  //   }
  // },
};
