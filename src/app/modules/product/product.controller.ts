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
  } catch (err) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: 'Failed to create product!',
    })
  }
}

//get all products
const getAllProducts = async (req: Request, res: Response) => {
    const result = await productServices.getAllProductsFromDB()
    if (result) {
      try {
        const result = await productServices.getAllProductsFromDB()
        if (result) {
          res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
          })
        }
      } catch (err) {
        res.status(404).json({
          success: false,
          message: 'Failed to retrieved products!',
        })
      }
    }
  }


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
      const updatedData = req.body;
      const zodParseData = ZodProductSchema.parse(updatedData)
      const findDoc = await productServices.updateProductFromDB(
        req.params.productId,updatedData
  
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
      console.log(err)
      res.status(404).json({
        success: false,
        message: 'Failed to Update product!',
      })
    }
  }

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct
}
