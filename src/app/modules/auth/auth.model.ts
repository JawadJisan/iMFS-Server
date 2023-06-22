import { Schema, model } from 'mongoose';
import { IAuth, AuthModal } from './auth.interface';

const authSchema = new Schema<IAuth>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      enum: ['seller', 'buyer'],
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
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

export const Auth = model<IAuth, AuthModal>('Auth', authSchema);
