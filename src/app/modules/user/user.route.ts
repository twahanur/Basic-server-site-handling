import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUsers);
router.put('/:userId', userController.updateSingleUserData);
router.delete('/:userId', userController.deleteSingleUserData);
router.put('/:userId/orders', userController.placeOrderToUser);
router.get('/:userId/orders', userController.getSingleUserOrders);
router.get(
  '/:userId/orders/total-price',
  userController.getUserTotalOrderAmount,
);

export const UserRouter = router;
