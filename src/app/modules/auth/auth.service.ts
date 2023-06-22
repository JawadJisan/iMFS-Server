// import config from '../../../config';
import { IAuth } from './auth.interface';
import { Auth } from './auth.model';

const createAuthUser = async (data: IAuth): Promise<IAuth | null> => {
  console.log(data, 'signup');
  // if (!data.password) {
  //   data.password = config.default_pass as string;
  // }
  const result = await Auth.create(data);
  return result;
};
export const AuthService = {
  createAuthUser,
};
