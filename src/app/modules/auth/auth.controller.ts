import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAuth } from './auth.interface';
import { AuthService } from './auth.service';
import config from '../../../config';

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

const signinUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const sdata = req.session;
  console.log(sdata, 'session data');

  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

export const AuthController = {
  createAuthUser,
  signinUser,
};
