const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


//----------------- CREATE SHOPING OR ADD TO CART ITEMS--------



 const addToCart = async (req, res) => {
    // const { UserID } = req.user;
    const { Pro_ID } = req.body;
    try {
      const product = await prisma.Product.findFirst({
        where: {
            Pro_ID,
        },
      });
      const existingPro = await prisma.Cart.findFirst({
        where: {
            Pro_ID,
            UserID,
        },
        include: {
            Product: true,
        },
      });
      if (existingPro) {
        const updatedPro = await prisma.Cart.update({
          where: {
            Cart_ID: existingPro.Cart_ID,
          },
          data: {
            Quantity:
              existingPro.Quantity === Product.stockQty
                ? existingPro.Quantity
                : existingPro.Quantity + 1,
          },
          include: {
            Product: true,
          },
        });
        res.json({
          updatedPro,
          productMax: updatedPro.Quantity === Product.stockQty,
          success: true,
        });
      } else {
        const newItem = await prisma.Cart.create({
          data: {
            Pro_ID,
            UserID,
          },
          include: {
            Product: true,
          },
        });
        res.json({ newItem, success: true });
      }
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  };


// -------------------------- GET ALL CART ITEMS----------------------

   const getMyCart = async (req, res) => {
    // const { UserID } = req.user;
    try {
      const myCart = await prisma.Cart.findMany({
        where: {
          // UserID,
        },
        include: {
          Product: true,
        },
      });
      res.json({ success: true, myCart });
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  };


  // ------------------- DELETE ALL CARTS  ---------------------   only for user

   const emptyAllCart = async (req, res) => {
    try {
      const { UserID } = req.user;
      const deleteMyCart = await prisma.Cart.deleteMany({
        where: {
          UserID,
        },
      });
      res.json({
        reset: true,
        deleteMyCart,
        message : "succsesfullly deleted"
      });
    } catch (error) {}
  };


  // ---------------------------------DELETE ON ITEM IN MY CART---------------- FOR ONLY USER


   const deleteItem = async (req, res) => {
    try {
      // const { userId } = req.user;
      const { cartId } = req.body;
  
      const deleteMyCart = await prisma.Cart.delete({
        where: {
          Cart_ID: cartId,
        },
      });
      res.json({
        delete: true,
        updated: true,
        deleteMyCart
       
      });
    } catch (error) {
      console.log(error);
    }
  };




  module.exports = {
    addToCart,
    getMyCart,
    emptyAllCart,
    deleteItem
  }