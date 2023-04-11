/*
  Warnings:

  - Made the column `type` on table `gaturinha` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gaturinha" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "pac_product" ALTER COLUMN "gatId1" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId2" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId3" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId4" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId5" SET DEFAULT floor(random() * 20 + 1);
