import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);
router.patch(
  '/:id',
  validateRequest(AuthValidation.updateUserZodSchema),
  UserController.updateUser
);

export const UserRoutes = router;

/* 
const router = express.Router();
router.post(
  '/signup',
  validateRequest(AuthValidation.createAuthZodSchema),
  AuthController.createAuthUser
);
export const AuthRoutes = router;
*/
