import { z } from 'zod';
import { location, breed, label, category } from './cow.constant';

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});
const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'hamba name is required',
    }),
    age: z.number({
      required_error: 'hamba age is required',
    }),
    price: z.number({
      required_error: 'hamba price is required',
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'location of hamba is required',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'hamba breed is required',
    }),
    weight: z.number({
      required_error: 'hambas weight is required',
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'level is required',
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z.string({
      required_error: 'serller reference id is required',
    }),
  }),
});

export const CowValidation = {
  updateCowZodSchema,
  createCowZodSchema,
};
