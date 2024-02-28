import { INotification } from './notification.interface';
import { Notification } from './notification.model';

const getNotification = async (id: string): Promise<INotification | null> => {
  const result = await Notification.find();
  return result;
};

// const sendMoney = async data => {
//   const { reciverNumber, amountToRecive, senderInfo } = data;
//   let charged = Number(0);
//   if (amountToRecive >= 100) {
//     charged = Number(5);
//   }
//   const isReciverExist = await Auth.findOne({
//     mobileNumber: data.reciverNumber,
//   });
//   const isSenderExist = await Auth.findOne({
//     mobileNumber: senderInfo.number,
//   });
//   const isAdminExist = await Auth.findOne({
//     mobileNumber: 1711982820,
//   });

//   if (!isReciverExist || !isSenderExist || !isAdminExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
//   }

//   // incress the amount in Reciver Account
//   const depositeAmount = await Auth.findOneAndUpdate(
//     { mobileNumber: reciverNumber },
//     {
//       initialBalance:
//         Number(isReciverExist.initialBalance) + Number(amountToRecive),
//       notification: {
//         message: `You Recived Money ${amountToRecive} from  ${isSenderExist.mobileNumber}.`,
//         transactionType: 'Recived Money',
//         charged: charged,
//         notificationCount:
//           Number(isReciverExist.notification.notificationCount) + 1,
//       },
//     },
//     {
//       new: true,
//     }
//   );
//   // decress the amount from Sender Account
//   const senderAccUpdate = await Auth.findOneAndUpdate(
//     { mobileNumber: senderInfo.number },
//     {
//       initialBalance:
//         Number(isSenderExist.initialBalance) - Number(amountToRecive) - charged,
//     },
//     {
//       new: true,
//     }
//   );
//   // update charged in admin account
//   const adminAccUpdate = await Auth.findOneAndUpdate(
//     { mobileNumber: 1711982820 },
//     {
//       initialBalance: Number(isAdminExist.initialBalance) + charged,
//     },
//     {
//       new: true,
//     }
//   );

//   const transactionData = {
//     sender: isSenderExist,
//     reciver: isReciverExist,
//     charged: charged,
//     transactionType: 'Send Money',
//     reciverNumber,
//     amountToRecive,
//   };

//   const result = await Transcation.create(transactionData);

//   return result;
// };

export const NotificationService = {
  getNotification,
};
