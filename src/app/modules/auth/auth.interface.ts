import { Model } from 'mongoose';

// IUser, UserModel
export type Name = {
  firstName: string;
  lastName: string;
};

export type IAuth = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  name: Name;
  password: string;
  address: string;
  budget: number;
  income: number;
};
export type AuthModal = Model<IAuth, Record<string, unknown>>;
