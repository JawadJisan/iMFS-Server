import { CowModel, ICow } from './cow.interface';
import { Schema, model } from 'mongoose';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      required: true,
      type: Number,
    },
    price: {
      required: true,
      type: Number,
    },
    location: {
      enum: [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      type: String,
      required: true,
    },
    breed: {
      enum: [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      required: true,
      type: String,
    },
    category: {
      enum: ['Dairy', 'Beef', 'DualPurpose'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
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

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
