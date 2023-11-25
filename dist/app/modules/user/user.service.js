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
exports.UserService = void 0;
const user_model_schema_1 = require("./user.model.schema");
const createUserToDB = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield user_model_schema_1.User.verifyUserId(user.userId)) {
            throw new Error('User already exists to database');
        }
        const data = yield user_model_schema_1.User.create(user);
        return data;
    });
};
const getAllUserFromDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield user_model_schema_1.User.aggregate([
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
    });
};
const getSingleUserFromDB = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield user_model_schema_1.User.verifyUserId(id);
        if (confirmation === null) {
            throw new Error('User not found to database');
        }
        const data = yield user_model_schema_1.User.getSingleUserData(id);
        return data;
    });
};
const updateSingleUserFromDB = function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield user_model_schema_1.User.verifyUserId(id);
        if (confirmation === null) {
            throw new Error('User not found to database');
        }
        return yield user_model_schema_1.User.updateSingleUserData(id, data);
    });
};
const deleteSingleUserFromDB = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield user_model_schema_1.User.verifyUserId(id);
        if (confirmation === null) {
            throw new Error('User not found to database');
        }
        try {
            return yield user_model_schema_1.User.deleteSingleUserData(id);
        }
        catch (error) {
            throw new Error('Error deleting user data');
        }
    });
};
const placeNewOrder = function (id, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield user_model_schema_1.User.verifyUserId(id);
        if (confirmation === null) {
            throw new Error('User not found in the database');
        }
        const userData = (yield user_model_schema_1.User.findOne({ userId: id }));
        if (!userData.orders) {
            userData.orders = [];
        }
        userData.orders.push({
            productName: productData.productName,
            price: productData.price,
            quantity: productData.quantity,
        });
        const updatedUserData = yield user_model_schema_1.User.updateSingleUserData(id, userData);
        return updatedUserData;
    });
};
const getSingleUserOrdersFromDB = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield user_model_schema_1.User.verifyUserId(id);
        if (confirmation === null) {
            throw new Error('User not found to database');
        }
        const data = yield user_model_schema_1.User.getSingleUserOrders(id);
        return data;
    });
};
const getSingleUserTotalOrderAmountFromDB = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield user_model_schema_1.User.verifyUserId(id);
        if (confirmation === null) {
            throw new Error('User not found to database');
        }
        const data = yield user_model_schema_1.User.getSingleUserTotalOrdersAmount(id);
        return data;
    });
};
exports.UserService = {
    createUserToDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    placeNewOrder,
    getSingleUserOrdersFromDB,
    getSingleUserTotalOrderAmountFromDB,
};
