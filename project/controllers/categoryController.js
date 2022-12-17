const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all catogries  Every one can accsess

const Getall = async (req, res) => {
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
  



// const updateCategory = async (req, res) => {
//   try {
//     const { type, img } = req.body;

//     if ((!img || !type)) {
//       res.status(403).json({
//         status: 'ERROR',
//         message: 'Please complete the required information',
//       });
//       return;
//     }

//     const { category_ID } = req.params;

//     const updatedCat = await prisma.Category(category_ID, {
//       img,
//       type,
//     });

//     res.status(200).json({
//       status: 'Success',
//       updatedCat,
//     });
//   } catch (error) {
//     res.status(403).json({
//       status: 'ERROR',
//       message: 'waxbaa qaldan nio',
//     });
//   }
// };



// ka imika
const updateCategory = async (req, res, next) => {
  try {
      const {img, type} = req.body;
      const { category_ID } = req.params
      if (!img || !type) {
          res.json({
              status: "Erorr",
              message: "please checking Data "
          })
          return;
      }
      const findcat = await prisma.Category.findFirst({
          where: {
            category_ID: + category_ID,
          }
      });
      if (!findcat) {
          res.json({
              status: "Erorr",
              message: "User Is not Found In Database"
          })
          return
      }
      const UpdateCategory = await prisma.Category.update({
          where: {
            category_ID: parseInt(category_ID)
          },
          data: {
              type:type,
              img:img
          },
      });
      res.status(200).json({
          status: "Sucess",
          message: "Update Sucessfully",
          UpdateCategory
      })
  } catch (error) {
      res.json({
          status: "Erorr",
      });
  }
};

//   DELETE CATEGORY ONLY FOR ADMIN
  
  const deleteCategory = async (req, res) => {
    const { category_ID } = req.params;
  
    const category = await prisma.Category.delete({
      where: {
        category_ID: parseInt(category_ID),
      },
    });
  
    res.json({
      status: 'success',
      message: 'Catgory deleted successfully!',
      // pateintId,
      category,
    });
  };
  
  module.exports ={
    Getall,
    deleteCategory,
    updateCategory,
    createCategory
  }