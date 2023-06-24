import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CowServices } from './cow.service';
import { ICow } from './cow.interface';
import { cowSearchableFields } from './cow.constant';
import { paginationFields } from '../../../interfaces/pagination';
import { Auth } from '../auth/auth.model';

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query, 'query data');
  const filters = pick(req.query, cowSearchableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowServices.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hamba retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getIndividualCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowServices.getIndividualCow(id);

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

  const result = await CowServices.updateIndividualCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hamba updated successfully !',
    data: result,
  });
});
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowServices.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hamba deleted successfully !',
    data: result,
  });
});

const createCow = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { seller } = data;
  const isExistSeller = await Auth.findById(seller);
  if (isExistSeller !== null) {
    console.log(data, 'create new hamba');
    const result = await CowServices.createCow(data);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hamba Created successfully !',
      data: result,
    });
  } else {
    // const result = await CowServices.createCow(data);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Seller id is Invalid !',
      data: null,
    });
  }
  console.log(isExistSeller, 'seller info');
});

export const CowController = {
  getAllCows,
  createCow,
  getIndividualCow,
  deleteCow,
  updateIndividualCow,
};
