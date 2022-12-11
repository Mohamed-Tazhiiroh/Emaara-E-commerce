/*
  Warnings:

  - Added the required column `U_Address` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "U_Address" TEXT NOT NULL;
