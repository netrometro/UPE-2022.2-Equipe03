import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createAlbum(req: any, res: any) {
    try {
      const { userId } = req.body;
      let album = await prisma.album.findUnique({
        where: { userId: Number(userId) },
      });
      if (album) {
        return res.json({ error: "album já existe" });
      } else {
        album = await prisma.album.create({
          data: { userId: Number(userId) },
        });
        return res.json(true);
      }
    } catch (error) {
      return res.json({ error });
    }
  },
  async findAlbum(req: any, res: any) {
    try {
      const { userId } = req.params;

      const album = await prisma.album.findUnique({
        where: { userId: Number(userId) },
        include: {
          gat_prod: {
            include: {
              gat: {
                select: {
                  name: true,
                  image: true,
                  type: true,
                  desc: true,
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

      return res.json({ result: true, gaturinhas });
    } catch (error) {
      return res.json({ error });
    }
  },

  async sellAlbum(req: any, res: any) {
    try {
      const { userId } = req.body;
      const album = await prisma.album.findUnique({
        where: { userId: Number(userId) },
        select: { albumId: true, price: true },
      });
      console.log(album);

      if (!album) {
        return res.json({ error: "album não encontrado" });
      }

      const countGaturinhasAlbum = await prisma.gaturinha_product.count({
        where: { albumId: Number(album.albumId) },
      });
      const allGaturinhas = await prisma.gaturinha.count();
      let money = await prisma.usuario.findUnique({
        where: { userId: Number(userId) },
      });
      const price = Number(album.price);
      console.log(price)
      console.log(countGaturinhasAlbum);
      console.log(allGaturinhas);
      console.log(money);

      if (countGaturinhasAlbum === 0) {
        return res.json({ error: "Você não pode vender um album vazio" });
      } else if (countGaturinhasAlbum >= allGaturinhas * 0.9) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.8 &&
        countGaturinhasAlbum < allGaturinhas * 0.9
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.8) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.7 &&
        countGaturinhasAlbum < allGaturinhas * 0.8
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.7) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.6 &&
        countGaturinhasAlbum < allGaturinhas * 0.7
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.6) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.5 &&
        countGaturinhasAlbum < allGaturinhas * 0.6
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.5) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.4 &&
        countGaturinhasAlbum < allGaturinhas * 0.5
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.4) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.3 &&
        countGaturinhasAlbum < allGaturinhas * 0.4
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.3) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.2 &&
        countGaturinhasAlbum < allGaturinhas * 0.3
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.2) },
          },
        });
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.1 &&
        countGaturinhasAlbum < allGaturinhas * 0.2
      ) {
        money = await prisma.usuario.update({
          where: { userId: Number(userId) },
          data: {
            money: { increment: Number(price * 0.1) },
          },
        });
      } else {
        return res.json({ msg: "Gaturinhas insuficientes para vender" });
      }

      console.log(money);

      await prisma.album.delete({ where: { albumId: Number(album.albumId) } });

      return res.json(true);
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
  async feedCats(req: any, res: any) {
    try {
      const { userId } = req.params;
      let album = await prisma.album.findUnique({
        where: { userId: Number(userId) },
        select: { albumId: true},
      });
      console.log(album);

      if (!album) {
        return res.json({ error: "album não encontrado" });
      }

      const countGaturinhasAlbum = await prisma.gaturinha_product.count({
        where: { albumId: Number(album.albumId) },
      });
      const allGaturinhas = await prisma.gaturinha.count();

      const catEnjoyed = async (userId: any, percent: any) =>{
        const price = await prisma.album.update({
          where: { userId: Number(userId) },
          data: {
            price: { increment: (200 * percent) },
          },
        });

        return price
      }

      console.log(countGaturinhasAlbum);
      console.log(allGaturinhas);

      if (countGaturinhasAlbum === 0) {
        return res.json({ error: "Não há gatinhos para alimentar" });
      } else if (countGaturinhasAlbum >= allGaturinhas * 0.9) {
        const albumEnjoyed = catEnjoyed (userId, 1);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.8 &&
        countGaturinhasAlbum < allGaturinhas * 0.9
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.8);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.7 &&
        countGaturinhasAlbum < allGaturinhas * 0.8
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.7);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.6 &&
        countGaturinhasAlbum < allGaturinhas * 0.7
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.6);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.5 &&
        countGaturinhasAlbum < allGaturinhas * 0.6
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.5);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.4 &&
        countGaturinhasAlbum < allGaturinhas * 0.5
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.4);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.3 &&
        countGaturinhasAlbum < allGaturinhas * 0.4
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.3);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.2 &&
        countGaturinhasAlbum < allGaturinhas * 0.3
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.2);
      } else if (
        countGaturinhasAlbum >= allGaturinhas * 0.1 &&
        countGaturinhasAlbum < allGaturinhas * 0.2
      ) {
        const albumEnjoyed = catEnjoyed (userId, 0.1);
      } else {
        return res.json(false);
      }

      album = await prisma.album.findUnique({
        where: { userId: Number(userId) },
        select: { albumId: true},
      });

      console.log(album);

      return res.json(true);
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },

  async updateLastClick(req: any, res: any) {
    try {
      const { catFed } = req.body;
      const { userId } = req.params;

      let updateclick = await prisma.album.update({
        where: { userId: Number(userId) },
        data: { catFed },
      });

      return res.json(true);
    } catch (error) {
      return res.json({ error: false });
    }
  },

  async lastClick(req: any, res: any) {
    try {
      const { userId } = req.params;

      let catfed = await prisma.album.findUnique({
        where: {
          userId: Number(userId),
        },
        select: {
          catFed: true,
        },
      });
      return res.json(catfed);
    } catch (error) {
      return res.json({ error: false });
    }
  },

  async stick (req: any, res: any) {
    try {
      const {userId} = req.params;
      const {prodId} = req.body;

      const gatProd = await prisma.gaturinha_product.findUnique({
        where: { prodId: Number(prodId) },  // Procurar pelo prodId
        select: { gatId: true },  // Seleciona apenas o gatId
      });
      
      if (!gatProd) {
        return res.json({ error: "Produto não encontrado" });
      }
      
      const { gatId } = gatProd;

      const albumid = await prisma.album.findUnique({
        where: { userId: Number(userId)}
      })

      if (!albumid) {
        return res.json({ error: "album não encontrado" });
      }

      const gaturinhaAlbum = await prisma.gaturinha_product.findFirst({
        where: {
          gatId: Number(gatId),
          albumId: albumid.albumId,
        },
      });
  
      if (gaturinhaAlbum) {
        return res.json({ error: "Você já colou uma figurinha igual!" });
      }

      const gaturinha = await prisma.gaturinha_product.update({
        where: { prodId: Number(prodId) },
        data: {
          invId: null,
          albumId: albumid.albumId,
        },
      });

      return res.json(true)
    } catch (error) {
      console.log(error)
      return res.json(false)
    }
  }
};
