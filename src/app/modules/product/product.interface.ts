import { Model } from 'mongoose'

export interface IVariants {
  type: string
  value: string
}

export interface IInventory {
  quantity: number
  inStock: boolean
}

export interface IProduct {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: Array<IVariants>
  inventory: IInventory
}

export interface ProductModel extends Model<IProduct> {
  isProductExists(name: string): Promise<IProduct | null>
}
