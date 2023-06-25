import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'cow reference id is required',
    }),
    buyer: z.string({
      required_error: 'buyer reference id is required',
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
