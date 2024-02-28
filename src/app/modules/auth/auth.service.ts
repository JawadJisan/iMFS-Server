import { httpStatus } from 'http-status';
import { Secret } from 'jsonwebtoken';

// import config from '../../../config';
import { IAuth, ISigninUser, ISigninUserResponse } from './auth.interface';
import { Auth } from './auth.model';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';

const createAuthUser = async (data: IAuth): Promise<IAuth | null> => {
  console.log(data, 'signup');

  const passwordString = data.password.toString(); // Convert number to string
  const hashedPassword = await bcrypt.hash(passwordString, 12);

  let initialBalance;
  if (data.accountType === 'user') {
    initialBalance = 40;
  } else if (data.accountType === 'agent') {
    initialBalance = 100000;
  } else if (data.accountType === 'admin') {
    initialBalance = 0;
  }

  const newData = {
    name: data.name,
    password: hashedPassword,
    accountType: data.accountType,
    nid: data.nid,
    mobileNumber: data.mobileNumber,
    email: data.email,
    initialBalance: initialBalance,
    status: data.status,
  };
  console.log(newData, 'newData');
  const result = await Auth.create(newData);
  return result;
};

const loginUser = async (data: ISigninUser): Promise<ISigninUserResponse> => {
  const { mobileNumber, password } = data;

  console.log(mobileNumber);

  const strPass = String(password);

  // check user exist
  const user = await Auth.findOne({ mobileNumber: mobileNumber });

  console.log(user, 'findUser');

  if (!user) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  const passwordMatch = await bcrypt.compare(strPass, user.password);
  console.log(passwordMatch, 'passwordMatch');

  if (!passwordMatch) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

  // create access token
  const { mobileNumber: PNumber, accountType, email } = user;

  const accessToken = jwtHelpers.createToken(
    { PNumber, accountType, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create refresh token
  const refreshToken = jwtHelpers.createToken(
    { PNumber, accountType, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
export const AuthService = {
  createAuthUser,
  loginUser,
};
