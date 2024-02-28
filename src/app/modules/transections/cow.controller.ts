import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TransactionService } from './cow.service';
import { ICow } from './cow.interface';

import { Auth } from '../auth/auth.model';

const getAllTnx = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.getAllTnx();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Tnx Recived',
    data: result,
  });
});

const getIndividualCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TransactionService.getIndividualCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully !',
    data: result,
  });
});

const updateIndividualCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await TransactionService.updateIndividualCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hamba updated successfully !',
    data: result,
  });
});
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TransactionService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hamba deleted successfully !',
    data: result,
  });
});

const sendMoney = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const isReciverExist = await Auth.findOne({
    mobileNumber: data.reciverNumber,
  });

  if (isReciverExist !== null) {
    console.log(data, 'reciver exist');
    const result = await TransactionService.sendMoney(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Send Money Successfull !',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Reciver dose not Exist',
      data: null,
    });
  }
});

const cashOut = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  console.log(data, 'data cash-out');

  const isAgentExist = await Auth.findOne({
    mobileNumber: data.agentNumber,
  });

  const isSenderExist = await Auth.findOne({
    mobileNumber: data?.senderInfo.number,
  });

  if (isAgentExist !== null) {
    console.log(data, 'Agent Exist');
    const result = await TransactionService.cashOut(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cash Out Successfull',
      data: result,
    });
  } else if (!isAgentExist || !isSenderExist) {
    sendResponse(res, {
      statusCode: 404,
      success: true,
      message: 'Agent  Number Not Found or Agent is not Authorized',
      data: null,
    });
  }
});
const cashIn = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  console.log(data, 'cash in data');

  const isUserExist = await Auth.findOne({
    mobileNumber: data.userNumber,
  });

  const isSenderExist = await Auth.findOne({
    mobileNumber: data?.senderInfo.number,
  });

  if (isUserExist !== null) {
    console.log(data, 'User Exist');
    const result = await TransactionService.cashIn(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cash In Successfull',
      data: result,
    });
  } else if (!isUserExist || !isSenderExist) {
    sendResponse(res, {
      statusCode: 404,
      success: true,
      message: 'Agent  Number Not Found or Agent is not Authorized',
      data: null,
    });
  }
});

const requestCash = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data, 'cash request data');
  const isAgentExist = await Auth.findOne({
    mobileNumber: data.agentNumber,
  });

  if (isAgentExist !== null) {
    console.log(data, 'Agent Exist');
    const result = await TransactionService.requestCash(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Requested for Cash Successfull',
      data: result,
    });
  } else if (!isAgentExist) {
    sendResponse(res, {
      statusCode: 404,
      success: true,
      message: 'Agent  Number Not Found or Agent is not Authorized',
      data: null,
    });
  }
});

const approvedRequestCash = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data, 'cash request data');
  const isAgentExist = await Auth.findOne({
    mobileNumber: data.agentNumber,
  });

  if (isAgentExist !== null) {
    console.log(data, 'Agent Exist');
    const result = await TransactionService.approvedRequestCash(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Requested for Cash Successfull',
      data: result,
    });
  } else if (!isAgentExist) {
    sendResponse(res, {
      statusCode: 404,
      success: true,
      message: 'Agent  Number Not Found or Agent is not Authorized',
      data: null,
    });
  }
});

export const TransactionController = {
  getAllTnx,
  getIndividualCow,
  deleteCow,
  updateIndividualCow,
  sendMoney,
  cashOut,
  cashIn,
  requestCash,
  approvedRequestCash,
};
