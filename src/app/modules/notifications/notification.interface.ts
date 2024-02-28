import { Model, Types } from 'mongoose';

export type INotification = {
  message: string;
  transactionType: string;
  charged?: string;
  notificationCount: number;
  isRead: boolean;
  notificationReciver?: object;
};

export type NotificationModel = Model<INotification, Record<string, unknown>>;
