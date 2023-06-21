import { z } from 'zod';
import { roles } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum([...roles] as [string, ...string[]], {
      required_error: 'User Role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: ' address is required',
    }),
    budget: z.number({
      required_error: 'budget is required',
    }),
    income: z.number({
      required_error: 'income is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
