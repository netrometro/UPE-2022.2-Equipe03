/*
  Warnings:

  - You are about to drop the column `catFeded` on the `album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "album" DROP COLUMN "catFeded",
ADD COLUMN     "catFed" TEXT;

-- AlterTable
ALTER TABLE "pac_product" ALTER COLUMN "gatId1" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId2" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId3" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId4" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId5" SET DEFAULT floor(random() * 20 + 1);
