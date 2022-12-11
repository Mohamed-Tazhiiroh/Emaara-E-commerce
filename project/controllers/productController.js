const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import cloudinary from "../cloud/cloudinary"

// GET ALL Products  every one even users 

const getProducts = async (req, res) => {
    try {
      const allProducts = await prisma.Product.findMany({
        include: {
          Reviews: true,
          Category: true,
        },
      });
  
      res.json({
        success: true,
        allProducts,
      });
    } catch (error) {
      res.json({
        success: false,
        msg: error,
      });
    }
  };



  // get Catogories

  export const getCats = async (req, res) => {
    try {
      const categories = await prisma.Category.findMany();
      res.json({
        success: true,
        categories,
      });
    } catch (error) {
      res.json(error);
    }
  };


  // get all reviews or comments  every one can read

  const getReviewsOfProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const allReviews = await prisma.Reviews.findMany({
        where: {
            pro_id: Number(id),
        },
        include: {
          Users: true,
        },
      });
      res.json({ success: true, allReviews });
    } catch (error) {
      res.json({
        success: false,
        msg: error,
      });
    }
  };
  



  // GET ONE PRODUCT
  // Every body can filter

export const getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await prisma.Product.findFirst({
        where: {
            pro_id: Number(id),
        },
        include: {
          Reviews: true,
          Category: true,
        },
      });
  
      const allReviews = result.reviews.length;
      const totalReviews = result.reviews.reduce((a, b) => a + b.rating, 0);
      const average = totalReviews / allReviews;
  
      res.json({
        success: true,
        result,
        average,
        allReviews,
      });
    } catch (error) {
      res.json({
        success: false,
        msg: error,
      });
    }
  };



  //  creating product  only for Admin
  
  const createProduct = async (req, res) => {
    const { name, description, price, stockQty, category_ID } = req.body;
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const product = await prisma.Product.create({
        data: {
            name,
            description,
            price: Number(price),
            stockQty: Number(stockQty),
            category_ID: categoryId ? Number(category_ID) : 1,
            category_ID: result.secure_url,
        //   adminUser: Number(req.user.userId),
        },
      });
      res.json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.json({
        errors: {
          msg: error,
        },
      });
    }
  };

  // update product  only for Admin
  
  const updateProduct = async (req, res) => {
    const { name, description, price, stockQty } = req.body;
  
    if (req.file) {
      try {
        const updatingProduct = await prisma.Product.findFirst({
          where: {
            pro_id: Number(req.params.id),
          },
        });
  
        await cloudinary.uploader.destroy(updatingProduct.imgId);
        const result = await cloudinary.uploader.upload(req.file.path);
  
        const product = await prisma.Product.update({
          where: {
            pro_id: Number(req.params.id),
          },
          data: {
            name,
            description,
            price: Number(price),
            stockQty: Number(stockQty),
            image: result.secure_url,
           
          },
        });
        res.json({
          success: true,
          product,
        });
      } catch (error) {
        console.log(error);
        res.json({
          errors: {
            msg: error,
          },
        });
      }
    } else {
      try {
        const product = await prisma.Product.update({
          where: {
            productId: Number(req.params.id),
          },
          data: {
            name,
            description,
            price: Number(price),
            stockQty: Number(stockQty),
          },
        });
        res.json({
          success: true,
          product,
        });
      } catch (error) {
        console.log(error);
        res.json({
          errors: {
            msg: error,
          },
        });
      }
    }
  };
  

  // deleting product  only for Admin

   const deleteItem = async (req, res) => {
    try {
      const { productId } = req.body;
      const deletingItem = await prisma.product.delete({
        where: {
          productId,
        },
      });
      res.json({
        success: true,
      });
    } catch (error) {
      res.json({
        success: false,
      });
    }
  };




  module.exports = {
    getProducts,
    getCats,
    getReviewsOfProduct,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteItem
}