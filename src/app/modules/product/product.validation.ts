// Zod Schemas
import { z } from 'zod'
const ZodVariantSchema = z.object({
  type: z.string().max(20, 'Value can not be more than 20 characters'),
  value: z.string().max(20, 'Value can not be more than 20 characters'),
})

const ZodInventorySchema = z.object({
  quantity: z
    .number()
    .max(200, 'Quantity can not be more than 200')
    .nonnegative('Quantity cannot be negative'),
  inStock: z.boolean(),
})

const ZodProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative('Price cannot be negative'),
  category: z.string(),
  //   tags: z.array(z.string()),
  tags: z.array(z.string()),
  variants: z.array(ZodVariantSchema),
  inventory: ZodInventorySchema,
})

export default ZodProductSchema
