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
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to create user',
      error: {
        code: 500,
        description: 'Failed to create user. Server error.',
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
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to fetch users',
      error: {
        code: 500,
        description: 'Failed to fetch users. Server error.',
      },
    });
  }
};

const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserService.getSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: `User ${data.fullName.firstName} ${data.fullName.lastName} fetched successfully`,
      data: data,
    });
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to fetch user',
      error: {
        code: 500,
        description: 'Failed to fetch user. Server error.',
      },
    });
  }
};

const updateSingleUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const reqData = req.body;
    const data = await UserService.updateSingleUserFromDB(id, reqData);
    res.status(200).json({
      success: true,
      message: `User id ${userId} updated successfully`,
      data: data,
    });
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to fetch user orders',
      error: {
        code: 500,
        description: 'Failed to fetch user orders. Server error.',
      },
    });
  }
};

const deleteSingleUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    await UserService.deleteSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: `User id ${userId} deleted successfully`,
      data: null,
    });
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to delete user',
      error: {
        code: 500,
        description: 'Failed to delete. Server error.',
      },
    });
  }
};

const placeOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const reqData = req.body;
    const data = await UserService.placeNewOrder(parseInt(userId), reqData);
    res.status(200).json({
      success: true,
      message: `Dear ${data.username}, your order created successfully!`,
      data: null,
    });
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to place order',
      error: {
        code: 500,
        description: 'Failed to place order. Server error.',
      },
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserService.getSingleUserOrdersFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: `Orders fetched successfully`,
      data: data,
    });
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to get orders list of user',
      error: {
        code: 500,
        description: 'Failed to get orders list of user. Server error.',
      },
    });
  }
};

const getUserTotalOrderAmount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const data = await UserService.getSingleUserTotalOrderAmountFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: data,
    });
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: typedError.message || 'Failed to calculate total price for user',
      error: {
        code: 500,
        description: 'Failed to calculate total price. Server error.',
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
