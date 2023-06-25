import { Order } from './order.model';
import { IOrder } from './order.inerface';
import { Auth } from '../auth/auth.model';
import { Cow } from '../cow/cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import sendResponse from '../../../shared/sendResponse';

// const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
//   const result = await Order.create(payload);
//   return result;
// };

const createOrder = async (data: IOrder): Promise<IOrder | null> => {
  // Check that the user has enough money in their account to buy the cow.
  const buyer = await Auth.findById(data.buyer);
  const cow = await Cow.findById(data.cow);
  const seller = await Auth.findById(cow.seller);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Cow.findByIdAndUpdate(
      { _id: data.cow },
      { label: 'sold out' },
      {
        new: true,
      }
    );
    await Auth.findByIdAndUpdate(
      { _id: data.buyer },
      { budget: buyer.budget - cow.price },
      {
        new: true,
      }
    );
    await Auth.findByIdAndUpdate(
      { _id: cow.seller },
      { income: seller?.income + cow?.price },
      {
        new: true,
      }
    );

    const result = await Order.create(data);
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
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
