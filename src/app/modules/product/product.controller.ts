import { Request, Response } from 'express'
import { productServices } from './product.services'
import ZodProductSchema from './product.validation'

//create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const zodParseData = ZodProductSchema.parse(product)
    const result = await productServices.createProductIntoDB(zodParseData)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result,
      })
    }
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to create product!',
    })
  }
}


// Fetch all products from the database
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const searchTerm = req.query.searchTerm;
      const query: any = {};
 
      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
        ];
      }
  
      // Fetch all products from the database
      const result = await productServices.getAllProductsFromDB(query);
  

      if (!result || result.length === 0) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }

      if (!searchTerm) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message || 'Something went wrong',
        error: error,
      });
    }
  };

//get specific product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getSingleProductFromDB(
      req.params.productId,
    )
    if (result) {
      res.status(200).json({
        success: true,
        message: ' Product fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to retrieved product!',
    })
  }
}

// update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body
    const zodParseData = ZodProductSchema.parse(updatedData)
    const findDoc = await productServices.updateProductFromDB(
      req.params.productId,
      zodParseData,
    )
    // console.log('id from product controller', req.params.id)
    if (findDoc) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: findDoc,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to Update product!',
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.deleteProductFromDB(
      req.params.productId,
    )


    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Failed to delete product!',
      })
    }
  } catch (err) {
    console.log(err)
  }
}

  

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
}
