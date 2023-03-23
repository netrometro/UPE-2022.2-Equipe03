-- AlterTable
ALTER TABLE "pac_product" ALTER COLUMN "gatId1" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId2" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId3" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId4" SET DEFAULT floor(random() * 20 + 1),
ALTER COLUMN "gatId5" SET DEFAULT floor(random() * 20 + 1);

-- CreateTable
CREATE TABLE "userDaily" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "packDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userDaily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userDaily_userId_date_packDate_key" ON "userDaily"("userId", "date", "packDate");
