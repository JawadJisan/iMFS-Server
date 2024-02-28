import { z } from 'zod';
import { roles } from './auth.constant';

const createAuthZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    mobileNumber: z.string({
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

const updateUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'password is required',
      })
      .optional(),
    mobileNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .optional(),
    role: z
      .enum([...roles] as [string, ...string[]], {
        required_error: 'User Role is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: ' address is required',
      })
      .optional(),
    budget: z
      .number({
        required_error: 'budget is required',
      })
      .optional(),
    income: z
      .number({
        required_error: 'income is required',
      })
      .optional(),
  }),
});

export const AuthValidation = {
  createAuthZodSchema,
  updateUserZodSchema,
};
