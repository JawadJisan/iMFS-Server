import { Model, Types } from 'mongoose';

enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export type ITransaction = {
  reciverNumber: number;
  amountToRecive: number;
  senderNumber?: object;
};
export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh';
  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahiwal'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej';
  weight: number;
  label: 'for sale' | 'sold out';
  seller: Types.ObjectId;
  category: Category;
};
export type CowModel = Model<ICow, Record<string, unknown>>;
export type TranscationModel = Model<ITransaction, Record<string, unknown>>;

export type ICowFilters = {
  location?: string;
  searchTerm?: string;
};
