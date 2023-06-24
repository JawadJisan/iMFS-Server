import { Model, Types } from 'mongoose';

/* 
{

  "cow":"ObjectId(“6473c6a50c56d0d40b9bb6a3)", // cow reference _id
  "buyer":"ObjectId(“6473c6a50c56d0d40b9bb6a3)", // user reference  _id
}
*/

export type IOrder = {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
};
export type OrderModel = Model<IOrder, Record<string, unknown>>;
