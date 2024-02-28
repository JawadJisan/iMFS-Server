import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAuth } from '../auth/auth.interface';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IAuth[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await UserService.getSingleUser(email);

  sendResponse<IAuth>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IAuth>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  console.log(id, 'id');
  console.log(updatedData, 'body');

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IAuth>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Account Status updated successfully !',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
