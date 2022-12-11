const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all catogries  Every one can accsess

const allCats = async (req, res) => {
    try {
      const categories = await prisma.Category.findMany();
      res.json({
        success: true,
        categories,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  };

//   Add CATEGORY ONLY FOR ADMINS

const createCategory = async (req, res) => {
    const { type, img } = req.body;
    try {
      const category = await prisma.Category.create({
        data: {
          type,
          img ,
        },
      });
      res.json({
        success: true,
        category,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  };
  

//   UPDATE CATEGORY ONLY FOR ADMIN

const updateCategory = async (req, res) => {
    const { type, img, id } = req.body;
  
    try {
      const category = await prisma.Category.update({
        where: {
          category_ID: Number(id),
        },
        data: {
          type,
          img,
        },
      });
  
      res.json({
        success: true,
        category,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  };
  

//   DELETE CATEGORY ONLY FOR ADMIN


const deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
      const category = await prisma.Category.delete({
        where: {
          category_ID: Number(id),
        },
      });
  
      res.json({
        success: true,
        category,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  };
  
  
  module.exports ={
    allCats,
    deleteCategory,
    updateCategory,
    createCategory
  }