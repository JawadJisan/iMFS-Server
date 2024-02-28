import { Model } from 'mongoose';

// IUser, UserModel

export type IAuth = {
  email: string;
  role: 'user' | 'agent';
  name: string;
  password: string;
  nid: number;
  mobileNumber: number;

  totalMoney: number;
  initialBalance: number;
};
export type AuthModal = Model<IAuth, Record<string, unknown>>;

export type ISigninUser = {
  // email: string;
  password: number;
  mobileNumber: number;
};

export type ISigninUserResponse = {
  accessToken: string;
  refreshToken: string;
};
