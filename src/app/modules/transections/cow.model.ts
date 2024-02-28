import {
  CowModel,
  ICow,
  ITransaction,
  TranscationModel,
} from './cow.interface';
import { Schema, model } from 'mongoose';

const transactionSchema = new Schema<ITransaction>(
  {
    reciverNumber: {
      type: Number,
      required: true,
    },
    amountToRecive: {
      required: true,
      type: Number,
    },
    sender: {
      // required: true,
      // type: Number,
    },
    reciver: {
      // required: true,
      // type: Number,
    },
    charged: {
      // required: true,
      type: Number,
    },
    transactionType: {
      // required: true,
      type: String,
    },
    transactionID: {},
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Transcation = model<ITransaction, TranscationModel>(
  'Transcation',
  transactionSchema
);
