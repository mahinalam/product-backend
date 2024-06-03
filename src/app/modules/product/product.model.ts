import { Schema, model } from 'mongoose'
import {
  IInventory,
  IProduct,
  IVariants,
  ProductModel,
} from './product.interface'

const variantsSchema = new Schema<IVariants>({
  type: {
    type: String,
    required: [true, 'type is required'],
    trim: true,
    maxlength: [20, 'Value can not be more than 20 characters'],
  },
  value: {
    type: String,
    required: [true, 'value is required'],
    trim: true,
    maxlength: [20, 'Value can not be more than 20 characters'],
  },
})

const inventorySchema = new Schema<IInventory>({
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    trim: true
  },
  inStock: {
    type: Boolean,
    trim: true,
    required: [true, 'InStock field is required'],
    default: true,
  },
})

const productSchema = new Schema<IProduct, ProductModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'category is required'],
    trim: true
  },
  tags: {
    type: [String],
    reqired: [true, 'tags field is required'],
  },
  variants: {
    type: [variantsSchema],
    required: [true, 'variants field is required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory is required'],
  },
})

//creating a custom static method
productSchema.statics.isProductExists = async function (name: string) {
  const existingProduct = await Product.findOne({ name: name })
  return existingProduct
}

export const Product = model<IProduct, ProductModel>('Product', productSchema)
