import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';
import { INotification } from './notification.interface';

const getNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getNotification();

  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification retrieved successfully !',
    data: result,
  });
});

// const updateIndividualCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   const result = await TransactionService.updateIndividualCow(id, updatedData);

//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Hamba updated successfully !',
//     data: result,
//   });
// });

// const sendMoney = catchAsync(async (req: Request, res: Response) => {
//   const data = req.body;
//   const isReciverExist = await Auth.findOne({
//     mobileNumber: data.reciverNumber,
//   });

//   if (isReciverExist !== null) {
//     console.log(data, 'reciver exist');
//     const result = await TransactionService.sendMoney(data);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Send Money Successfull !',
//       data: result,
//     });
//   } else {
//     sendResponse(res, {
//       statusCode: 404,
//       success: false,
//       message: 'Reciver dose not Exist',
//       data: null,
//     });
//   }
// });

export const NotificationController = {
  getNotification,
};
