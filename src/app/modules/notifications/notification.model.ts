import { INotification, NotificationModel } from './notification.interface';
import { Schema, model } from 'mongoose';

// notification: {
//   message: `You Recived Money ${amountToRecive} from  ${isSenderExist.mobileNumber}.`,
//   transactionType: 'Recived Money',
//   charged: charged,
//   notificationCount:
//     Number(isReciverExist.notification.notificationCount) + 1,
// },

const notificationSchema = new Schema<INotification>(
  {
    message: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    charged: {},
    notificationCount: {
      type: Number,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notificationReciver: {
      // type: Boolean,
      // default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Notification = model<INotification, NotificationModel>(
  'Notification',
  notificationSchema
);
