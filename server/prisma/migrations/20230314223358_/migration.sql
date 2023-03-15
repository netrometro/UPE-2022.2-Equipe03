-- DropForeignKey
ALTER TABLE "gaturinha_product" DROP CONSTRAINT "gaturinha_product_albumId_fkey";

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "click" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "gaturinha_product" ADD CONSTRAINT "gaturinha_product_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;
