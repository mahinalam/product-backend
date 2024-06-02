import { Request, Response } from 'express'
import ZodProductSchema from './product.validation'
import { productServices } from './product.services'


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
  


export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct
}
