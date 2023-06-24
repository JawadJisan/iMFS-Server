import { IOrder, OrderModel } from './order.inerface';
import { Schema, model } from 'mongoose';

const orderSchema = new Schema<IOrder>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
