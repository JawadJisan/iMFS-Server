import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (data: IUser): Promise<IUser | null> => {
  console.log(data, 'signup');
  // if (!data.password) {
  //   data.password = config.default_pass as string;
  // }
  const result = await User.create(data);
  return result;
};
export const UserService = {
  createUser,
};
