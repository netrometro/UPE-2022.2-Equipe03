-- DropForeignKey
ALTER TABLE "gaturinha_product" DROP CONSTRAINT "gaturinha_product_invId_fkey";

-- AlterTable
ALTER TABLE "gaturinha_product" ADD COLUMN     "albumId" INTEGER,
ALTER COLUMN "invId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "album" (
    "albumId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("albumId")
);

-- CreateIndex
CREATE UNIQUE INDEX "album_userId_key" ON "album"("userId");

-- AddForeignKey
ALTER TABLE "gaturinha_product" ADD CONSTRAINT "gaturinha_product_invId_fkey" FOREIGN KEY ("invId") REFERENCES "inventario"("invId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gaturinha_product" ADD CONSTRAINT "gaturinha_product_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("albumId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
