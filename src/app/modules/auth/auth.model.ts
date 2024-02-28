import { Schema, model } from 'mongoose';
import { IAuth, AuthModal } from './auth.interface';

const authSchema = new Schema<IAuth>(
  {
    nid: {
      type: Number,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    accountType: {
      enum: ['user', 'agent', 'admin'],
      required: true,
      type: String,
    },
    status: {
      enum: ['blocked', 'approved', 'normal', 'pending'],
      // required: true,
      type: String,
    },
    cashRequest: {
      enum: ['requested', 'approved', 'rejected'],
      // required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    totalMoney: {
      type: Number,
    },
    initialBalance: {
      type: Number,
    },
    notification: {},
    sessionTime: {},
    // budget: {
    //   type: Number,
    //   required: true,
    // },
    // income: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Auth = model<IAuth, AuthModal>('Auth', authSchema);
