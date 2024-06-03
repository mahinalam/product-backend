import { Request, Response } from 'express'
import { orderServices } from './order.services'
import zodOrderSchema from './order.validation'

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body
    const zodParseData = zodOrderSchema.parse(order)

    const result = await orderServices.createOrderIntoDB(zodParseData)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      })
    }
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong!',
    })
  }
}

//Fetch all orders from the database
const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      // The query to filter orders by email
      let query: any = {};
  
      //The email to filter orders by
      const email = req.query.email;
      if (email) {
        query = { email };
      }
  
      // Fetch all orders from the database
      const result = await orderServices.getAllOrdersFromDB(query);
  
      if (!result || result.length === 0) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }
  
      if (!email) {
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully!',
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Orders fetched successfully for ${email}!`,
          data: result,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message || 'Something went wrong!',
        error: error,
      });
    }
  };

  // not found route


export const orderController = {
  createOrder,
  getAllOrders
}
