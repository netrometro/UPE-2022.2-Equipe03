-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_userId_fkey";

-- DropForeignKey
ALTER TABLE "gaturinha_product" DROP CONSTRAINT "gaturinha_product_gatId_fkey";

-- DropForeignKey
ALTER TABLE "inventario" DROP CONSTRAINT "inventario_userId_fkey";

-- AddForeignKey
ALTER TABLE "gaturinha_product" ADD CONSTRAINT "gaturinha_product_gatId_fkey" FOREIGN KEY ("gatId") REFERENCES "gaturinha"("gatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
