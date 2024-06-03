import { IOrder } from './order.interface'
import { Order } from './order.model'

const createOrderIntoDB = async (order: IOrder) => {
  const result = await Order.create(order)
  return result
}

// Fetches all orders from the database
const getAllOrdersFromDB = async (query: any) => {
    const result = await Order.find(query);
    return result;
  };

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
