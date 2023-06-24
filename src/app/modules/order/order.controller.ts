import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderServices } from './order.service';
import { IOrder } from './order.inerface';
import { Auth } from '../auth/auth.model';
import { Cow } from '../cow/cow.model';
import { IAuth } from '../auth/auth.interface';

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

// const createCow = catchAsync(async (req: Request, res: Response) => {
//     const data = req.body;

const createOrder = async (data: any): Promise<IOrder | null> => {
  // Check that the user has enough money in their account to buy the cow.

  const buyer = await Auth.findById(data.body.buyer);
  const cow = await Cow.findById(data.body.cow);

  //   console.log(data.body, 'data for order');
  //   console.log(data.body.buyer, 'data for order');
  //   console.log(data.body.cow, 'data for order');
  //   console.log(buyer, 'buyer');
  //   console.log(cow, 'cow');

  //   budget
  const isEleigableForBuyCow = buyer.budget >= cow.price;
  console.log(buyer.budget, 'budget');
  console.log(cow.price, 'price');
  if (buyer.budget >= cow.price) {
    console.log('eligible for buy');
    console.log(isEleigableForBuyCow);
  } else {
    console.log('Not eligible for buy');
    console.log(isEleigableForBuyCow);
  }

  //   // generate student id
  //   let newUserAllData = null;
  //   const session = await mongoose.startSession();
  //   try {
  //     session.startTransaction();
  //     const id = await generateStudentId(academicsemester);
  //     user.id = id;
  //     student.id = id;

  //     //array
  //     const newStudent = await Student.create([student], { session });

  //     if (!newStudent.length) {
  //       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
  //     }

  //     //set student -->  _id into user.student
  //     user.student = newStudent[0]._id;

  //     const newUser = await User.create([user], { session });

  //     if (!newUser.length) {
  //       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  //     }
  //     newUserAllData = newUser[0];

  //     await session.commitTransaction();
  //     await session.endSession();
  //   } catch (error) {
  //     await session.abortTransaction();
  //     await session.endSession();
  //     throw error;
  //   }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty
};

export const OrderController = {
  createOrder,
};
