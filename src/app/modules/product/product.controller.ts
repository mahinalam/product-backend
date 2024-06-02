import { Request, Response } from 'express'
import ZodProductSchema from './product.validation'
import { productServices } from './product.services'

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


export const productController = {
  createProduct
}
