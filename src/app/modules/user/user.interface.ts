import { Model } from 'mongoose';

// IUser, UserModel
export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  name: UserName;
  password: string;
  address: string;
  budget: number;
  income: number;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
