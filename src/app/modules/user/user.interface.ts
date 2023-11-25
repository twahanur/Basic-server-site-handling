import { Model } from 'mongoose';

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
  orders?: {
    productName: string;
    price: number;
    quantity: number;
  }[];
}
export interface UserModel extends Model<TUser> {
  verifyUserId(id: number): Promise<TUser>;
  getSingleUserData(id: number): Promise<TUser>;
  updateSingleUserData(id: number, dataObj: any): Promise<TUser>;
  deleteSingleUserData(id: number): Promise<TUser>;
  getSingleUserOrders(id: number): Promise<TUser>;
  getSingleUserTotalOrdersAmount(id: number): Promise<TUser>;
}
