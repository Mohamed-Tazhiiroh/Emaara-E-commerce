const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET ALL products


// const CreateProduct = async (req, res) => {
//   try {
//       const { Name, Price, Desc, img, category_id } = req.body;


//       if (!Name || !Price || !Desc || !img || !category_id ) {
//           res.json({
//               status: "Something is worng",
//               message: "please Checking Data"
//           });
//           return;

//       }
    
//       const NewProduct = await prisma.Product.create({
//           data: {
//             name:Name,
//             price:Number(Price),
//             description:Desc,
//             image:img,
//             category_id: category_id ? Number(category_id) : 1,
//             // UserID: Number(req.user.userId),
//           },
//       });
//       res.json({
//           status: "Success",
//           message: "Sucessfully save",
//           NewProduct
//       })
   
//   } catch (error) {
//     console.log(error)
//       res.json({
//           status:"Erorr",
//           message:"Wax ayaa Jira"
//       })
//   }
// };



const CreateProduct = async (req, res) => {
  const { name, image, description, price, stockQty, category_id } = req.body;
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const product = await prisma.Product.create({
      data: {
        name:name,
        description:description,
        price: Number(price),
        stockQty: Number(stockQty),
        image:image,
        category_id: category_id ? Number(category_id) : 2,
        // adminUser: Number(req.user.userId),
      },
    });
    res.json({ success: true, product });
    message : "succsess"
  } catch (error) {
    console.log(error);
    res.json({
      errors: {
        msg: "error",
      },
    });
  }
};







// UPDATE product


const updateProduct = async (req, res) => {
  try {
    const {  name, description, image, price} = req.body;

    const { pro_id } = req.params;

    if (!name || !description || !image || !price) {
      res.json({
        status: 'Error',
        message: 'Please provide data',
      });

      return;
    }

    // Find the product/item
    const findProduct = await prisma.Product.findFirst({
      where: {
        pro_id: parseInt(pro_id),
      },
    });

    if (!findProduct) {
      res.json({
        status: 'Error',
        message: 'Product is not in the db',
      });

      return;
    }

    const updateProduct = await prisma.Product.update({
      where: {
        pro_id: parseInt(pro_id),
      },
      data: {
        name,
        description,
        image,
        price,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Item updated successfully',
      updateProduct,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

// GET ONE Produvt or Item


const getOneProduct = async (req, res) => {
  try {
    const { pro_id } = req.params;

    const Product = await prisma.Product.findFirst({
      where: {
        pro_id: +pro_id,
      },
      include: {
        Customer: true,
      },
    });

    if (!Product) {
      res.json({
        status: 'Error',
        message: 'The Item you are looking for is not in the database',
      });
    } else {
      res.json({
        status: 'success',
        Product,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// DELETE PRODUCT OR ITEM


const deleteProduct = async (req, res) => {
  const { pro_id } = req.params;

  const Product = await prisma.Product.delete({
    where: {
      pro_id: parseInt(pro_id),
    },
  });

  res.json({
    status: 'success',
    message: 'Item  deleted successfully!',
    // pateintId,
    Product,
  });
};

// DELETE ALL Items

const deleteAllItems = async (req, res) => {
  try {
    const deletedItems = await prisma.Product.deleteMany();

    res.json({
      status: 'Success',
      message: 'All Item were deleted',
      deletedItems,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  // getAllProducts,
  CreateProduct,
  updateProduct,
  getOneProduct,
  deleteProduct,
  deleteAllItems,
};
