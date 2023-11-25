import { z } from 'zod';

const validateName = (value: string) =>
  value === value.charAt(0).toUpperCase() + value.slice(1);

const fullNameSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    validate: async (firstName: string) => validateName(firstName),
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    validate: async (lastName: string) => validateName(lastName),
  }),
});

const addressSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
});

const orderSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});

export const userSchema = z.object({
  id: z.number({ required_error: 'User ID is required' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: fullNameSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  isActive: z.boolean({ required_error: 'isActive is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobbies is required' })),
  address: addressSchema,
  orders: z.array(orderSchema),
});
