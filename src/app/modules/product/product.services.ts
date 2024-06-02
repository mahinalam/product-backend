import { IProduct } from './product.interface'
import { Product } from './product.model'

//create product into db
const createProductIntoDB = async (product: IProduct) => {
  if (await Product.isProductExists(product.name)) {
    throw new Error('Product already exists!')
  }

  const result = await Product.create(product)
  return result
}

//retrieve all products from db
const getAllProductsFromDB = async () => {
    const result = await Product.find()
    return result
  }

  //retrieve a specific product from db
  const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById({ _id: id })
    return result
  }

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB
}
