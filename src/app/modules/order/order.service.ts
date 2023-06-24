import { Order } from './order.model';
import { IOrder } from './order.inerface';

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const result = await Order.create(payload);
  return result;
};
const readOrder = async (): Promise<IOrder[]> => {
  const result = await Order.find();
  return result;
};

const deleteOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderServices = {
  createOrder,
  readOrder,
  deleteOrder,
};
