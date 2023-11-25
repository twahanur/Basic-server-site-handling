"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.get('/', user_controller_1.userController.getAllUsers);
router.get('/:userId', user_controller_1.userController.getSingleUsers);
router.put('/:userId', user_controller_1.userController.updateSingleUserData);
router.delete('/:userId', user_controller_1.userController.deleteSingleUserData);
router.put('/:userId/orders', user_controller_1.userController.placeOrderToUser);
router.get('/:userId/orders', user_controller_1.userController.getSingleUserOrders);
router.get('/:userId/orders/total-price', user_controller_1.userController.getUserTotalOrderAmount);
exports.UserRouter = router;
