import { IProduct } from "./product.interface"
import { Product } from "./product.model"

const createProductIntoDB = async (product: IProduct) => {
    if (await Product.isProductExists(product.name)) {
      throw new Error('Product already exists!')
    }
  
    const result = await Product.create(product)
    return result
  }


  export const productServices = {
    createProductIntoDB
  }
  