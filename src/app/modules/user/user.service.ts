import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IAuth } from '../auth/auth.interface';
import { Auth } from '../auth/auth.model';

const getAllUsers = async (): Promise<IGenericResponse<IAuth[]>> => {
  const result = await Auth.find();
  return result;
};

const getSingleUser = async (email: string): Promise<IAuth | null> => {
  const result = await Auth.findOne({ email: email });

  return result;
};

const deleteUser = async (id: string): Promise<IAuth | null> => {
  const result = await Auth.findByIdAndDelete(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IAuth>
): Promise<IAuth | null> => {
  console.log(id, 'id');
  console.log(payload, 'payload');
  const isExist = await Auth.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { ...userData } = payload;
  console.log(userData, 'payload userData');

  const updateUserData: Partial<IAuth> = { ...userData };
  console.log(updateUserData, 'data');

  const result = await Auth.findOneAndUpdate({ _id: id }, updateUserData, {
    new: true,
  });
  console.log(result, 'update use data');
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
