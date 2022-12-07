/*
  Warnings:

  - You are about to drop the column `desc` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `customerAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_price` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "desc",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerAddress",
DROP COLUMN "shipping_price",
ADD COLUMN     "delivery_price" DOUBLE PRECISION NOT NULL;
