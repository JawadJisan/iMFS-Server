import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAuth } from './auth.interface';
import { AuthService } from './auth.service';

const createAuthUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data, 'signup');
    const result = await AuthService.createAuthUser(data);

    sendResponse<IAuth>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Auth User created successfully!',
      data: result,
    });
  }
);

export const AuthController = {
  createAuthUser,
};
