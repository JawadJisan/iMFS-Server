import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IAuth } from '../auth/auth.interface';
import { Auth } from '../auth/auth.model';

const getAllUsers = async (): Promise<IGenericResponse<IAuth[]>> => {
  const result = await Auth.find();

  return {
    // meta: {
    //   page,
    //   limit,
    //   total,
    // },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IAuth | null> => {
  const result = await Auth.findById(id);
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
  //   const isExist1 = await Auth.findOne({ id });
  //   console.log(isExist1, 'isExistone');

  //   const isExist2 = await Student.find({ id });
  //   console.log(isExist2, 'isExistwo');

  const isExist = await Auth.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...userData } = payload;
  console.log(userData, 'payload userData');

  const updateUserData: Partial<IAuth> = { ...userData };
  console.log(updateUserData, 'data');

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAuth>; // `name.fisrtName`
      (updateUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

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
