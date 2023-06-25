import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderServices } from './order.service';
import { IOrder } from './order.inerface';
import { Auth } from '../auth/auth.model';
import { Cow } from '../cow/cow.model';
import { IAuth } from '../auth/auth.interface';
import ApiError from '../../../errors/ApiError';
import mongoose from 'mongoose';

const readOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.readOrder();
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await OrderServices.deleteOrder(id);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully !',
    data: result,
  });
});
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const buyer = await Auth.findById(data.buyer);
  const cow = await Cow.findById(data.cow);
  const seller = await Auth.findById(cow.seller);

  //   budget
  const isEleigableForBuyCow = buyer.budget >= cow.price;

  console.log(cow.price, 'price');
  if (isEleigableForBuyCow) {
    const result = await OrderServices.createOrder(data);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order Recived Successfully!',
      data: result,
    });
    console.log('eligible for buy');
    console.log(isEleigableForBuyCow);
  } else {
    console.log(isEleigableForBuyCow);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'You are not eligible for buy the cow',
      data: {},
    });
  }
});

export const OrderController = {
  createOrder,
};
