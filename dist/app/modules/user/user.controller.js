"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const data = yield user_service_1.UserService.createUserToDB(userData);
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
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to create user',
            error: {
                code: 500,
                description: 'Failed to create user. Server error.',
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_service_1.UserService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: `Users fetched successfully!`,
            data: data,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to fetch users',
            error: {
                code: 500,
                description: 'Failed to fetch users. Server error.',
            },
        });
    }
});
const getSingleUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield user_service_1.UserService.getSingleUserFromDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: `User ${data.fullName.firstName} ${data.fullName.lastName} fetched successfully`,
            data: data,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to fetch user',
            error: {
                code: 500,
                description: 'Failed to fetch user. Server error.',
            },
        });
    }
});
const updateSingleUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const id = parseInt(userId);
        const reqData = req.body;
        const data = yield user_service_1.UserService.updateSingleUserFromDB(id, reqData);
        res.status(200).json({
            success: true,
            message: `User id ${userId} updated successfully`,
            data: data,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to fetch user orders',
            error: {
                code: 500,
                description: 'Failed to fetch user orders. Server error.',
            },
        });
    }
});
const deleteSingleUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const id = parseInt(userId);
        yield user_service_1.UserService.deleteSingleUserFromDB(id);
        res.status(200).json({
            success: true,
            message: `User id ${userId} deleted successfully`,
            data: null,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to delete user',
            error: {
                code: 500,
                description: 'Failed to delete. Server error.',
            },
        });
    }
});
const placeOrderToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const reqData = req.body;
        const data = yield user_service_1.UserService.placeNewOrder(parseInt(userId), reqData);
        res.status(200).json({
            success: true,
            message: `Dear ${data.username}, your order created successfully!`,
            data: null,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to place order',
            error: {
                code: 500,
                description: 'Failed to place order. Server error.',
            },
        });
    }
});
const getSingleUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield user_service_1.UserService.getSingleUserOrdersFromDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: `Orders fetched successfully`,
            data: data,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to get orders list of user',
            error: {
                code: 500,
                description: 'Failed to get orders list of user. Server error.',
            },
        });
    }
});
const getUserTotalOrderAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const id = parseInt(userId);
        const data = yield user_service_1.UserService.getSingleUserTotalOrderAmountFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: data,
        });
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({
            success: false,
            message: typedError.message || 'Failed to calculate total price for user',
            error: {
                code: 500,
                description: 'Failed to calculate total price. Server error.',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUsers,
    updateSingleUserData,
    deleteSingleUserData,
    placeOrderToUser,
    getSingleUserOrders,
    getUserTotalOrderAmount,
};
