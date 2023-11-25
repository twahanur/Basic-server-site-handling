import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const data = await UserService.createUserToDB(userData);
    const dataObj = {
      userId: data.userId,
      username: data.username,
      fullName: data.fullName,
      age: data.age,
      email: data.email,
      isActive: data.isActive,
      hobbies: data.hobbies,
      address: data.address,
    };
    res.status(200).json({
      success: true,
      message: `User created successfully!`,
      data: dataObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'User creation failed',
      error: {
        code: 500,
        description: 'User creation failed. server error.',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: `Users fetched successfully!`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users',
      error: {
        code: 500,
        description: 'Failed to fetch users. server error.',
      },
    });
  }
};

const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: `User ${data.fullName.firstName} ${data.fullName.lastName} fetched successfully`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user',
      error: {
        code: 500,
        description: 'Failed to fetch user. server error.',
      },
    });
  }
};

const updateSingleUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const reqData = req.body;
    const data = await UserService.updateSingleUserFromDB(userId, reqData);
    res.status(200).json({
      success: true,
      message: `User id ${userId} updated successfully`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user',
      error: {
        code: 500,
        description: 'Failed to update user. server error.',
      },
    });
  }
};

const deleteSingleUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserService.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: `User id ${userId} deleted successfully`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete user',
      error: {
        code: 500,
        description: 'Failed to delete user. server error.',
      },
    });
  }
};

const placeOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const reqData = req.body;
    const data = await UserService.placeNewOrder(userId, reqData);
    res.status(200).json({
      success: true,
      message: `Dear ${data.username}, your order created successfully!`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to place order',
      error: {
        code: 500,
        description: 'Failed to place order. server error.',
      },
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserService.getSingleUserOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: `Orders fetched successfully`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders',
      error: {
        code: 500,
        description: 'Failed to fetch orders. server error.',
      },
    });
  }
};

const getUserTotalOrderAmount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserService.getSingleUserTotalOrderAmountFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        `Failed to calculate total price for user with id ${userId}`,
      error: {
        code: 500,
        description: `Failed to calculate total price. server error.`,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateSingleUserData,
  deleteSingleUserData,
  placeOrderToUser,
  getSingleUserOrders,
  getUserTotalOrderAmount,
};
