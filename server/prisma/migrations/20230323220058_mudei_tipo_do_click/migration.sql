-- AlterTable
ALTER TABLE "pac_product" ALTER COLUMN "gatId1" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId2" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId3" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId4" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId5" SET DEFAULT floor(random() * 20 + 1);

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "click" SET DATA TYPE TEXT;
