-- CreateEnum
CREATE TYPE "STATES" AS ENUM ('Somaliland', 'Somalia');

-- CreateEnum
CREATE TYPE "Cities" AS ENUM ('Hargeisa', 'Borama', 'Berbera');

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Products" (
    "prodId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prodName" TEXT NOT NULL,
    "prodPrice" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("prodId")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stockId" SERIAL NOT NULL,
    "stockName" TEXT NOT NULL,
    "adrress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateTable
CREATE TABLE "Carts" (
    "cartId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "prodId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "Order_Item" (
    "o_ItemId" SERIAL NOT NULL,
    "prodId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "ordredTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_Item_pkey" PRIMARY KEY ("o_ItemId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ordredTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressVilage" TEXT NOT NULL,
    "addressCity" "Cities" NOT NULL DEFAULT 'Hargeisa',
    "addressCountry" "STATES" NOT NULL DEFAULT 'Somaliland',

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
