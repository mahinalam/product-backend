import { z } from 'zod'

const zodOrderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive().min(1).max(500),
})

export default zodOrderSchema
