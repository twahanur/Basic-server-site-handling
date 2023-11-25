import { Model } from 'mongoose';

export interface TProduct {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: {
    productName: string;
    price: number;
    quantity: number;
  }[];
}
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  verifyUserId(id: number): Promise<TUser>;
  // eslint-disable-next-line no-unused-vars
  getSingleUserData(id: number): Promise<TUser>;
  // eslint-disable-next-line no-unused-vars
  updateSingleUserData(id: number, dataObj: unknown): Promise<TUser>;
  // eslint-disable-next-line no-unused-vars
  deleteSingleUserData(id: number): Promise<TUser>;
  // eslint-disable-next-line no-unused-vars
  getSingleUserOrders(id: number): Promise<TUser>;
  // eslint-disable-next-line no-unused-vars
  getSingleUserTotalOrdersAmount(id: number): Promise<TUser>;
}
