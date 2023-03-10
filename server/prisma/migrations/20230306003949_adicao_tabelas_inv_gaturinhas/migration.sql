/*
  Warnings:

  - The primary key for the `gaturinha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `gaturinha` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gaturinha" DROP CONSTRAINT "gaturinha_pkey",
DROP COLUMN "id",
ADD COLUMN     "gatId" SERIAL NOT NULL,
ADD CONSTRAINT "gaturinha_pkey" PRIMARY KEY ("gatId");

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "money" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "gaturinha_product" (
    "prodId" SERIAL NOT NULL,
    "gatId" INTEGER NOT NULL,
    "invId" INTEGER NOT NULL,

    CONSTRAINT "gaturinha_product_pkey" PRIMARY KEY ("prodId")
);

-- CreateTable
CREATE TABLE "inventario" (
    "invId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("invId")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventario_userId_key" ON "inventario"("userId");

-- AddForeignKey
ALTER TABLE "gaturinha_product" ADD CONSTRAINT "gaturinha_product_gatId_fkey" FOREIGN KEY ("gatId") REFERENCES "gaturinha"("gatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gaturinha_product" ADD CONSTRAINT "gaturinha_product_invId_fkey" FOREIGN KEY ("invId") REFERENCES "inventario"("invId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
