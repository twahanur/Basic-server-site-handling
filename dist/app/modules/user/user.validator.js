"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const fullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string({
        required_error: 'First name is required',
    }),
    lastName: zod_1.z.string({
        required_error: 'Last name is required',
    }),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string({ required_error: 'Street is required' }),
    city: zod_1.z.string({ required_error: 'City is required' }),
    country: zod_1.z.string({ required_error: 'Country is required' }),
});
const orderSchema = zod_1.z.object({
    productName: zod_1.z.string({ required_error: 'Product name is required' }),
    price: zod_1.z.number({ required_error: 'Price is required' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
});
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number({ required_error: 'User ID is required' }),
    username: zod_1.z.string({ required_error: 'Username is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
    fullName: fullNameSchema,
    age: zod_1.z.number({ required_error: 'Age is required' }),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email format' }),
    isActive: zod_1.z.boolean({ required_error: 'isActive is required' }),
    hobbies: zod_1.z.array(zod_1.z.string({ required_error: 'Hobbies is required' })),
    address: addressSchema,
    orders: zod_1.z.array(orderSchema),
});
