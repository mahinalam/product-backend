import { Schema, model } from 'mongoose'
import { IOrder } from './order.interface'
import { Product } from '../product/product.model'

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
  },
  productId: {
    type: String,
    required: [true, 'product ID is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    trim: true,
  },
})

orderSchema.pre('save', async function (next) {
  try {
    const product = await Product.findById({ _id: this.productId })

    if (!product) {
      return next(new Error('Product not found'))
    }

    if (this.quantity > product?.inventory.quantity) {
      return next(new Error('Insufficient quantity available in inventory'))
    }
   return next()
  } catch (err) {
    throw new Error('Failed to create Order!')
  }
})

// Post-save middleware to update inventory
orderSchema.post('save', async function (doc, next) {
  const product = await Product.findById({ _id: doc.productId })

  if (product) {
    product.inventory.quantity -= doc.quantity
    product.inventory.inStock = product.inventory.quantity > 0
    await product.save()
  }
  next()
})

export const Order = model<IOrder>('Order', orderSchema)
