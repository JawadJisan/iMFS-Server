import { httpStatus } from 'http-status';
import bcrypt from 'bcrypt';
import { ICow } from './cow.interface';
import { Transcation } from './cow.model';
import { Auth } from '../auth/auth.model';
import ApiError from '../../../errors/ApiError';
import { Notification } from '../notifications/notification.model';
import { v4 as uuidv4 } from 'uuid';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await Cow.create(payload);
  return result;
};
const getAllTnx = async data => {
  const result = await Transcation.find();
  return result;
};

const updateIndividualCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const sendMoney = async data => {
  const { reciverNumber, amountToRecive, senderInfo } = data;
  let charged = Number(0);
  if (amountToRecive >= 100) {
    charged = Number(5);
  }
  const isReciverExist = await Auth.findOne({
    mobileNumber: data.reciverNumber,
  });
  const isSenderExist = await Auth.findOne({
    mobileNumber: senderInfo.number,
  });
  const isAdminExist = await Auth.findOne({
    mobileNumber: 1711982820,
  });

  if (!isReciverExist || !isSenderExist || !isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Generate a unique transaction ID
  const generateTransactionID = () => {
    const timestamp = Date.now(); // Get current timestamp
    const uuid = uuidv4(); // Generate a UUID
    return `${timestamp}_${uuid}`; // Combine timestamp and UUID
  };

  // incress the amount in Reciver Account
  const depositeAmount = await Auth.findOneAndUpdate(
    { mobileNumber: reciverNumber },
    {
      initialBalance:
        Number(isReciverExist.initialBalance) + Number(amountToRecive),
    },
    {
      new: true,
    }
  );
  // decress the amount from Sender Account
  const senderAccUpdate = await Auth.findOneAndUpdate(
    { mobileNumber: senderInfo.number },
    {
      initialBalance:
        Number(isSenderExist.initialBalance) - Number(amountToRecive) - charged,
    },
    {
      new: true,
    }
  );
  // Sent Notification
  // reciver
  await Notification.create({
    message: `You Recived Money ${amountToRecive} from  ${isSenderExist.mobileNumber}.`,
    transactionType: 'send money',
    charged: charged,
    notificationCount: 1,
    notificationReciver: {
      reciverNumber: isReciverExist.mobileNumber,
      recivedAmount: amountToRecive,
      senderNumber: isSenderExist.mobileNumber,
    },
  });

  // sender
  await Notification.create({
    message: `You have send money ${amountToRecive} to this  ${isReciverExist.mobileNumber} account.`,
    transactionType: 'send money',
    charged: charged,
    notificationCount: 1,
    notificationReciver: {
      reciverNumber: isReciverExist.mobileNumber,
      recivedAmount: amountToRecive,
      senderNumber: isSenderExist.mobileNumber,
    },
  });

  // update charged in admin account
  const adminAccUpdate = await Auth.findOneAndUpdate(
    { mobileNumber: 1711982820 },
    {
      initialBalance: Number(isAdminExist.initialBalance) + charged,
    },
    {
      new: true,
    }
  );

  const transactionData = {
    sender: isSenderExist,
    reciver: isReciverExist,
    charged: charged,
    transactionType: 'Send Money',
    reciverNumber,
    amountToRecive,
    transactionID: generateTransactionID(),
  };

  const result = await Transcation.create(transactionData);

  return result;
};
const cashOut = async data => {
  const { amountToRecive, senderInfo, pinCode, agentNumber } = data;
  console.log(data, 'cash out');

  let fee = Number(0);
  fee = Number(amountToRecive * 1.5) / 100;

  const agentIncome = Number(0);
  fee = Number(amountToRecive * 1) / 100;

  const adminIncome = Number(0);
  fee = Number(amountToRecive * 0.5) / 100;

  console.log(fee, 'fees');

  let charged = Number(0);
  if (amountToRecive >= 100) {
    charged = Number(5);
  }

  const isAgentExist = await Auth.findOne({
    mobileNumber: data.agentNumber,
  });

  const isSenderExist = await Auth.findOne({
    mobileNumber: senderInfo.number,
  });

  const isAdminExist = await Auth.findOne({
    mobileNumber: 1711982820,
  });

  const passwordMatch = await bcrypt.compare(
    String(pinCode),
    isSenderExist.password
  );
  console.log(passwordMatch, 'passwordMatch');

  if (!passwordMatch) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

  if (!isAgentExist || !isSenderExist || !isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Generate a unique transaction ID
  const generateTransactionID = () => {
    const timestamp = Date.now(); // Get current timestamp
    const uuid = uuidv4(); // Generate a UUID
    return `${timestamp}_${uuid}`; // Combine timestamp and UUID
  };

  // incress the amount in Agent Account
  const depositeAmount = await Auth.findOneAndUpdate(
    { mobileNumber: agentNumber },
    {
      initialBalance:
        Number(isAgentExist.initialBalance) +
        Number(amountToRecive) +
        agentIncome,
    },
    {
      new: true,
    }
  );
  // decress the amount from Sender Account
  const senderAccUpdate = await Auth.findOneAndUpdate(
    { mobileNumber: senderInfo.number },
    {
      initialBalance:
        Number(isSenderExist.initialBalance) -
        Number(amountToRecive) -
        charged -
        fee,
    },
    {
      new: true,
    }
  );
  // Sent Notification
  // reciver Agent
  await Notification.create({
    message: `You Recived Money ${amountToRecive} from  ${isSenderExist.mobileNumber}.`,
    transactionType: 'cash out',
    charged: agentIncome,
    notificationCount: 1,
    notificationReciver: {
      reciverNumber: isAgentExist.mobileNumber,
      recivedAmount: amountToRecive,
      senderNumber: isSenderExist.mobileNumber,
    },
  });

  // sender user
  await Notification.create({
    message: `You have cash out ${amountToRecive} to this  ${isAgentExist.mobileNumber} account.`,
    transactionType: 'cash out',
    charged: fee,
    notificationCount: 1,
    notificationReciver: {
      reciverNumber: isAgentExist.mobileNumber,
      recivedAmount: amountToRecive,
      senderNumber: isSenderExist.mobileNumber,
    },
  });

  // update charged in admin account
  const adminAccUpdate = await Auth.findOneAndUpdate(
    { mobileNumber: 1711982820 },
    {
      initialBalance: Number(isAdminExist.initialBalance) + adminIncome,
    },
    {
      new: true,
    }
  );

  const transactionData = {
    sender: isSenderExist,
    reciver: isAgentExist,
    charged: charged,
    transactionType: 'cash out',
    reciverNumber: agentNumber,
    amountToRecive,
    transactionID: generateTransactionID(),
  };

  const result = await Transcation.create(transactionData);

  return result;
};
const cashIn = async data => {
  const { amountToRecive, senderInfo, pinCode, userNumber } = data;
  console.log(data, 'cash in');

  let fee = Number(0);
  fee = Number(amountToRecive * 1.5) / 100;

  const agentIncome = Number(0);
  fee = Number(amountToRecive * 1) / 100;

  const adminIncome = Number(0);
  fee = Number(amountToRecive * 0.5) / 100;

  let charged = Number(0);
  if (amountToRecive >= 100) {
    charged = Number(5);
  }

  const isUserExist = await Auth.findOne({
    mobileNumber: data.userNumber,
  });

  const isSenderExist = await Auth.findOne({
    mobileNumber: senderInfo.number,
  });

  const isAdminExist = await Auth.findOne({
    mobileNumber: 1711982820,
  });

  const passwordMatch = await bcrypt.compare(
    String(pinCode),
    isSenderExist.password
  );
  console.log(passwordMatch, 'passwordMatch');

  if (!passwordMatch) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

  if (!isUserExist || !isSenderExist || !isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Generate a unique transaction ID
  const generateTransactionID = () => {
    const timestamp = Date.now(); // Get current timestamp
    const uuid = uuidv4(); // Generate a UUID
    return `${timestamp}_${uuid}`; // Combine timestamp and UUID
  };

  // incress the amount in User Account
  const depositeAmount = await Auth.findOneAndUpdate(
    { mobileNumber: userNumber },
    {
      initialBalance:
        Number(isUserExist.initialBalance) + Number(amountToRecive),
    },
    {
      new: true,
    }
  );
  // decress the amount from Sender Account(agent)
  const senderAccUpdate = await Auth.findOneAndUpdate(
    { mobileNumber: senderInfo.number },
    {
      initialBalance:
        Number(isSenderExist.initialBalance) - Number(amountToRecive),
    },
    {
      new: true,
    }
  );

  // Sent Notification
  // reciver User
  await Notification.create({
    message: `Cash In Money ${amountToRecive} from  ${isSenderExist.mobileNumber}.`,
    transactionType: 'cash in',
    charged: 0,
    notificationCount: 1,
    notificationReciver: {
      reciverNumber: isUserExist.mobileNumber,
      recivedAmount: amountToRecive,
      senderNumber: isSenderExist.mobileNumber,
    },
  });

  // sender Agent
  await Notification.create({
    message: `Cash in Money ${amountToRecive} to this  ${isUserExist.mobileNumber} this account.`,
    transactionType: 'cash in',
    charged: 0,
    notificationCount: 1,
    notificationReciver: {
      reciverNumber: isUserExist.mobileNumber,
      recivedAmount: amountToRecive,
      senderNumber: isSenderExist.mobileNumber,
    },
  });

  // update charged in admin account
  // const adminAccUpdate = await Auth.findOneAndUpdate(
  //   { mobileNumber: 1711982820 },
  //   {
  //     initialBalance: Number(isAdminExist.initialBalance) + adminIncome,
  //   },
  //   {
  //     new: true,
  //   }
  // );

  const transactionData = {
    sender: isSenderExist,
    reciver: isUserExist,
    charged: 0,
    transactionType: 'cash in',
    reciverNumber: userNumber,
    amountToRecive,
    transactionID: generateTransactionID(),
  };

  const result = await Transcation.create(transactionData);

  return result;
};
const requestCash = async data => {
  const { agentNumber } = data;
  console.log(data, 'cash requested');

  const isAgentExist = await Auth.findOne({
    mobileNumber: data.agentNumber,
  });

  if (!isAgentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found !');
  }
  const result = await Auth.findOneAndUpdate(
    { mobileNumber: agentNumber },
    {
      cashRequest: 'requested',
    },
    {
      new: true,
    }
  );

  return result;
};
const approvedRequestCash = async data => {
  const { agentNumber } = data;
  console.log(data, 'cash requested');

  const isAgentExist = await Auth.findOne({
    mobileNumber: data.agentNumber,
  });

  if (!isAgentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found !');
  }
  const result = await Auth.findOneAndUpdate(
    { mobileNumber: agentNumber },
    {
      cashRequest: 'approved',
      initialBalance: Number(isAgentExist.initialBalance) + Number(100000),
    },
    {
      new: true,
    }
  );

  return result;
};

export const TransactionService = {
  createCow,
  sendMoney,
  getAllTnx,
  updateIndividualCow,
  cashOut,
  cashIn,
  requestCash,
  approvedRequestCash,
};
