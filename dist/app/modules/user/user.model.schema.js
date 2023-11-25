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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const config_1 = __importDefault(require("../../config"));
function validateName(value) {
    const name = value.charAt(0).toUpperCase() + value.slice(1);
    return value === name;
}
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID must be unique'],
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: [true, 'username must be unique'],
        unique: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: {
            firstName: {
                type: String,
                required: [true, 'First name is required'],
                maxlength: [20, 'First name cannot exceed 20 characters'],
                trim: true,
                validate: {
                    validator: validateName,
                    message: `Invalid First name, {VALUE} does not follow the uppercase format`,
                },
            },
            lastName: {
                type: String,
                required: [true, 'Last name is required'],
                maxlength: [20, 'Last name cannot exceed 20 characters'],
                trim: true,
                validate: {
                    validator: validateName,
                    message: 'Invalid Last name, {VALUE} does not follow the uppercase format',
                },
            },
        },
        required: [true, 'Name is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required and must be unique'],
        unique: true,
        trim: true,
        index: true,
        validate: [validator_1.default.isEmail, 'Invalid email format'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: {
        type: [orderSchema],
        default: [],
    },
});
userSchema.statics.verifyUserId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield exports.User.findOne({ userId: id });
        return confirmation;
    });
};
userSchema.statics.getSingleUserData = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield exports.User.findOne({ userId: id }, {
            _id: 0,
            userId: 1,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            isActive: 1,
            hobbies: 1,
            address: 1,
        });
        return data;
    });
};
userSchema.statics.updateSingleUserData = function (id, updatedUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = yield exports.User.findOneAndUpdate({ userId: id }, updatedUserData, {
            new: true,
            projection: {
                _id: 0,
                userId: 1,
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                isActive: 1,
                hobbies: 1,
                address: 1,
            },
        });
        return updateData;
    });
};
userSchema.statics.getSingleUserOrders = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield exports.User.aggregate([
            { $match: { userId: id } },
            { $project: { orders: 1, _id: 0 } },
        ]);
        return data.length > 0 ? data[0] : null;
    });
};
userSchema.statics.getSingleUserTotalOrdersAmount = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = parseInt(id, 10);
        const data = yield exports.User.aggregate([
            { $match: { userId: userid } },
            { $unwind: '$orders' },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                    },
                },
            },
            { $project: { _id: 0, totalAmount: 1 } },
        ]);
        return data.length > 0 ? data[0] : null;
    });
};
userSchema.statics.deleteSingleUserData = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteData = yield this.findOneAndDelete({ userId: id });
        return deleteData;
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
