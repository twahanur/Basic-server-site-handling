import { TUser } from './user.interface';
import { User } from './user.model.schema';

const createUserToDB = async function (user: TUser) {
  if (await User.verifyUserId(user.userId)) {
    throw new Error('User already exists to database');
  }
  const data = await User.create(user);
  return data;
};

const getAllUserFromDB = async function () {
  const data = await User.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return data;
};

const getSingleUserFromDB = async function (id: number) {
  const confirmation = await User.verifyUserId(id);
  if (confirmation === null) {
    throw new Error('User not found to database');
  }
  const data = await User.getSingleUserData(id);
  return data;
};

const updateSingleUserFromDB = async function (id: number, data: any) {
  const confirmation = await User.verifyUserId(id);
  if (confirmation === null) {
    throw new Error('User not found to database');
  }
  const data = await User.updateSingleUserData(id, data);
  return data;
};

const deleteSingleUserFromDB = async function (id: number) {
  const confirmation = await User.verifyUserId(id);
  if (confirmation === null) {
    throw new Error('User not found to database');
  }
  try {
    return await User.deleteSingleUserData(id);
  } catch (error) {
    throw new Error('Error deleting user data');
  }
};

const placeNewOrder = async function (id: number, productData: any) {
  const confirmation = await User.verifyUserId(id);
  if (confirmation === null) {
    throw new Error('User not found in the database');
  }
  const userData = await User.findOne({ userId: id });
  if (!userData.orders) {
    userData.orders = [];
  }
  userData.orders.push({
    productName: productData?.productName,
    price: productData?.price,
    quantity: productData?.quantity,
  });
  const updatedUserData = await User.updateSingleUserData(id, userData);
  return updatedUserData;
};

const getSingleUserOrdersFromDB = async function (id: number) {
  const confirmation = await User.verifyUserId(id);
  if (confirmation === null) {
    throw new Error('User not found to database');
  }
  const data = await User.getSingleUserOrders(id);
  return data;
};
const getSingleUserTotalOrderAmountFromDB = async function (id: number) {
  const confirmation = await User.verifyUserId(id);
  if (confirmation === null) {
    throw new Error('User not found to database');
  }
  const data = await User.getSingleUserTotalOrdersAmount(id);
  return data;
};

export const UserService = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  placeNewOrder,
  getSingleUserOrdersFromDB,
  getSingleUserTotalOrderAmountFromDB,
};
