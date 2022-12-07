-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Suppreadmin', 'User');

-- CreateTable
CREATE TABLE "Users" (
    "userID" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "U_email" TEXT NOT NULL,
    "U_password" TEXT NOT NULL,
    "U_phone" TEXT NOT NULL,
    "U_Address" TEXT NOT NULL,
    "JiondAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Role" "Roles" NOT NULL DEFAULT 'User',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_Id" SERIAL NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "shipping_price" DOUBLE PRECISION NOT NULL,
    "items_price" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_Id")
);

-- CreateTable
CREATE TABLE "Product" (
    "pro_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "stockQty" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("pro_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_ID" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_ID")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "Rev_ID" SERIAL NOT NULL,
    "Userid" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "cratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("Rev_ID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "Cart_ID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Pro_ID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("Cart_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_U_email_key" ON "Users"("U_email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_U_phone_key" ON "Users"("U_phone");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_Userid_fkey" FOREIGN KEY ("Userid") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_Pro_ID_fkey" FOREIGN KEY ("Pro_ID") REFERENCES "Product"("pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
