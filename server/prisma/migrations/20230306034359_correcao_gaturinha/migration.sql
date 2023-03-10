/*
  Warnings:

  - Added the required column `price` to the `gaturinha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gaturinha" ADD COLUMN     "price" INTEGER NOT NULL;
